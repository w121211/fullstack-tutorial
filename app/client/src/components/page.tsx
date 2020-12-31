import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { Button, Card, Divider, Typography, Space, Form, Input, List } from 'antd'
import { CoffeeOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { QueryCommentList } from './tileList'

// export function PageProps({ page, showSpotReplies = true }: { page: QT.page_page, showSpotReplies?: boolean }) {
//   const [folded, setFolded] = useState<boolean>(true)
//   // const spotReplies = comment.replies.filter(e => e.isSpot)
//   if (folded)
//     return (
//       <div>
//         ------PageTile-------
//         author:domain - title // top notes
//         {/* <CommentList comments={page.topReplies} /> */}
//         {/* <p>{comment.text}</p>
//         <CommentPanel comment={comment} />
//         <h4>-Spot Replies-</h4> */}
//         {/* {comment.spotReplies ? <ReplyList replies={comment.spotReplies} /> : null} */}
//         <button onClick={function (e) { setFolded(!folded) }}>展開</button>
//         <br />
//         -------------
//       </div>
//     )
//   return (
//     <div>
//       ------PageTile-------
//       author:domain - title // top notes
//       <QueryCommentList pageId="123" />
//       <button onClick={function (e) { setFolded(!folded) }}>折疊</button>
//       -------------
//     </div>
//   )
// }

// export function QueryPage({ id }: { id: string }) {
//   const queryBlock = useQuery<QT.page, QT.pageVariables>(
//     queries.PAGE, { variables: { id } }
//   )
//   if (queryBlock.loading)
//     return null
//   if (!queryBlock.data)
//     return <p>something goes wrong</p>
//   const bk = queryBlock.data.page
//   if (!bk)
//     return <h1>Page not found</h1>
//   return (
//     <div>
//       <h2>Webpage</h2>
//       <PageProps page={bk} />
//       {/* 
//       {bk.props.longName ? bk.props.longName : bk.props.name}
//       symbol: {bk.props.symbol ? bk.props.symbol : "null"}<br />
//       symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}<br />
//       intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}<br /> 
//       */}
//     </div>
//   )
// }
