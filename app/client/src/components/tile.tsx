import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Button, Card, Divider, Typography, Space, Form, Input, List } from 'antd'
import { CoffeeOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentList } from './commentList'
import { PollChoiceRadioGroup } from './pollChoice'
import { PollFooter, PostFooter } from './tileFooter'
import { PostForm } from './postForm'

interface SymbolListProps {
  symbols: QT.pollFragment_symbols[] | null
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }) => {
  if (symbols === null) return null
  return (
    <Space>
      {
        symbols.map((e, i) =>
          <Link key={i} to={`/symbol/${encodeURIComponent(e.name)}`}>
            {/* <i><Typography.Text type="secondary">{d.name}</Typography.Text></i> */}
            <i>{e.name}</i>
          </Link>
        )
      }
    </Space>
  )
}

interface PostCardProps {
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  post: QT.pollFragment_posts
  me?: QT.me_me
  toLogin?: () => void
  folded?: boolean
  noHeader?: boolean
  noSpin?: boolean
  noThread?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, me, toLogin, folded = true, noHeader = false, noSpin = false, noThread = false }) => {
  const [commentCount, setCommentCount] = useState<number>(post.count.nComments)
  const [showComments, setShowComments] = useState<boolean>(false)

  function toAddCommentCountByOne() { setCommentCount(commentCount + 1) }

  const mePosted = me?.id === post.userId
  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null

  return (
    <Card size="small">
      <Typography.Paragraph>{post.text}</Typography.Paragraph>
      {
        showComments &&
        <CommentList me={me} postId={post.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      }


      <PostFooter {...{ post, commentCount, showComments, setShowComments, mePosted }} />

    </Card>
  )
}

interface PollProps {
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  poll: QT.pollFragment
  me?: QT.me_me
  toLogin?: () => void
  folded?: boolean
  noHeader?: boolean
  noSpin?: boolean
  noThread?: boolean
}

enum TailPanel {
  POSTS,
  SUBMIT,
}

function ChoicePanel({ choices }: { choices: QT.choice[] }) {
  return (
    <Space>
      {
        choices.map(e =>
          <Button key={e.id} size="small" shape="round" onClick={() => {
            // setShowComments(!showComments)
          }}>
            {e.text}
            {/* &nbsp; */}
            {/* <small><LikeOutlined />30</small> */}
          </Button>
        )
      }
    </Space>
  )
}

export const PollCard: React.FC<PollProps> = ({ poll, me, toLogin, folded = true, noHeader = false, noSpin = false, noThread = false }) => {
  const [commentCount, setCommentCount] = useState<number>(poll.count.nComments)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(!folded)
  const [viewed, setViewed] = useState<boolean>(false)
  const [tailPanel, setTailPanel] = useState<TailPanel>(TailPanel.POSTS)
  const [clickedChoiceId, setClickedChoiceId] = useState<string | null>(null)

  function toAddCommentCountByOne() {
    setCommentCount(commentCount + 1)
  }

  const mePolled = me?.id === poll.userId
  // const edit = me?.id === poll.userId
  //   ? <Link to={`/post/${poll.id}?update`}>edit</Link>
  //   : null

  const start = dayjs(poll.start)
  const end = dayjs(poll.end)
  const title = poll.cat === QT.PollCat.FIXED ? poll.title : `${poll.title}[開放式回答]`

  const comments = poll.posts.map(e => ({
    ...e,
    thisPollVote: e.votes.find(e => e.pollId === poll.id)
  }))


  const postsByChoice = Object.fromEntries<QT.pollFragment_posts[]>(
    poll.choices.map(e => {
      const posts = poll.posts.filter(f => {
        const v = f.votes.find(g => g.pollId === poll.id)
        if (v?.choiceId === e.id) return true
        else return false
      })
      return [e.id, posts]
    })
  )


  function onClick(e: React.MouseEvent<HTMLElement>) {

  }


  return (
    <Card>

      <Typography.Paragraph>
        {/* <Typography.Text type="secondary">邀請您參與評審：</Typography.Text> */}
        {
          <span onClick={() => { setViewed(true); setShowDetail(!showDetail) }}>
            {
              viewed ?
                <Typography.Text>{title}&nbsp;</Typography.Text>
                :
                <Typography.Text strong>{title}&nbsp;</Typography.Text>
            }
          </span>
        }
        {/* <PollChoiceRadioGroup {...{ pollId: poll.id, me, poll, count: poll.count, setShowDetail }} /> */}
        <SymbolList symbols={poll.symbols} />

      </Typography.Paragraph>


      <Typography.Paragraph>
        <Space>
          {
            poll.choices.map(e =>
              <Button key={e.id} data-id={e.id} size="small" shape="round" onClick={(e) => {
                setShowComments(true)
                setClickedChoiceId(e.currentTarget.getAttribute('data-id'))
              }}>
                {e.text}
                {/* &nbsp; */}
                {/* <small><LikeOutlined />30</small> */}
              </Button>
            )
          }
        </Space>
      </Typography.Paragraph>


      {
        showDetail &&
        <Typography.Paragraph>
          <Typography.Text type="secondary">
            預測日：{end.format('l')}
            <br />投票期間：{start.format('l')} - {end.format('l')}
            <br />判定方式：投票人評審小組
          </Typography.Text>
        </Typography.Paragraph>
      }

      {
        showDetail &&
        <Typography.Paragraph>
          {poll.text}
        </Typography.Paragraph>
      }

      <PollFooter {...{ poll, commentCount, showComments, setShowComments, mePolled }} />

      {
        // showComments && clickedChoiceId && postsByChoice[clickedChoiceId].length > 0 &&
        showComments && clickedChoiceId &&
        <List
          // bordered
          size="small"
          dataSource={postsByChoice[clickedChoiceId]}
          locale={{ emptyText: "no ~~~~" }}
          renderItem={e => {
            return (
              <List.Item>
                {/* <Button size="small" shape="round">產品有競爭力</Button><br /> */}
                [產品有競爭力]<br />
                {e.text}<br />
                [up] [down]
              </List.Item>
            )
          }}
        />


        // <>
        //   <Divider />
        //   {
        //     poll.posts && poll.posts.length > 0 ?
        //       poll.posts.map((e, i) => <PostCard key={i} post={e} me={me} />)
        //       :
        //       "暫無回應"
        //   }
        // </>
        // <CommentList me={me} postId={poll.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      }


    </Card>
  )
}


export const Post: React.FC<PostCardProps> = ({ post, me, toLogin, folded = false, noHeader = false }) => {
  switch (post.cat) {
    case QT.PostCat.LINK:
      // return <PostCard title={<a target="_new" href="link">title<a />} />
      return null
    case QT.PostCat.REPLY:
      return <PostCard post={post} me={me} toLogin={toLogin} folded={folded} noHeader={noHeader} noThread noSpin />
  }
  return <PostCard post={post} me={me} toLogin={toLogin} folded={folded} noHeader={noHeader} />
}
