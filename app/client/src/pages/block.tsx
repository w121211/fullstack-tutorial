import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Row, Col, Badge, Button, Card, Radio, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentPanel } from '../components/tilePanel'
import { CommentForm } from '../components/tileForms'
// import { RepliedPostList } from '../components/postList'

/**
 * 1. comment, reply: list, form
 * 2. block: body
 * 3. front-page: search, latest comments
 * 
 * Block <- queryBlock(id?, path?)
 * - header: name, symbols, path
 * - BlockBody <- props
 *   - Text
 *   - Ticks <- ticks(symbol, start, end)
 *   - Table <- table(symbol, start, end)
 *   - Blocks
 * - Comments <- moreComments(blockId, after), replies & moreReplies, 
 *   - TextComment
 *   - PropComment (fold/unfold)
 *   - PollComment
 * - NewComment
 */

const props = {
  name: "",
  path: "",
  symbol: ".",
  canComment: true,
  canOpenAlone: false,
  longName: { connect: true },
  linkedSymbols: { connect: true },
  intro: { connect: true },
}

const blockBody = {
  ticks: null,
  table: null,
  blocks: [],
}

const commentProps = {
  type: "",  // PROP_1, PROP_N,  TEXT, POLL
  display: "",  // LIST, 
}


const fakeAlternativeBlock = {}

const fakeBoardBlock = {}

const fakeTradesBlock = {}

const fakeFinancialBlock = {}

const fakePriceBlock = {}

const fakeViewBlock = {
  props: { name: "View", symbol: "$BA", path: "/$BA/View", canComment: false, canOpenAlone: false },
  body: { table: null, ticks: null },
  spotComments: [
    { type: "PROP", text: "Pros", suggestedReplies: ["aaa", "bbb"] },
    { type: "PROP", text: "Cons", suggestedReplies: ["ccc", "ddd"] },
    { type: "POLL", text: "Predict", suggestedReplies: [] }
  ]
}

const fakeTickerBlock = {
  _id: 1234, _createdAt: 1234567,
  _template: "ticker",  // NEXT
  _templateId: 1234, // NEXT
  // _userId: "@bot",
  // _type: "NOARG",
  _path: "/$BA",
  props: {
    name: "$BA",  // 禁止使用'/'作為title
    fullName: "$BA (Boeing Corp.)",
    path: "/$BA",
    canComment: true,
    linkedSymbols: { _id: 12 },
  },
  propComments: [
    { _id: 11, type: "PROP", status: "ARCHIVE", text: "long name", spotReplies: [] },
    { _id: 12, type: "PROP", status: "OPEN", text: "symbols", spotReplies: [] },
  ],
  comments: null,
  body: { blocks: [] },
  blocks: [
    fakeViewBlock,
  ]
}

// ---------------------------------------------------------------

function FilteredReplyList({ replies, pattern }: { replies: string[], pattern: string | null }) {
  const list = replies.map(e => {
    if (pattern === null)
      return <span>{e}, </span>
    else if (e.indexOf(pattern) >= 0)
      return <span>{e}</span>
    return null
  })
  return <p>{list}</p>
}

function Poll({ poll, pattern, setPattern }: { poll: { choices: string[] }, pattern: null | string, setPattern: (a: string | null) => void }) {
  function setter(s: string) {
    if (pattern !== null) setPattern(null)
    else setPattern(s)
  }
  const choices = poll.choices.map(e => {
    return <button onClick={f => { setter(e) }}>{e}</button>
  })
  return <>{choices}</>
}


function BaseComment({ comment }: { comment: QT.comment }) {
  /**
   *        | 折疊時                      | 展開時
   * - Text | 只顯示text                  | text + replies(as-list) 
   * - Poll | 顯示Text, PollChoices       | text + replies(as-list) 
   * - Prop | 同時展現text & spotReplies   | prop-text + replies(as-list) 
   * 
   */
  // getReplies, addReply, voteComment, voteReply
  // const { data, loading, error, refetch } = useQuery<QT.comments, QT.commentsVariables>(
  //   queries.COMMENTS, { variables: { postId: "12345" } }
  // )
  // if (loading) return null
  // if (error) return <p>ERROR: {error.message}</p>
  // if (!data) return null
  // function toAddCommentCountByOne() { }
  const data = {
    id: 11,
    type: "PROP",  // "TEXT", "POLL"
    text: "this is something",
    replies: [{ id: 11, text: "aaa" }, { id: 12, text: "bbb" }],
    spotReplies: [{ id: 11, text: "aaa" }, { id: 12, text: "bbb" }],
    poll: { id: 11, choices: ["aaa", "bbb"], nVotes: [10, 20], },
  }
  const [pattern, setPattern] = useState<string | null>(null)
  const [folded, setFolded] = useState<boolean>(true)

  let text
  switch (data.type) {
    case "PROP":
      text = <p>{data.text}: {data.spotReplies.map(e => e.text)}</p>
      break
    // case "POLL":
    //   text = <p>{data.text}</p>
    default:
      text = <p>{data.text}</p>
      break
  }

  // const meCommented = me?.id === post.userId

  if (folded) return (
    <div onClick={e => { setFolded(false) }}>
      {text}
      {data.poll ? <Poll poll={data.poll} pattern={pattern} setPattern={setPattern} /> : null}
    </div>
  )
  return (
    <>
      {text}
      {data.poll ? <Poll poll={data.poll} pattern={pattern} setPattern={setPattern} /> : null}
      <CommentPanel comment={comment} meCommented={false} />
      <FilteredReplyList replies={data.replies.map(e => e.text)} pattern={pattern} />
    </>
  )
}

function CommentList({ comments, spotComments }: any) {
  return (
    <>
      <h1>Spot Comments</h1>
      {spotComments.map((e: any) => <BaseComment comment={e} />)}

      <h1>Comments</h1>
      {spotComments.map((e: any) => <BaseComment comment={e} />)}
    </>
  )
}

function SomeTable({ data }: any) { return null }
function SomeChart({ data }: any) { return null }

function BlockCardBody({ body }: any) {
  // 假定body只能是其中一個
  if (body.blocks) throw new Error("Block card cannot have blocks as body")
  else if (body.table) return <SomeTable data={body.table} />
  else if (body.ticks) return <SomeChart data={body.ticks} />
  return null
}

function BlockCard({ block }: any) {
  const data = fakeViewBlock
  return (
    <>
      {data.props.canOpenAlone ? <a href={data.props.path}>{data.props.name}</a> : data.props.name}
      <BlockCardBody body={block.body} />
      <CommentList spotComments={data.spotComments} />
    </>
  )
}

function BlockBody({ body }: any) {
  // 假定body只能是其中一個
  if (body.blocks) body = body.blocks.map((e: any) => <BlockCard block={e} />)
  else if (body.table) body = <SomeTable data={body.table} />
  else if (body.ticks) body = <SomeChart data={body.ticks} />
  return body
}

function BlockPath({ path }: { path: string | null }) {
  if (path === null) return null

  // const fake = "/$AAA/aaa/bbb"
  let base = ""
  let paths = []
  for (const p of path.split("/")) {
    if (p === "") continue
    const joined = `${base}/${p}`
    base = joined
    paths.push(joined)
  }
  return (
    <>{paths.map(e => <a href={e}></a>)}</>
  )
}

function NewComment({ blockId }: { blockId: string }) {
  const fakeToAddCommentCountByOne = () => { }
  return <CommentForm blockId={blockId} toAddCommentCountByOne={fakeToAddCommentCountByOne} />
}


function BlockAsPage({ id, path }: { id?: string, path?: string }) {
  /**
   * TODO: `block.props`需定義是否需要顯示、怎麼顯示，這裡就不考慮個別property
   */
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { id } }
  )

  if (id === null && path === null) throw new Error("Should provide either id or path")
  if (queryBlock.loading) return null
  if (!queryBlock.data) return <p>something goes wrong</p>

  const bk = queryBlock.data.block
  return (
    <>
      <h1>Page Header</h1>
      <BlockPath path={bk.props.path} />

      <h1>Properties</h1>
      {bk.props.longName}
      {bk.props?.commentSymbols ? <BaseComment comment={bk.props?.commentSymbols} /> : null}
      {bk.props?.commentIntro ? <BaseComment comment={bk.props?.commentIntro} /> : null}

      <h1>Block Body</h1>
      <BlockBody body={bk.body} />

      <h1>Block Comments (當允許comment的情況)</h1>
      {bk.props.canComment ? <NewComment blockId={bk.id} /> : <p>不允許comment</p>}
      {bk.comments ? <CommentList comments={bk.comments} /> : null}
    </>
  )
}

function BlockWithFakeData({ block }: any) {
  // const [share, setShare] = useState<{ clickedChoice: number | null }>({ clickedChoice: null })
  // const symbols = data.props.symbols.map(e => <a href="/">e</a>)
  // const dict = data.body.dict.map(e => {
  //   // e[1:]
  //   const key = e[0]
  //   const value = e.slice(1).join(",")
  //   return <li>{key}: {value}</li>
  // })
  const data = fakeTickerBlock

  return (
    <>
      <h1>Page Header</h1>
      <BlockPath path={data.props.path} />
      {data.props.fullName}
      <h1>Page Body</h1>
      <BlockBody body={block.body} />

      <h1>Page Comments</h1>
      {data.comments ? <CommentList comments={data.comments} /> : null}
      {/* {data.props.canComment ? <NewComment /> : null} */}
    </>
  )
}

// ----------------------------------------------------------------------

interface BlockProps {
  id: string
  me?: QT.me_me
}


// const _Block: React.FC<BlockProps> = ({ me, id }) => {
//   return (
//     <>
//       <Post post={queryPost.data.post} me={me} folded={false} choice="choice" />

//       {/* <div style={{ textAlign: "center" }}>
//         <Typography.Title level={4}>Replies</Typography.Title>
//       </div> */}
//       <br />
//       <Typography.Title level={4}>回覆</Typography.Title>
//       <RepliedPostList parent={queryPost.data.post} me={me} noHeader />
//     </>
//   )
// }


interface BlockPageProps extends RouteComponentProps<{ id: string }> {
  me?: QT.me_me
}

export const BlockPage: React.FC<BlockPageProps> = ({ id, me }) => {
  // if (!id) return <Redirect to="/" />
  // if (!location?.state.id) return <Redirect to="/" />
  // return <Symbol name={decodeURIComponent(name)} />
  // return <Block me={me} id="123" />
  return <BlockAsPage id={id} />
}