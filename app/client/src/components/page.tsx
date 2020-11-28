import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { Button, Card, Divider, Typography, Space, Form, Input, List } from 'antd'
import { CoffeeOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { CommentList } from './commentList'
import { PollChoicesAndForm } from './pollChoice'
// import { PollFooter, PostFooter } from './tileFooter'
// import { VotePostForm, NewChoicePostForm } from './postForm'
import { ReplyPanel, CommentPanel } from './tilePanel'
import { ReplyList, QueryReplyList, CommentList, QueryCommentList } from './tileList'
import { ReplyForm } from './tileForms'
import { NoteForm } from './forms'

export function PageProps({ page, showSpotReplies = true }: { page: QT.block_block, showSpotReplies?: boolean }) {
  const [folded, setFolded] = useState<boolean>(true)
  // const spotReplies = comment.replies.filter(e => e.isSpot)
  if (folded)
    return (
      <div>
        ------PageTile-------
        author:domain - title // top notes
        {/* <CommentList comments={page.topReplies} /> */}
        {/* <p>{comment.text}</p>
        <CommentPanel comment={comment} />
        <h4>-Spot Replies-</h4> */}
        {/* {comment.spotReplies ? <ReplyList replies={comment.spotReplies} /> : null} */}
        <button onClick={function (e) { setFolded(!folded) }}>展開</button>
        <br />
        -------------
      </div>
    )
  return (
    <div>
      ------PageTile-------
      author:domain - title // top notes
      <QueryCommentList blockId="123" />
      <NoteForm />
      <button onClick={function (e) { setFolded(!folded) }}>折疊</button>
      -------------
    </div>
  )
}

export function QueryPage({ id }: { id: string }) {
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { id } }
  )
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Page not found</h1>
  return (
    <div>
      <h2>Webpage</h2>
      <PageProps page={bk} />
      {/* 
      {bk.props.longName ? bk.props.longName : bk.props.name}
      symbol: {bk.props.symbol ? bk.props.symbol : "null"}<br />
      symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}<br />
      intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}<br /> 
      */}
    </div>
  )
}