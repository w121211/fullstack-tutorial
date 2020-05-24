import React, { useState, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Badge, Input, Card, Divider, Row, Col, Typography, Tag, Button, List, Space, Form, Comment, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { CoffeeOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostLike, PostDislike } from './PostLike'
import { PostPoll } from './PostPoll'
import { Comments } from './Comments'


interface PostTileProps {
  post: QT.post_post
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  me?: QT.me_me
  toLogin: () => void
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

  const contentPoll = {
    __typename: "PostPoll" as const,
    start: "2000-01-01",  // 不准變更
    end: "2000-01-10", // 不准變更
    choices: ["choice a", "choice b", "choice c"], // 不准變更
    // status: "",
    // _start: "2000-01-01",
    // _end: "2000-01-10",
    // _result: {},
  }

  const comments = collapsed ? null : <Comments postId={post.id} toAddCommentCountByOne={toAddCommentCountByOne} />
  const meLike = myPostLikes.data?.myPostLikes.find(x => x.postId === post.id)

  const onClickTitleLink = () => { }

  return (
    <Card size="small" style={{ width: 500 }}>
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

        <br />
        {
          post.symbols.length > 0 ? (
            <small>
              <Space>
                {post.symbols.map((x, i) => (
                  <Link key={i} to={`/symbol/${x.name}`}>
                    <Typography.Text>{x.name}</Typography.Text>
                  </Link>
                ))}
              </Space>
            </small>
          ) : null
        }
      </Typography.Paragraph>

      <Typography.Paragraph>
        <PostPoll
          postId={post.id}
          // poll={contentPoll}
          // count={post.count}
          me={me}
          toLogin={toLogin}
        />
      </Typography.Paragraph>

      {/* {!collapsed && contentPoll ?
        <Typography.Paragraph>
          <PostPoll
            postId={post.id}
            // poll={contentPoll}
            // count={post.count}
            me={me}
            toLogin={toLogin}
          />
        </Typography.Paragraph>
        : null
      } */}

      {collapsed ? null : <Typography.Paragraph>{post.contentText}</Typography.Paragraph>}

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

      {collapsed ? null : comments}

    </Card >
  )
}