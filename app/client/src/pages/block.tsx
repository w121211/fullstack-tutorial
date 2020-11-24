import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Row, Col, Badge, Button, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { CommentForm } from '../components/tileForms'
import { CommentList, QueryCommentList, QuerySpotCommentList } from '../components/tileList'
import { Reply, Comment } from '../components/tile'

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

// --- CSS support UI ---

export function CssBlockCard({ title, children }: { title: string, children: React.ReactNode }) {
  // const [isloadding, setLoadding] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => setLoadding(false), 1000)
  // }, [])
  return (
    <Card
      title={title}
      className={BlockCss.card}
      hoverable
      // loading={isloadding}
      bordered={false}
    >
      {children}
    </Card>
  )
}


// ---------------------------------------------------------------

function Poll({ poll, pattern, setPattern }: { poll: { choices: string[] }, pattern: null | string, setPattern: (a: string | null) => void }) {
  function setter(s: string) {
    if (pattern !== null) setPattern(null)
    else setPattern(s)
  }
  const choices = poll.choices.map((e, i) => {
    return <button key={i} onClick={f => { setter(e) }}>{e}</button>
  })
  return <>{choices}</>
}

function SomeChart({ data }: any) {
  // return <div>[[[Some chart goes here]]]</div>
  return (
    <>
      <LineChart />
    </>
  )
}

// ---------------------------------------------------------------

function BlockPath({ path }: { path: string | null }) {
  if (path === null)
    return null
  let base = ""
  let subs = []
  for (const p of path.split("/")) {
    if (p === "") continue
    const joined = `${base}/${p}`
    base = joined
    subs.push([p, joined])
  }
  // console.log(paths)
  return (
    <>
      {subs.map(function (e, i) {
        return <span key={i} >/<a href={e[1]}>{e[0]}</a></span>
      })}
    </>
  )
}

function NestedBlockBody({ body }: { body: QT.block_block_body_blocks_body }) {
  // 假定body只能是其中一個
  if (body.table)
    return <SomeTable />
  if (body.ticks)
    return <SomeChart data={body.ticks} />
  // throw new Error("應該要被處理但沒處理的body")
  return null
}

function NestedBlock({ block }: { block: QT.block_block_body_blocks }) {
  // const { data, loading, error, refetch } = useQuery<QT.comments, QT.commentsVariables>(
  //   queries.COMMENTS, { variables: { blockId: block.id } }
  // )
  // if (loading)
  //   return null
  // console.log(data?.comments)
  // const data = fakeViewBlock
  // if (block.body.blocks) throw new Error("Block card cannot have blocks as body")
  return (
    <CssBlockCard title={block.props.name ?? ""}>
      {/* {data.props.canOpenAlone ? <a href={data.props.path}>{data.props.name}</a> : data.props.name} */}
      {/* <CommentList spotComments={data.spotComments} /> */}
      <BlockPath path={block.props.path} />

      <h2>Block Body</h2>
      <NestedBlockBody body={block.body} />

      {/* <h2>Comments (NestedBlock 只會給spot comments)</h2>
      {block.comments ? <CommentList comments={block.comments} /> : <p>null spot comments</p>} */}

      <CssCommentList />
      <MyTextArea />
    </CssBlockCard>
  )
}

function BlockBody({ body }: { body: QT.block_block_body }) {
  // 假定body只能是其中一個
  if (body.blocks)
    return <>{body.blocks.map((e, i) => <NestedBlock key={i} block={e} />)}</>
  if (body.table)
    return <SomeTable />
  if (body.ticks)
    return <SomeChart data={body.ticks} />
  // throw new Error("應該要被處理但沒處理的body")
  return null
}

function BlockAsPage({ id, path }: { id: string, path?: string }) {
  /**
   * TODO: `block.props`需定義是否需要顯示、怎麼顯示，這裡就不考慮個別property
   * 需要考慮template？
   */
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { id } }
  )
  if (id === null && path === null)
    throw new Error("Should provide either id or path")
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Null block</h1>

  return (
    <Content
      className="site-layout-background content"
      style={{ minHeight: 280, }}
    >
      <h2>Block as page: Path</h2>
      <BlockPath path={bk.props.path} />

      {/* 
      {bk.props.longName ? bk.props.longName : bk.props.name}
      symbol: {bk.props.symbol ? bk.props.symbol : "null"}<br />
      symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}<br />
      intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}<br /> 
      */}

      <h2>Block Body (含nested blocks)</h2>
      <BlockBody body={bk.body} />

      <h2>Block Comments</h2>
      <h3>1. spot comments</h3>
      {bk.comments ? <CommentList comments={bk.comments} /> : <p>null spot comments</p>}

      <h3>2. comments (若允許comment的話)</h3>
      {bk.props.canComment ? <QueryCommentList blockId={id} /> : <p>不允許comment</p>}

      <h3>3. new comment (若允許comment的話)</h3>
      {bk.props.canComment
        ? <CommentForm blockId={bk.id} toAddCommentCountByOne={() => { }} />
        : <p>不允許comment</p>}
    </Content>
  )
}

function TickerPage({ id, path }: { id: string, path?: string }) {
  /**
   * TODO: `block.props`需定義是否需要顯示、怎麼顯示，這裡就不考慮個別property
   * 需要考慮template？
   */
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { id } }
  )
  if (id === null && path === null)
    throw new Error("Should provide either id or path")
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Null block</h1>

  return (
    <Content
      className="site-layout-background content"
      style={{ minHeight: 280, }}
    >
      <h2>Ticker page: Path</h2>
      {/* <BlockPath path={bk.props.path} /> */}


      {/* {bk.props.longName ? bk.props.longName : bk.props.name}
      symbol: {bk.props.symbol ? bk.props.symbol : "null"}<br />
      symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}<br />
      intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}<br />  */}


      <h2>Block Body (含nested blocks)</h2>
      <BlockBody body={bk.body} />

      <h2>Block Comments</h2>
      <h3>1. spot comments</h3>
      {bk.comments ? <CommentList comments={bk.comments} /> : <p>null spot comments</p>}

      <h3>2. comments (若允許comment的話)</h3>
      {bk.props.canComment ? <QueryCommentList blockId={id} /> : <p>不允許comment</p>}

      <h3>3. new comment (若允許comment的話)</h3>
      {bk.props.canComment
        ? <CommentForm blockId={bk.id} toAddCommentCountByOne={() => { }} />
        : <p>不允許comment</p>}
    </Content>
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
  if (!id)
    return <h1>Need Block ID</h1>
  // if (!id) return <Redirect to="/" />
  // if (!location?.state.id) return <Redirect to="/" />
  // return <Symbol name={decodeURIComponent(name)} />
  // return <Block me={me} id="123" />
  // return <BlockAsPage id={id} me={me} />
  return <BlockAsPage id={id} />
}


interface BlockPageProps extends RouteComponentProps<{ id: string }> {
  me?: QT.me_me
}

export const BlockMetaPage: React.FC<BlockPageProps> = ({ id, me }) => {
  return (
    <Content
      className="site-layout-background content"
      style={{ minHeight: 280, }}
    >
      <h1>Boeing ($BA)</h1>
      <CssBlockCard title="">
        <ul>
          <li>
            <span className={BlockMetaCss.span}>標籤</span>
            <p>[新增]</p>
            {/* <Tag content="$BA" /> */}
          </li>
          <li>
            <span className={BlockMetaCss.span}>標籤</span>
            <p>[新增]</p>
            {/* <Tag content="$BA" /> */}
          </li>
          <li>
            <span className={BlockMetaCss.span}>關聯事件</span>
            <Tag content={["~COVI-19~"]} />
          </li>
          <li>
            <span className={BlockMetaCss.span}>簡介</span>
            <p>
              波音公司（英語：The Boeing
              Company）是美國一家開發、生產及销售固定翼飛機、旋翼
              机、运载火箭、导弹和人造卫星等產品，為世界最大的航天航空器製造商。
          </p>
          </li>
        </ul>
      </CssBlockCard>
      <CssBlockCard title="Community">
        {/* {radioList} */}
        <MyTextArea />
        <CssCommentList />
      </CssBlockCard>

    </Content>
  )
}
