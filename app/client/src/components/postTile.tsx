import dayjs from 'dayjs'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Spin, Input, Card, Divider, Row, Col, Typography, Tag, Button, List, Space, Form, Comment, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { CoffeeOutlined, VerticalAlignTopOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostLike, PostDislike } from './postLike'
import { PostPoll } from './poll'
import { Comments } from './commentList'

interface FooterProps {
  post: QT.post_post
  commentCount: number
  showComments: boolean
  setShowComments: (a: boolean) => void
}

const Footer: React.FC<FooterProps> = ({ post, commentCount, showComments, setShowComments }) => {
  const myPostLikes = useQuery<QT.myPostLikes>(
    queries.MY_POST_LIKES, {
    fetchPolicy: "cache-only"
  })
  const [count, setCount] = useState<QT.post_post_count>(post.count)
  const [createPostLike] = useMutation<QT.createPostLike, QT.createPostLikeVariables>(
    queries.CREATE_POST_LIKE, {
    update(cache, { data }) {
      console.log("createPostLike")
      const res = cache.readQuery<QT.myPostLikes>({ query: queries.MY_POST_LIKES })
      if (data?.createPostLike && res?.myPostLikes) {
        cache.writeQuery<QT.myPostLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myPostLikes: res?.myPostLikes.concat([data?.createPostLike.like]),
          },
        })
        setCount(data.createPostLike.count)
      }
    },
  })
  const [updatePostLike] = useMutation<QT.updatePostLike, QT.updatePostLikeVariables>(
    queries.UPDATE_POST_LIKE, {
    refetchQueries: [],
    update(cache, { data }) {
      console.log("updatePostLike")
      const res = cache.readQuery<QT.myPostLikes>({ query: queries.MY_POST_LIKES })
      if (data?.updatePostLike && res?.myPostLikes) {
        cache.writeQuery<QT.myPostLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myPostLikes: res.myPostLikes.map((x) =>
              x.postId === data.updatePostLike.like.postId ? data.updatePostLike.like : x,
            ),
          },
        })
        setCount(data.updatePostLike.count)
      }
    },
  })

  const meLike = myPostLikes.data?.myPostLikes.find(d => d.postId === post.id)

  return (
    <div style={{ textAlign: "right" }}>
      <small>
        <Space>
          <span>@auto-CNBC</span>
          {/* <span>10:27</span> */}
          <PostLike
            key="comment-basic-like"
            postId={post.id}
            meLike={meLike}
            createPostLike={createPostLike}
            updatePostLike={updatePostLike}
            count={count} />
          <PostDislike
            key="comment-basic-dislike"
            postId={post.id}
            meLike={meLike}
            createPostLike={createPostLike}
            updatePostLike={updatePostLike}
            count={count} />
          <span
            key="comments"
            onClick={() => { setShowComments(!showComments) }}>
            <CoffeeOutlined />{commentCount}
          </span>
        </Space>
      </small>
    </div>
  )
}

interface PostProps {
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  post: QT.post_post
  me?: QT.me_me
  toLogin?: () => void
  folded?: boolean
  noHeader?: boolean
  noSpin?: boolean
  noThread?: boolean
}

const PostCard: React.FC<PostProps> = ({ post, me, toLogin, folded = true, noHeader = false, noSpin = false, noThread = false }) => {
  const [commentCount, setCommentCount] = useState<number>(post.count.nComments)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(!folded)
  const [viewed, setViewed] = useState<boolean>(false)

  function toAddCommentCountByOne() { setCommentCount(commentCount + 1) }

  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null

  const _title = viewed ?
    <Typography.Text>{post.title}&nbsp;</Typography.Text> :
    <Typography.Text strong>{post.title}&nbsp;</Typography.Text>

  let title
  // if (noThread && post.link) {
  //   link = <a
  //     target="_blank" rel="noopener noreferrer" href={post.link}
  //     onClick={() => { setViewed(true); setShowDetail(!showDetail) }}>
  //     {title} </a>
  // }
  // else 
  if (noThread) {
    title = <Button type="link"
      onClick={() => { setViewed(true); setShowDetail(!showDetail) }}>
      {_title} </Button>
  } else {
    title = <a
      target="_blank" rel="noopener noreferrer" href={`/post/${post.id}`}
      onClick={() => { setViewed(true); setShowDetail(!showDetail) }}>
      {_title} </a>
  }

  console.log(post)

  return (
    <Card>

      {
        !noHeader &&
        <Typography.Paragraph>

          {/* <Typography.Text type="secondary">邀請您參與評審：</Typography.Text> */}

          {title}

          <Space>
            {
              post.symbols.map((d, i) => (
                <Link key={i} to={`/symbol/${d.name}`}>
                  <i><Typography.Text type="secondary">{d.name}</Typography.Text></i>
                </Link>
              ))
            }
          </Space>

          {
            post.parent &&
            <>
              <br />
              <Typography.Text type="secondary">
                <SwapLeftOutlined />{post.parent.title}
              </Typography.Text>
            </>
          }

          {
            post.poll && post.poll.count &&
            <PostPoll
              pollId={post.poll.id}
              me={me}
              // toLogin={toLogin}
              poll={post.poll}
              count={post.poll.count}
              showDetail={showDetail}
              setShowDetail={setShowDetail}
            />
          }

        </Typography.Paragraph>
      }


      {
        showDetail &&
        <Typography.Paragraph>{post.text}</Typography.Paragraph>
      }

      {
        showComments &&
        <Comments postId={post.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      }

      <Footer {...{ post, commentCount, showComments, setShowComments }} />

      {
        showDetail && !noSpin &&
        < Typography.Paragraph >
          {
            post.children !== null &&
            post.children.map((d, i) => <span key={i}><SwapRightOutlined /><br /></span>)
          }
          {/* <Button type="link">...更多</Button> 或 建立一個&nbsp; */}
              建立一個&nbsp;<Link to="/submit" state={{ parent: post }}>Spin</Link>
        </Typography.Paragraph>
      }

    </Card>
  )
}

export const Post: React.FC<PostProps> = ({ post, me, toLogin, folded = false, noHeader = false }) => {
  switch (post.cat) {
    case QT.PostCat.LINK:
      // return <PostCard title={<a target="_new" href="link">title<a />} />
      return null
    case QT.PostCat.POLL:
    case QT.PostCat.REPLY:
      return <PostCard post={post} me={me} toLogin={toLogin} noThread noSpin />
  }
  return <PostCard post={post} me={me} toLogin={toLogin} />
}