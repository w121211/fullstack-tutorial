import { readFileSync } from 'fs'
import { hash } from 'bcryptjs'
import dayjs from 'dayjs'
import * as PC from '@prisma/client'

const USERS = [
  { email: 'aaa@aaa.com', password: 'aaa', },
  { email: 'bbb@bbb.com', password: 'bbb', },
]

const SYMBOLS = [
  { name: "#ask", cat: PC.SymbolCat.TAG },
  { name: "#reply", cat: PC.SymbolCat.TAG },
  { name: "#idea", cat: PC.SymbolCat.TAG },
  { name: "#poll", cat: PC.SymbolCat.TAG },
  { name: "#link", cat: PC.SymbolCat.TAG },
]

const _count = {
  nViews: 90,
  nUps: 10,
  nDowns: 30,
  nComments: 21,
}

const POSTS = [
  {
    cat: PC.PostCat.IDEA,
    title: "狂印錢的未來",
    symbols: ["#idea"],
    count: _count,
    text: "狂印錢的未來狂印錢的未來狂印錢的未來狂印錢的未來狂印錢的未來狂印錢的未來狂印錢的未來"
  },
  {
    cat: PC.PostCat.LINK,
    title: "某篇新聞報導連結",
    symbols: ["#link"],
    // link: {
    //   url: "http://url.com",
    //   domain: "some domain",
    //   published_at: "2001-01-01 03:50",
    // }
    count: _count
  },
  {
    cat: PC.PostCat.ASK,
    title: "油價大跌，有哪些股票可以趁機買入？",
    symbols: ["#ask"],
    count: _count,
    text: "油價大跌，有哪些股票可以趁機買入？油價大跌，有哪些股票可以趁機買入？油價大跌，有哪些股票可以趁機買入？油價大跌，有哪些股票可以趁機買入？油價大跌，有哪些股票可以趁機買入？"
  },
  {
    cat: PC.PostCat.POLL,
    status: PC.PostStatus.LOCK,
    title: "Luckin Coffee會下市嗎？",
    symbols: ["#poll"],
    poll: {
      status: PC.PollStatus.OPEN,
      start: new Date(200, 1, 1),
      end: new Date(2000, 2, 1),
      choices: ["choice a", "choice b", "choice c"],
      // forecastNDays: 30,
      // minVotes: 100, // 最低門檻
      // judgeMinVotes: 10,
      // judgeNDays: 5, // 審查期間
      votes: [
        { userId: USERS[0].email, choice: 1 },
        { userId: USERS[1].email, choice: 2 },
      ],
      count: {
        nVotes: [10, 29, 38],
        judge: undefined,
        verdict: undefined, // undefined for not judged
        // reports: [  { createdAt: new Date(2000, 1, 1) }],
      },
    },
    count: { ..._count }
  },
  {
    cat: PC.PostCat.POLL,
    status: PC.PostStatus.LOCK,
    title: "Luckin Coffee會下市嗎？",
    symbols: ["#poll"],
    poll: {
      status: PC.PollStatus.JUDGE,
      start: new Date(200, 1, 1),
      end: new Date(2000, 2, 1),
      choices: ["choice a", "choice b", "choice c"],
      nDays: 7,
      minVotes: 30,
      nDaysJudge: 5,
      minJudgements: 5,
      votes: [
        { userId: USERS[0].email, choice: 1, comment: { body: "連結[aaa.com]", status: PC.PostStatus.LOCK } },
        { userId: USERS[1].email, choice: 2, comment: { body: "連結[aaa.com]", status: PC.PostStatus.LOCK } },
      ],
      judgments: [
        { userId: USERS[0].email, choice: 1 },
        { userId: USERS[1].email, choice: 2 },
      ],
      count: {
        nVotes: [10, 29, 38],
        nJudgments: [10, 29, 38, 1], // [choice1, choice2, ..., nAbandoned]
        judgeStartedAt: new Date(2000, 1, 1),
        judgeEndedAt: undefined,
        verdictValid: undefined,
        verdictChoice: undefined,
      }
    },
    count: { ..._count },
    notice: {
      cat: PC.NoticeCat.POLL_INVITE_JUDGE,
      text: "",
      expiredAt: new Date(2021, 1, 1)
    }
  },
  {
    title: "3月21日是這次股市崩盤的最低點了嗎？",
    cat: PC.PostCat.POLL,
    status: PC.PostStatus.LOCK,
    symbols: ["#poll"],
    text: "",
    count: { ..._count, },
    poll: {
      status: PC.PollStatus.CLOSE_SUCCESS,
      start: new Date(200, 1, 1),
      end: new Date(2000, 2, 1),
      choices: ["choice a", "choice b", "choice c"],
      minVotes: 100, // 最低門檻
      judgeMinVotes: 10,
      judgeNDays: 5, // in days
      votes: [],
      count: {
        nVotes: [10, 29, 38],
        nJudgments: [10, 29, 38, 1], // [choice1, choice2, ..., nAbandoned]
        judgeStartedAt: new Date(2000, 1, 1),
        judgeEndedAt: new Date(2000, 1, 2),
        verdictValid: true,
        verdictChoice: 2,
      }
    },
  }
]

const prisma = new PC.PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

async function main() {
  console.log('seeding')

  await prisma.executeRaw('TRUNCATE "User", "Symbol" CASCADE;')

  // create a user, ie signup

  for (let d of USERS) {
    const hashedPassword = await hash(d.password, 10)
    await prisma.user.create({
      data: {
        email: d.email,
        password: hashedPassword,
        profile: { create: {} },
        dailyProfile: { create: {} },
      },
    })
  }

  for (let d of SYMBOLS) {
    await prisma.symbol.create({
      data: {
        name: d.name,
        cat: d.cat,
      }
    })
  }

  for (let d of POSTS) {
    const _post = await prisma.post.create({
      data: {
        cat: d.cat,
        status: d.status,
        title: d.title,
        text: d?.text || "",
        user: { connect: { email: USERS[0].email } },
        count: {
          create: {
            nViews: d.count.nViews,
            nUps: d.count.nUps,
            nDowns: d.count.nDowns,
            nComments: d.count.nComments,
          }
        },
        symbols: {
          connect: d.symbols.map(e => ({ name: e }))
        }
      }
    })

    if (d.poll) {
      const _poll = await prisma.poll.create({
        data: {
          status: d.poll.status,
          start: d.poll.start,
          end: d.poll.end,
          choices: { set: d.poll.choices },
          nDays: 1,
          user: { connect: { email: USERS[0].email } },
          post: { connect: { id: _post.id } },
          count: { create: {} }
        }
      })

      for (let v of d.poll.votes) {
        prisma.pollVote.create({
          data: {
            choice: v.choice,
            user: { connect: { id: v.userId } },
            poll: { connect: { id: _poll.id } },
          }
        })
      }

      for (let j of d.poll.judgments || []) {
        prisma.pollJudgment.create({
          data: {
            choice: j.choice,
            user: { connect: { id: j.userId } },
            poll: { connect: { id: _poll.id } },
            comment: {
              create: {
                content: "judgment comment",
                user: { connect: { id: j.userId } },
                post: { connect: { id: _post.id } },
                count: { create: {} }
              }
            },
          }
        })
      }

    }

    if (d.notice) {
      await prisma.notice.create({
        data: {
          cat: d.notice.cat,
          expiredAt: d.notice.expiredAt,
          user: { connect: { email: USERS[0].email } },
          post: { connect: { id: _post.id } }
        }
      })
    }
  }

  const posts = await prisma.post.findMany({
    take: 30,
    where: {
      createdAt: { gte: dayjs().startOf("d").subtract(7, "d").toDate() },
      // symbols: { some: { name: undefined } }
      symbols: { some: { name: "#link" } }
    },
    orderBy: { createdAt: "desc" },
    include: {
      symbols: true,
      count: true,
      poll: { include: { count: true } },
      parent: {
        select: { id: true, cat: true, title: true }
      },
      children: {
        select: { id: true, cat: true, title: true }
      }
    },
    // cursor: { id: afterId }
  })

  console.log(posts)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
