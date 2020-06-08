import { readFileSync } from 'fs'
import { PrismaClient, PostCat, SymbolCat, CommitAction, PostStatus, LikeChoice, PollStatus } from '@prisma/client'

const _eventContent = {
  status: "ALIVE",  // ALIVE, END
  cat: "", // NEWS, COMPANY, SIGNAL
  start: Date.now(),
  end: null,
  // title: "Some event name?",
  tags: ["#tag1", "tag2"],
  events: ["a-event", "b-event"],
  shotedAt: Date.now(),
}

const keywordBlacklist = []
const _users = [
  {
    email: 'aaa@aaa.com',
    password: 'aaa',
  },
  {
    email: 'bbb@bbb.com',
    password: 'bbb',
  }
]
const _count = {
  nViews: 90,
  nUps: 10,
  nDowns: 30,
  nComments: 21,
  poll: undefined,
}
const SYMBOLS = [
  { name: "#ask", cat: SymbolCat.TAG },
  { name: "#reply", cat: SymbolCat.TAG },
  { name: "#idea", cat: SymbolCat.TAG },
  { name: "#poll", cat: SymbolCat.TAG },
  { name: "#link", cat: SymbolCat.TAG },
]
const _posts = [
  {
    cat: PostCat.IDEA,
    status: PostStatus.ACTIVE,
    title: "狂印錢的未來",
    text: "",
    count: _count,
  },
  {
    cat: PostCat.ASK,
    status: PostStatus.ACTIVE,
    title: "油價大跌，有哪些股票可以趁機買入？",
    text: "",
    count: _count
  },
  {
    cat: PostCat.LINK,
    status: PostStatus.ACTIVE,
    title: "某篇新聞報導",
    text: "",
    // link: {
    //   url: "http://url.com",
    //   domain: "some domain",
    //   published_at: "2001-01-01 03:50",
    // }
    count: _count
  },
  {
    cat: PostCat.POLL,
    status: PostStatus.LOCK,
    title: "Luckin Coffee會下市嗎？",
    text: "",
    poll: {
      status: PollStatus.OPEN,
      start: new Date(200, 1, 1),
      end: new Date(2000, 2, 1),
      choices: ["choice a", "choice b", "choice c"],
      // forecastNDays: 30,
      // minVotes: 100, // 最低門檻
      // judgeMinVotes: 10,
      // judgeNDays: 5, // 審查期間
      votes: [
        { userId: _users[0].email, choice: 1 },
        { userId: _users[1].email, choice: 2 },
      ]
    },
    count: {
      ..._count,
      poll: {
        nVotes: [10, 29, 38],
        judge: undefined,
        verdict: undefined, // undefined for not judged
        // reports: [  { createdAt: new Date(2000, 1, 1) }],
      },
    }
  },
  {
    cat: PostCat.POLL,
    status: PostStatus.LOCK,
    title: "Luckin Coffee會下市嗎？",
    text: "",
    poll: {
      status: PollStatus.JUDGE,
      start: new Date(200, 1, 1),
      end: new Date(2000, 2, 1),
      choices: ["choice a", "choice b", "choice c"],
      nDays: 7,
      minVotes: 30,
      nDaysJudge: 5,
      minJudgements: 5,
      votes: [
        { userId: _users[0].email, choice: 1, comment: { body: "連結[aaa.com]", status: PostStatus.LOCK } },
        { userId: _users[1].email, choice: 2, comment: { body: "連結[aaa.com]", status: PostStatus.LOCK } },
      ],
      judgments: [
        { userId: _users[0].email, choice: 1 },
        { userId: _users[1].email, choice: 2 },
      ]
    },
    count: {
      ..._count,
      poll: {
        nVotes: [10, 29, 38],
        nJudgments: [10, 29, 38, 1], // [choice1, choice2, ..., nAbandoned]
        judgeStartedAt: new Date(2000, 1, 1),
        judgeEndedAt: undefined,
        verdictValid: undefined,
        verdictChoice: undefined,
      }
    }
  },
  {
    title: "3月21日是這次股市崩盤的最低點了嗎？",
    cat: PostCat.POLL,
    status: PostStatus.LOCK,
    body: {
      text: "",
      poll: {
        status: PollStatus.CLOSE_SUCCESS,
        start: new Date(200, 1, 1),
        end: new Date(2000, 2, 1),
        choices: ["choice a", "choice b", "choice c"],
        minVotes: 100, // 最低門檻
        judgeMinVotes: 10,
        judgeNDays: 5, // in days
      },
      // link: {},
    },
    count: {
      ..._count,
      poll: {
        nVotes: [10, 29, 38],
        nJudgments: [10, 29, 38, 1], // [choice1, choice2, ..., nAbandoned]
        judgeStartedAt: new Date(2000, 1, 1),
        judgeEndedAt: new Date(2000, 1, 2),
        verdictValid: true,
        verdictChoice: 2,
      },
    },
  }
]
const event = {
  name: "!COVID-19",
  synonyms: ["corono-virus"],
  startAt: new Date(2010, 1, 1),
  endAt: null,
  slug: "!some-event-name",
  trend: "RISING",  // NEW, RISING
  tags: ["#rising"],
  // 事件熱度
  heatTicks: [
    [new Date(2010, 1, 1), 10],
    [new Date(2010, 1, 2), 13],
    [new Date(2010, 1, 3), 15],
  ],
  // 追蹤人數變化
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
  similarEvents: ["!SARS", "!MERS"]
}
const eventAutoCreated = {
  name: "!WIDJOWS1238SIDJ"
}
const tag = {
  name: "#",
}

// ----------------------------------------------

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ['query', 'info', 'warn'],
})

async function main() {
  console.log('seeding')

  await prisma.raw('TRUNCATE "User", "Symbol" CASCADE;')

  // create a user, ie signup
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
      name: "$AADR",
      body: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sys: JSON.stringify({ docId: "1234abcd" }),
      cat: SymbolCat.TICKER
    }
  })
  const tag1 = await prisma.symbol.create({
    data: {
      name: "#Tag",
      body: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sys: JSON.stringify({}),
      cat: SymbolCat.TAG
    }
  })

  // follow a symbol, server side: check the user has empty slots to follow
  const userWithProfile = await prisma.user.findOne({
    where: { id: user1.id },
    include: { profile: true }
  })
  // if (userWithProfile?.profile?.nFollowedEvents && userWithProfile.profile.nFollowedEvents < 10) {
  if (userWithProfile?.profile?.nFollowedEvents !== undefined
    && userWithProfile?.profile?.nFollowedEvents < 10) {
    const f = await prisma.follow.create({
      data: {
        user: { connect: { id: user1.id } },
        symbol: { connect: { id: ticker1.id } },
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
        symbolId: ticker1.id,
      }
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
      name: "!event-1",
      body: JSON.stringify(_eventContent),
      sys: JSON.stringify({ clusterId: "3847192", }),
      cat: SymbolCat.EVENT
    }
  })
  const commit1 = await prisma.commit.create({
    data: {
      user: { connect: { id: user1.id } },
      symbol: { connect: { id: event1.id } },
      action: CommitAction.CREATE,
      body: JSON.stringify(_eventContent),
      post: {
        create: {
          user: { connect: { id: user1.id } },
          cat: PostCat.COMMIT,
          title: "Create event !event-1",
          text: "",
          count: { create: {} },
        }
      },
      // count: { create: {} }
    }
  })

  // apply a commit-review
  if (userWithProfile?.profile?.lv && userWithProfile.profile.lv > 2) {
    await prisma.commitReview.create({
      data: {
        user: { connect: { id: user1.id } },
        commit: { connect: { id: commit1.id } },
        choice: 1,
      }
    })
  }

  // create a commit-review, and update commit's status
  await prisma.commitReview.create({
    data: {
      user: { connect: { id: user1.id } },
      commit: { connect: { id: commit1.id } },
      choice: 1,
    }
  })
  // let commitCount1 = await prisma.commitCount.findOne({
  //   where: { commitId: commit1.id }
  // })
  // if (commitCount1) {
  //   commitCount1 = await prisma.commitCount.update({
  //     data: {
  //       nAgrees: commitCount1.nAgrees + 1
  //     },
  //     where: { commitId: commit1.id }
  //   })
  //   if (commitCount1?.nAgrees > 10) {
  //     await prisma.commit.update({
  //       data: {
  //         status: CommitStatus.PASS
  //       },
  //       where: { id: commit1.id }
  //     })
  //   }
  // }

  // create a post
  const post1 = await prisma.post.create({
    data: {
      title: "feed header 1",
      text: "this is post 1",
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
      text: "this is post 2",
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

  // const j = JSON.parse(readFileSync('./prisma/seed.json', 'utf8'));
  // for (let d of j.items.data) {
  //   await prisma.post.create({
  //     data: {
  //       title: d.title,
  //       text: d.summary,
  //       user: { connect: { id: user1.id } },
  //       count: { create: {} },
  //       symbols: {
  //         connect: [
  //           { id: ticker1.id },
  //           { id: tag1.id },
  //           { id: event1.id },
  //         ]
  //       }
  //     }
  //   })
  // }

  // like a post, and update post-count
  const postLike1 = await prisma.postLike.create({
    data: {
      choice: LikeChoice.UP,
      user: { connect: { id: user1.id } },
      post: { connect: { id: post1.id } },
    }
  })
  let postCount1 = await prisma.postCount.findOne({
    where: { postId: postLike1.postId }
  })
  if (postCount1) {
    postCount1 = await prisma.postCount.update({
      data: { nUps: postCount1.nUps + 1 },
      where: { postId: postCount1.postId }
    })
  }

  // create a comment
  if (post1.status === PostStatus.ACTIVE) {
    const comment1 = await prisma.comment.create({
      data: {
        content: "this is a comment",
        user: { connect: { id: user1.id } },
        post: { connect: { id: post1.id } },
        count: { create: {} }
      }
    })

    // like a comment, and update comment-count
    const commentLike1 = await prisma.commentLike.create({
      data: {
        choice: LikeChoice.UP,
        user: { connect: { id: user1.id } },
        comment: { connect: { id: comment1.id } },
      }
    })
    let commentCount1 = await prisma.commentCount.findOne({
      where: { commentId: commentLike1.commentId }
    })
    if (commentCount1) {
      commentCount1 = await prisma.commentCount.update({
        data: { nUps: commentCount1.nUps + 1 },
        where: { commentId: commentCount1.commentId }
      })
    }
  }

  // for (let d of j.items.data) {
  //   await prisma.comment.create({
  //     data: {
  //       content: d.title,
  //       user: { connect: { id: user1.id } },
  //       post: { connect: { id: post1.id } },
  //       count: { create: {} }
  //     }
  //   })
  // }

  for (let d of SYMBOLS) {
    await prisma.symbol.create({
      data: {
        name: d.name,
        cat: d.cat,
      }
    })
  }

  for (let p of _posts) {
    const _post = await prisma.post.create({
      data: {
        cat: p.cat,
        status: p.status,
        title: p.title,
        text: p.text || "",
        user: { connect: { id: user1.id } },
        count: {
          create: {
            nViews: p.count.nViews,
            nUps: p.count.nUps,
            nDowns: p.count.nDowns,
            nComments: p.count.nComments,
            poll: { create: {} }
          }
        },
      }
    })
    if (p.poll) {
      const _poll = await prisma.poll.create({
        data: {
          status: p.poll.status,
          start: p.poll.start,
          end: p.poll.end,
          choices: { set: p.poll.choices },
          nDays: 1,
          user: { connect: { id: user1.id } },
          post: { connect: { id: _post.id } },
        }
      })
      for (let v of p.poll.votes) {
        prisma.pollVote.create({
          data: {
            choice: v.choice,
            user: { connect: { id: v.userId } },
            poll: { connect: { id: _poll.id } },
          }
        })
      }
      for (let j of p.poll.judgments || []) {
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
  }


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


// var obj = JSON.parse(readFileSync('./prisma/headline.json', 'utf8'));
// console.log(obj.items.data[0])


async function query() {
  // make some queries
  const postsOfTicker1 = await prisma.symbol.findOne({
    where: { id: 1234 },
    select: {
      posts: {
        select: { id: true },
        first: 1,
      }
    }
  })
  console.log(postsOfTicker1)
}