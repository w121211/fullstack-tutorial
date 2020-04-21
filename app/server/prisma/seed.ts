import { readFileSync } from 'fs'
import { PrismaClient, PostCat, SymbolCat, CommitAction, CommitStatus } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})


async function main() {
  await prisma.raw('TRUNCATE "User", "Symbol" CASCADE;')

  // create users

  const user1 = await prisma.user.create({
    data: {
      email: 'aaa@aaa.com',
      password: 'aaa',
      profile: { create: {} },
      dailyProfile: { create: {} }
    }
  })
  await prisma.user.create({
    data: {
      email: 'bbb@bbb.com',
      password: 'bbb',
      profile: { create: {} },
      dailyProfile: { create: {} }
    }
  })

  // auto create tickers, tags (without commits)

  const ticker1 = await prisma.symbol.create({
    data: {
      slug: "$AADR",
      content: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sysContent: JSON.stringify({ docId: "1234abcd" }),
      cat: SymbolCat.TICKER
    }
  })
  const tag1 = await prisma.symbol.create({
    data: {
      slug: "#Tag",
      content: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sysContent: JSON.stringify({}),
      cat: SymbolCat.TAG
    }
  })

  // commit an event

  const _eventContent = {
    status: "ALIVE",  // ALIVE, END
    cat: "", // NEWS, COMPANY, SIGNAL
    start: Date.now(),
    end: null,
    title: "Ticker",
    tags: ["#tag1", "tag2"],
    events: ["a-event", "b-event"],
    shotedAt: Date.now(),
  }
  const event1 = await prisma.symbol.create({
    data: {
      slug: "!event-1",
      content: JSON.stringify(_eventContent),
      sysContent: JSON.stringify({
        clusterId: "3847192387912",
      }),
      cat: SymbolCat.EVENT
    }
  })
  const commit1 = await prisma.commit.create({
    data: {
      user: { connect: { id: user1.id } },
      symbol: { connect: { id: event1.id } },
      action: CommitAction.CREATE,
      content: JSON.stringify(_eventContent),
      post: {
        create: {
          user: { connect: { id: user1.id } },
          cat: PostCat.COMMIT,
          title: "Create event !event-1",
          content: JSON.stringify({ content: "this is a commit post" }),
          count: { create: {} },
        }
      },
      count: { create: {} }
    }
  })
  await prisma.commitReview.create({
    data: {
      user: { connect: { id: user1.id } },
      commit: { connect: { id: commit1.id } },
      choice: 1,
    }
  })
  let commitCount1 = await prisma.commitCount.findOne({
    where: { commitId: commit1.id }
  })
  if (commitCount1) {
    commitCount1 = await prisma.commitCount.update({
      data: {
        nAgrees: commitCount1.nAgrees + 1
      },
      where: { commitId: commit1.id }
    })
    if (commitCount1?.nAgrees > 10) {
      await prisma.commit.update({
        data: {
          status: CommitStatus.PASS
        },
        where: { id: commit1.id }
      })
    }
  }

  // follow an event

  // const N_FOLLOW_SLOTS = { 0: 10, 1: 20, 2: 30 }
  let _user = await prisma.user.findOne({
    where: { id: user1.id },
    include: { profile: true }
  })
  if (_user && _user.profile.nFollowedEvents < 10) {
    await prisma.follow.create({
      data: {
        user: { connect: { id: user1.id } },
        symbol: { connect: { id: event1.id } },
        followed: true,
      }
    })
  }
  await prisma.follow.update({
    data: {
      followed: false,
    },
    where: {
      userId_symbolId: {
        userId: user1.id,
        symbolId: event1.id,
      }
    }
  })

  // create a post

  const post1 = await prisma.post.create({
    data: {
      title: "feed header 1",
      content: JSON.stringify({ content: "this is post 1" }),
      user: { connect: { id: user1.id } },
      count: { create: {} },
      symbols: {
        connect: [
          { id: ticker1.id },
          { id: tag1.id },
          { id: event1.id },
        ]
      }
    }
  })
  await prisma.post.create({
    data: {
      title: "feed header 2",
      content: JSON.stringify({ content: "this is post 2" }),
      user: { connect: { id: user1.id } },
      count: { create: {} },
      symbols: {
        connect: [
          { id: ticker1.id },
          { id: tag1.id },
          { id: event1.id },
        ]
      }
    }
  })
  const like1 = await prisma.postLike.create({
    data: {
      choice: 1,
      user: { connect: { id: user1.id } },
      post: { connect: { id: post1.id } },
    }
  })
  let count1 = await prisma.postCount.findOne({
    where: { postId: like1.postId }
  })
  if (count1) {
    count1 = await prisma.postCount.update({
      data: {
        nUps: count1.nUps + 1
      },
      where: { id: count1.id }
    })
  }

  // create a comment

  const comment1 = await prisma.comment.create({
    data: {
      content: "this is a comment",
      user: { connect: { id: user1.id } },
      post: { connect: { id: post1.id } },
      count: { create: {} }
    }
  })
  await prisma.commentLike.create({
    data: {
      choice: 1,
      user: { connect: { id: user1.id } },
      comment: { connect: { id: comment1.id } },
    }
  })

  // make some queries

  const postsOfTicker1 = await prisma.symbol.findOne({
    where: { id: ticker1.id },
    select: {
      posts: {
        select: { id: true },
        first: 1,
      }
    }
  })
  console.log(postsOfTicker1)

  // const ticks = readFileSync('./prisma/aadr.us.txt', 'utf-8').split('\r\n')
  // for (let i = 1; i < ticks.length; i++) {

  //   const d = ticks[i].split(',')
  //   await prisma.tick.create({
  //     data: {
  //       ticker: { connect: { id: ticker1.id } },
  //       value: parseFloat(d[4]),
  //       at: new Date(d[0])
  //     }
  //   })
  // }

  // console.log({ user1, user2 })
  // console.log(ticker1, tick)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })


function futureTimeSeries() {
  const ticker = {
    slug: "$AAA",
    freq: "DAY",
    range: [new Date(2010, 1, 1), new Date(2010, 1, 3)],
    ticks: [
      [new Date(2010, 1, 1), 150],
      [new Date(2010, 1, 2), 153],
      [new Date(2010, 1, 3), 160],
    ],
    buyZone: [
      [new Date(2010, 1, 1), 120, 125],
      [new Date(2010, 1, 2), 120, 127],
      [new Date(2010, 1, 3), 121, 126],
    ],
    sellZone: [
      [new Date(2010, 1, 1), 120, 125],
      [new Date(2010, 1, 2), 120, 127],
      [new Date(2010, 1, 3), 121, 126],
    ],
    markers: [
      {
        at: new Date(2010, 1, 1),
        type: "6_MONTH_BOTTOM",
        event: "!generated-event",
      }
    ],
    trend: "LONG",
  }

  const predict = {
    ticker,
    nextTicks: [
      [new Date(2010, 1, 4), 163, 158, 168],  // mid, upper, lower
      [new Date(2010, 1, 5), 163, 158, 168],
      [new Date(2010, 1, 6), 163, 158, 168],
    ],
    buyZone: [121, 126],
    sellZone: [180, 190],
    suggest: "HOLD",  // BUY, HOLD, SELL
  }

  const evnet = {
    slug: "!some-event-name",
    trend: "RISING",  // NEW, RISING
    tags: ["#rising"],
    heatTicks: [
      [new Date(2010, 1, 1), 10],
      [new Date(2010, 1, 2), 13],
      [new Date(2010, 1, 3), 15],
    ],
    followedTicks: [
      [new Date(2010, 1, 1), 10],
      [new Date(2010, 1, 2), 13],
      [new Date(2010, 1, 3), 15],
    ],
    impacts: [
      {
        cat: "THEME",
        content: "#theme-aaa",
        direction: "UP",  // UP, DOWN
        volume: 0.2,
        curReact: "",
        status: "", // OVERREACT, REACTED, UNDERREACT, NOTREACT
        createdAt: new Date(2010, 1, 1),
        potentialProfit: [0.1, 0.5],
      },
      {
        cat: "COMPANY_SHORT_TERM",
        content: "$",
        react: "",
        createdAt: new Date(2010, 1, 1),
        potentialProfit: [0, 0],
      },
    ],
    similarEvents: ["!some-past-event"]
  }

  const theme = {
    tag: "#some-theme",
    tickers: ["$AAA", "$BBB"],
    metrics: [
      ["$AAA", 0.3], // price-change-in-a-year, company-value, ...
      ["$BBB", 0.18],
    ]
  }

  const company = {
    ticker: "$AAA",
    name: "AAA Company",
    graph: {
      prior: ["$BBB"],
      poster: ["$CCC"],
    }
  }

  const technicalSignal = {
    ticker: "$AAA",
    tag: "#some-tech-signal",
    impact: {

    }
  }

  const fundamentalSignal = {
    ticker: "$AAA",
    tag: "#some-fundamental-signal",  // eg: report-loss, lawsuit, management-change
    impcat: {
      predictPeriod: 'SHORT', // IMMIDIATELY, SHORT
      predictMagnitude: [0.02, 0.07],
      status: "END", // ONGOING, END, NOT HAPPEND
      realMagnitude: [],
    }
  }

}
