import _ from 'lodash'
import dayjs from 'dayjs'
import * as PR from '@prisma/client'

const prisma = new PR.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})
const today = dayjs().startOf('d')
const expiredAt = today.add(7, 'day')

function randomSelect(polls: PR.Poll[], n: number) {
  return _.sampleSize(polls, n)
}

async function scanJudgePolls() {
  // 確認judge是否到期: ->verdict
  const polls = await prisma.poll.findMany({
    where: {
      status: PR.PollStatus.OPEN,
    },
    include: { count: true }
  })

  for (let p of polls) {
    // poll已經到期？
    if (today.toDate() < p.end) continue

    const nVotes = p.count.nVotes.reduce((a, b) => a + b, 0)

    if (nVotes < p.minVotes) {
      // 沒達到有效票
      await prisma.poll.update({
        where: { id: p.id },
        data: { status: PR.PollStatus.CLOSE_FAIL },
      })

    } else {
      // 投票成立，發出judge邀請
      await prisma.poll.update({
        where: { id: p.id },
        data: { status: PR.PollStatus.JUDGE },
      })

      // TODO: 按照道理要依照投票族群比例，隨機選合格的judge
      // 現階段：隨機挑選20個judge
      const votes = await prisma.pollVote.findMany({
        where: { pollId: p.id },
        include: { user: true },
      })

      for (let v of _.sampleSize(votes, 20)) {
        await prisma.notice.create({
          data: {
            cat: PR.NoticeCat.POLL_INVITE_JUDGE,
            expiredAt: expiredAt.toDate(),
            user: { connect: { id: v.user.id } },
            post: { connect: { id: p.postId } },
          },
        })
      }
    }
  }
}

async function scanOpenPolls() {
  const polls = await prisma.poll.findMany({
    where: {
      status: PR.PollStatus.OPEN,
    },
    include: { count: true }
  })

  for (let p of polls) {
    // poll已經到期？
    if (today.toDate() < p.end) continue

    const nVotes = p.count.nVotes.reduce((a, b) => a + b, 0)

    if (nVotes < p.minVotes) {
      // 沒達到有效票
      await prisma.poll.update({
        where: { id: p.id },
        data: { status: PR.PollStatus.CLOSE_FAIL },
      })

    } else {
      // 投票成立，發出judge邀請
      await prisma.poll.update({
        where: { id: p.id },
        data: { status: PR.PollStatus.JUDGE },
      })

      // TODO: 按照道理要依照投票族群比例，隨機選合格的judge
      // 現階段：隨機挑選20個judge
      const votes = await prisma.pollVote.findMany({
        where: { pollId: p.id },
        include: { user: true },
      })

      for (let v of _.sampleSize(votes, 20)) {
        await prisma.notice.create({
          data: {
            cat: PR.NoticeCat.POLL_INVITE_JUDGE,
            expiredAt: expiredAt.toDate(),
            user: { connect: { id: v.user.id } },
            post: { connect: { id: p.postId } },
          },
        })
      }
    }
  }

  // prisma.transaction([])
}

async function main() {
  // await scanPolls()
  console.log('start cron')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
