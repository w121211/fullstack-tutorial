import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Layout, } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CssBlockCard } from '../components/block'
import { On404 } from '../components/result'


interface RouteProps extends RouteComponentProps {
  me?: QT.me_me
}

// export const _TickerPage: React.FC<RouteProps> = function ({ symbol, me }) {
//   /** @deprecated */
//   const { data, loading } = useQuery<QT.page, QT.pageVariables>(
//     queries.PAGE, { variables: { symbolName: symbol } }
//   )
//   if (loading)
//     return null
//   if (!data)
//     return <p>something goes wrong</p>
//   if (data.page === null)
//     return <h1>Null Page</h1>
//   return (
//     <Layout.Content className="site-layout-background content" style={{ minHeight: 280 }}>

//       {/* <SearchPageForm /> */}
//       {/* <ReplyForm commentId="123" addReplyCountByOne={function () { }} /> */}

//       <h1>{data.page.title} ({data.page.props.selfSymbol})</h1>
//       <CssBlockCard title="">
//         <ul>
//           {data.page.props.topics &&
//             <Comment comment={data.page.props.topics} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', dispReplyAs: 'tile', swapText: 'Topics' }} />}
//           {data.page.props.links &&
//             <Comment comment={data.page.props.links} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: 'Links' }} />}
//           {data.page.props.intro &&
//             <Comment comment={data.page.props.intro} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', swapText: '簡介' }} />}
//           {data.page.props.pros &&
//             <Comment comment={data.page.props.pros} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '利多', suggestReplies: prosSuggestReplies }} />}
//           {data.page.props.cons &&
//             <Comment comment={data.page.props.cons} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '利空', suggestReplies: consSuggestReplies }} />}
//           {data.page.props.act &&
//             <Comment comment={data.page.props.act} options={{ ...defaultTileOptions, dispCommentAs: 'key-value', swapText: '操作判斷', swapChoices: ['買入', '持有', '賣出'] }} />}
//         </ul>
//       </CssBlockCard>
//       <CssBlockCard title="實驗中">
//         <ul>
//           <li>
//             <span className={blockMetaCss.span}>Note</span>
//             <ul>
//               <li># this is some note</li>
//               <li># this is another</li>
//             </ul>
//           </li>
//           <li>
//             <span className={blockMetaCss.span}>Alternative</span>
//             <ul>
//               <li>this is one this is one this is one</li>
//               <li>this is two</li>
//             </ul>
//           </li>
//           <li>
//             <span className={blockMetaCss.span}>Battle</span>
//             <ul>
//               <li>this is one this is one this is one</li>
//               <li>this is two</li>
//             </ul>
//           </li>
//           <li>
//             <span className={blockMetaCss.span}>主要股東</span>
//             <ul>
//               <li>this is one</li>
//               <li>this is two</li>
//             </ul>
//           </li>
//           <li>
//             <span className={blockMetaCss.span}>Insider交易</span>
//             <ul>
//               <li>this is one</li>
//               <li>this is two</li>
//             </ul>
//           </li>
//         </ul>
//       </CssBlockCard>
//       <pre>
//         (NEXT) Alternative Block
//       </pre>
//       <pre>
//         (NEXT) Battle Block
//       </pre>
//       <pre>
//         Comments Filter
//       </pre>
//       <pre>
//         Comments Form
//       </pre>

//       {/* <NoteForm /> */}

//       {/* <h2>Block Body (含nested blocks)</h2> */}
//       {/* <BlockBody body={bk.body} /> */}

//       {/* <h2>Block Comments</h2>
//       <h3>1. spot comments</h3>
//       {bk.comments ? <CommentList comments={bk.comments} /> : <p>null spot comments</p>}

//       <h3>2. comments (若允許comment的話)</h3>
//       {bk.props.canComment ? <QueryCommentList blockId={id} /> : <p>不允許comment</p>}

//       <h3>3. new comment (若允許comment的話)</h3>
//       {bk.props.canComment
//         ? <CommentForm blockId={bk.id} toAddCommentCountByOne={() => { }} />
//         : <p>不允許comment</p>} */}
//     </Layout.Content>
//   )
// }


