import { readFileSync } from 'fs'
import { PrismaClient, PostCat, SymbolCat, CommitAction, CommitStatus, PostStatus, LikeChoice } from '@prisma/client'

const post = {
  title: "some title goes here",
  content: {
    text: `if it is a link-post, then here can be some thought,
    or it can be a post-post, and http://aaa.com, #tag, $AAA, !event will auto recognize
    if it is a commit-post/poll-post, here is words describe the commit/poll
    here should allow author to add some [image]s, put this feature on the list
    `,
    poll: {
      start: "2000-01-01",  // 不准變更
      end: "2000-01-10", // 不准變更
      choices: ["choice a", "choice b", "choice c"], // 不准變更
      // _start: "2000-01-01",
      // _end: "2000-01-10",
      // _result: {},
    },
    link: {
      urL: "http://url.com",
      domain: "some domain",
      published_at: "2001-01-01 03:50",
    }
  },
}
const postCoutnt = {
  // nViews    Int      @default(0)
  nUps: 10,
  nDowns: 30,
  nComments: 21,
  poll: [3, 4, 18],
}
const bet = {

}


const polls = [
  '[每日任務]預測今天的大盤走勢，你已連續___天完成任務',
  '正在竄升的趨勢',
  '近期竄升股',
  '本日熱門話題',
  'coming IPO',
  'coming events',
  '"電動車"正夯，你覺得哪個電動車概念股最有成長潛力？',
  '美股還有__小時__分鐘開盤，已有____人預測本日走勢，你已連續___天完成任務',
  '你覺得自己善於哪些領域？',
  '點選你熟悉的股票',
]

const keywordBlacklist = []

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
      content: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sysContent: JSON.stringify({ docId: "1234abcd" }),
      cat: SymbolCat.TICKER
    }
  })
  const tag1 = await prisma.symbol.create({
    data: {
      name: "#Tag",
      content: JSON.stringify({ title: "Ticker", tags: ["#tag1", "tag2"], events: ["a-event", "b-event"] }),
      sysContent: JSON.stringify({}),
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
      content: JSON.stringify(_eventContent),
      sysContent: JSON.stringify({
        clusterId: "3847192",
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
  const j = JSON.parse(readFileSync('./prisma/seed.json', 'utf8'));
  for (let d of j.items.data) {
    await prisma.post.create({
      data: {
        title: d.title,
        content: JSON.stringify({ text: d.summary }),
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
  }


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

  for (let d of j.items.data) {
    await prisma.comment.create({
      data: {
        content: d.title,
        user: { connect: { id: user1.id } },
        post: { connect: { id: post1.id } },
        count: { create: {} }
      }
    })
  }


  // create a poll-post
  const pollPost = await prisma.post.create({
    data: {
      title: "feed header 1",
      content: JSON.stringify({
        text: "this is a poll-post",
        poll: {
          start: "2000-01-01",  // 不准變更
          end: "2000-01-10", // 不准變更
          choices: ["choice a", "choice b", "choice c"], // 不准變更
        },
      }),
      user: { connect: { id: user1.id } },
      count: { create: {} },
    }
  })

  // create a post-vote, check poll is available first
  await prisma.postVote.create({
    data: {
      user: { connect: { id: user1.id } },
      post: { connect: { id: pollPost.id } },
      choice: 2,
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


// var obj = JSON.parse(readFileSync('./prisma/headline.json', 'utf8'));
// console.log(obj.items.data[0])

