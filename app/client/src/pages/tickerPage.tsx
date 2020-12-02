import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Popover, Tag, AutoComplete, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { CommentList, QueryCommentList } from '../components/tileList'
import { Reply, Comment, CommentWithPoll } from '../components/tile'
// import { CommentForm } from '../components/tileForms'
import { ReplyForm } from '../components/tileForms'
import { CommentForm, SearchAllForm, SearchPageForm, NoteForm } from '../components/forms'
// import { CommentForm } from '../components/tileForms'
// import { SymbolAutoComplete } from '../components/symbolHint'
import { CssBlockCard } from '../components/block'

// ------------------

function AlternativesBlock({ ticker }: { ticker: string }) {
  const byTopics = []
  return null
}

function CommentsBlock() {
  return null
}

interface IReplyMeta {
  link?: string
}

interface IReply {
  text: string
  nUps?: number
  nDowns?: number
  meta: IReplyMeta
}

interface IComment {
  text: string
  replies: IReply[]
  nUps?: number
  nDowns?: number
}

enum RepliesDirection {
  HORIZONTAL,
  VERTICAL,
}

const fakeComments = {
  topics: {},
  links: {
    __typename: "Comment" as const,
    id: "123",
    userId: "123",
    isSpot: true,
    createdAt: "August 19, 1975 23:15:30",
    text: "links",
    poll: null,
    count: {
      __typename: "CommentCount" as const,
      id: "123",
      nViews: 10,
      nUps: 20,
      nDowns: 1,
    },
    spotReplies: [
      {
        __typename: "Reply" as const,
        id: "111",
        userId: "222",
        isSpot: true,
        text: "Yahoo Finance",
        meta: { link: "https://finance.yahoo.com/quote/BA" },
        updatedAt: "August 19, 1975 23:15:30",
        count: {
          __typename: "ReplyCount" as const,
          id: "333",
          nViews: 10,
          nUps: 11,
          nDowns: 12,
        },
      },
      {
        __typename: "Reply" as const,
        id: "111",
        userId: "222",
        isSpot: true,
        text: "Wikipedia",
        meta: { link: "https://en.wikipedia.org/wiki/Boeing" },
        updatedAt: "August 19, 1975 23:15:30",
        count: {
          __typename: "ReplyCount" as const,
          id: "333",
          nViews: 10,
          nUps: 11,
          nDowns: 12,
        },
      },
    ],
  },
  intro: {
    text: "簡介",
    replies: [],
  },
  plus: {
    text: "簡介",
    spotReplies: [],
    replies: [],
  },
  minus: {},
  predict: {
    __typename: "Comment" as const,
    id: "123",
    userId: "123",
    isSpot: true,
    createdAt: "August 19, 1975 23:15:30",
    text: "預測",
    count: {
      __typename: "CommentCount" as const,
      id: "123",
      nViews: 10,
      nUps: 20,
      nDowns: 1,
    },
    spotReplies: [
      {
        __typename: "Reply" as const,
        id: "111",
        userId: "222",
        meta: { choice: 1 },
        isSpot: true,
        text: "a poll reply",
        updatedAt: "August 19, 1975 23:15:30",
        count: {
          __typename: "ReplyCount" as const,
          id: "333",
          nViews: 10,
          nUps: 11,
          nDowns: 12,
        },
      },
      // { text: "BBB", meta: { choice: 2 }, }
    ],
    poll: {
      __typename: "Poll" as const,
      id: "123",
      commentId: "456",
      choices: ["買入", "持有", "賣出"],
      nVotes: [3, 2, 1],
      createdAt: "August 19, 1975 23:15:30",
    }
  },
}

interface RouteProps extends RouteComponentProps<{ symbol: string }> {
  me?: QT.me_me
}

export const TickerPage: React.FC<RouteProps> = function ({ symbol, me }) {
  const queryPage = useQuery<QT.page, QT.pageVariables>(
    queries.PAGE, { variables: { symbolName: symbol } }
  )
  const [text, setText] = useState<string>("aaa")

  if (queryPage.loading)
    return null
  if (!queryPage.data)
    return <p>something goes wrong</p>
  const pg = queryPage.data.page
  if (!pg)
    return <h1>Null Page</h1>

  // const popover = <a onClick={function () { setText("bbb") }}>{text}</a>
  // return (
  //   <Popover content={popover}>
  //     <Tag>
  //       123<b>{text}</b>
  //     </Tag>
  //   </Popover>
  // )

  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>

      {/* <SearchPageForm /> */}
      {/* <ReplyForm commentId="123" addReplyCountByOne={function () { }} /> */}

      Title: {pg.title} {pg.props.selfSymbol}

      <CssBlockCard title="">
        <ul>
          {pg.props.topics &&
            <Comment comment={pg.props.topics} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: 'Topics' }} />}
          {pg.props.links &&
            <Comment comment={pg.props.links} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: 'Links' }} />}
          {pg.props.intro &&
            <Comment comment={pg.props.intro} options={{ dispCommentAs: 'key-value', swapText: '簡介' }} />}
          {pg.props.pros &&
            <Comment comment={pg.props.pros} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '利多' }} />}
          {pg.props.cons &&
            <Comment comment={pg.props.cons} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '利空' }} />}
          {pg.props.act &&
            <Comment comment={pg.props.act} options={{ dispCommentAs: 'key-value', swapText: '操作判斷', swapChoices: ['買入', '持有', '賣出'] }} />}
        </ul>
      </CssBlockCard>

      <pre>
        (NEXT) Alternative Block
      </pre>
      <pre>
        (NEXT) Battle Block
      </pre>
      <pre>
        Comments Filter
      </pre>
      <pre>
        Comments Form
      </pre>

      {/* <h2>Block Body (含nested blocks)</h2> */}
      {/* <BlockBody body={bk.body} /> */}

      {/* <h2>Block Comments</h2>
      <h3>1. spot comments</h3>
      {bk.comments ? <CommentList comments={bk.comments} /> : <p>null spot comments</p>}

      <h3>2. comments (若允許comment的話)</h3>
      {bk.props.canComment ? <QueryCommentList blockId={id} /> : <p>不允許comment</p>}

      <h3>3. new comment (若允許comment的話)</h3>
      {bk.props.canComment
        ? <CommentForm blockId={bk.id} toAddCommentCountByOne={() => { }} />
        : <p>不允許comment</p>} */}
    </Layout.Content>
  )
}


