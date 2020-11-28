import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { AutoComplete, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { CommentList, QueryCommentList, QuerySpotCommentList } from '../components/tileList'
import { Reply, Comment, CommentWithPoll } from '../components/tile'
// import { CommentForm } from '../components/tileForms'
import { ReplyForm } from '../components/tileForms'
import { CommentForm, SearchAllForm, SearchPageForm, NoteForm } from '../components/forms'
// import { CommentForm } from '../components/tileForms'
// import { SymbolAutoComplete } from '../components/symbolHint'

import { LineChart } from '../components/charts'
import ProsCons from '../components/prosCons/prosCons'
import Anchor from '../components/anchor/tickerAnchor'
import Tag from '../components/tag/tag'
import BlockCss from '../components/block/block.module.scss'
import BlockMetaCss from '../components/blockMeta/blockMeta.module.scss'
import Radio from '../components/radios/radios'
import CommenTemplate from '../components/commentTemplate/commentTemplate'
import MyTextArea from '../components/myTextArea/myTextArea'
import CssCommentList from '../components/commentList/commentList'
import { SomeTable } from '../components/tables'

const { Header, Sider, Content } = Layout

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

function KeyValueComment({ comment, direction }: { comment: IComment, direction: RepliesDirection }) {
  const [folded, setFolded] = useState(true)
  if (comment.replies.length === 0) {
    return (
      <>
        <span className={BlockMetaCss.span}>{comment.text}</span>
        <span>[new]</span>
      </>
    )
  }
  if (direction === RepliesDirection.HORIZONTAL) {
    return (
      <>
        <span className={BlockMetaCss.span}>{comment.text}</span>
        {comment.replies.map((e, i) => <span key={i}>{e.text}[{e.meta.link}]</span>)}
      </>
    )
  }
  return (
    <>
      <span className={BlockMetaCss.span}>{comment.text}</span>
      {comment.replies.map((e, i) => <div key={i}>{e.text}[{e.meta.link}]</div>)}
    </>
  )
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
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { path: symbol } }
  )
  // if (symbol === null && path === null)
  //   throw new Error("Should provide either id or path")
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Null block</h1>
  return (
    <Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <SearchPageForm />

      <pre>
        ticker name: {bk.props.name} {bk.props.symbol}
        symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}
        intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}
        {/* links: {bk.props?.links ? <Comment comment={bk.props?.links} /> : null} */}
        {/* 
        利多: <Comment comment={bk.props?.commentPros} />
        利空: <Comment comment={bk.props?.commentCons} />
        操作: <CommentWithPoll comment={bk.props?.commentPredict} poll={bk.props?.commentPredict.poll} /> 
        */}
      </pre>
      <pre>
        Alternative Block
      </pre>
      <pre>
        Battle Block
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
    </Content>
  )
}

