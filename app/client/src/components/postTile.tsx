import React, { useState, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Spin, Input, Card, Divider, Row, Col, Typography, Tag, Button, List, Space, Form, Comment, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { CoffeeOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostLike, PostDislike } from './postLike'
import { PostPoll } from './poll'
import { Comments } from './commentList'


interface PostTileProps {
  post: QT.post_post
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  me?: QT.me_me
  toLogin?: () => void
  // setShowLogin: Dispatch<SetStateAction<boolean>>
}

export const PostTile: React.FC<PostTileProps> = ({ post, me, toLogin }) => {
  const [count, setCount] = useState<QT.post_post_count>(post.count)
  const myPostLikes = useQuery<QT.myPostLikes>(
    queries.MY_POST_LIKES, {
    fetchPolicy: "cache-only"
  })
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
  const [viewed, setViewed] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [commentCount, setCommentCount] = useState<number>(post.count.nComments)

  const toCollpase = () => setCollapsed(!collapsed)
  const toAddCommentCountByOne = () => setCommentCount(commentCount + 1)

  // const comments = <Comments postId={post.id} />
  // const symbols = post.symbols?.map(x =>
  //   <Tag key={x.id}>
  //     <Link to={`/symbol/${x.name}`}>{x.name}</Link>
  //   </Tag>
  // )
  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null
  const expand = collapsed
    ? <a onClick={() => setCollapsed(false)}>expand</a>
    : <a onClick={() => setCollapsed(true)}>collapse</a>


  const meLike = myPostLikes.data?.myPostLikes.find(x => x.postId === post.id)

  function onClickTitleLink() { }

  console.log('-------')
  console.log(post.poll)
  console.log(post.count)

  return (
    <Card size="small">
      <Typography.Paragraph>
        {/* <Badge dot><b>預測Luckin Coffee($LK))的未來走勢</b></Badge> */}
        {/* <b>{post.title}</b> */}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design"
          onClick={() => {
            setViewed(true)
            console.log("post viewd")
            console.log(post.title)
          }}
        >
          {viewed ? <Typography.Text>{post.title}</Typography.Text>
            : <Typography.Text strong>{post.title}</Typography.Text>}
        </a>

        {
          post.symbols.length > 0 ? (
            <>
              <br />
              <Space>
                {post.symbols.map((x, i) => (
                  <Link key={i} to={`/symbol/${x.name}`}>
                    <i>
                      <Typography.Text type="secondary">{x.name}</Typography.Text>
                    </i>
                  </Link>
                ))}
              </Space>
            </>
          ) : null
        }

        {
          (post.poll && post.count.poll) ? (
            <>
              <br />
              <PostPoll
                pollId={post.poll.id}
                me={me}
                // toLogin={toLogin}
                poll={post.poll}
                count={post.count.poll}
              />
            </>
          ) : null
        }

        {/* <br /> */}
        {/* {
          post.text.length > 50 ?
            `${post.text.substring(0, 50)}...` :
            post.text
        }
        <Button type="link">展開</Button> */}


      </Typography.Paragraph>



      {/* {collapsed ? null : <Typography.Paragraph>{post.text}</Typography.Paragraph>} */}
      {/* <Typography.Paragraph>{post.text}</Typography.Paragraph> */}

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
              onClick={toCollpase}>
              <CoffeeOutlined />{commentCount}
            </span>
          </Space>
        </small>
      </div>

      {
        collapsed ? null :
          <Comments postId={post.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      }

    </Card >
  )
}

interface PostListProps {
  me?: QT.me_me
  toLogin?: () => void
}

export const PostList: React.FC<PostListProps> = ({ me, toLogin }) => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myPollVotes>(queries.MY_POLL_VOTES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const { data, loading, error, fetchMore } = useQuery<QT.latestPosts, QT.latestPostsVariables>(
    queries.LATEST_POSTS, {
    fetchPolicy: "cache-and-network",
    onCompleted() {
      console.log('latestPosts completed')
    }
  })

  if (error) return <p>Something goes wrong...</p>
  // if (loading || !data) return null
  // if (loading) return <p>loading</p>
  if (!data) return null

  const after = data.latestPosts[data.latestPosts.length - 1].id

  function onClickMore() {
    fetchMore({
      variables: { after },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          latestPosts: [...prev.latestPosts, ...fetchMoreResult.latestPosts]
        }
      }
    })
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {
        data?.latestPosts && data?.latestPosts.map(x =>
          <PostTile
            key={x.id}
            post={x}
            me={me}
            toLogin={toLogin}
          />
        )
      }
      {/* <Divider>2010-5-1</Divider> */}
      <div style={{ textAlign: "center" }}>
        {
          loading ?
            <Spin /> :
            <Button type="primary" onClick={onClickMore}>載入更多</Button>
        }
      </div>
    </Space>
  )

}