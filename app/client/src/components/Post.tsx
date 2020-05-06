import React, { useState, Dispatch, SetStateAction } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Input, Card, Divider, Typography, Tag, Button, Form } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostLike, DummyPostLike } from './PostLike'
import { PostPoll } from './PostPoll'
import { Comments } from './Comments'

interface PostProps {
  post: QT.post_post
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  me?: QT.me_me
  toLogin: () => void
  // setShowLogin: Dispatch<SetStateAction<boolean>>
}

export const Post: React.FC<PostProps> = ({ post, me, toLogin }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const toCollpase = () => setIsCollapsed(!isCollapsed)

  const comments = isCollapsed ? null : <Comments postId={post.id} />
  const symbols = post.symbols?.map(x =>
    <Link key={x.id} to={`/symbol/${x.name}`}>{x.name};</Link>
  )
  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null
  const like = me
    ? <PostLike postId={post.id} />
    : <DummyPostLike action={toLogin} />

  const title = post.contentLink
    ? (<a href={post.contentLink.url}>
      <h2>{post.title}</h2>
    </a>)
    : <h2>{post.title}</h2>
  const text = <p>post.content.text</p>
  const poll = post.contentPoll
    ? <PostPoll me={me} toLogin={toLogin} postId={post.id} poll={post.contentPoll} count={post.count} />
    : null

  return (
    <Card size="small">
      {title}<br />

      {symbols}<br />
      {like}<br />

      {text}<br />
      {poll}<br />

      <p>
        {post.updatedAt}, __some_source__,
        <button onClick={toCollpase}>
          {post.count?.nComments} Comments
        </button>
      </p>

      {edit}<br />

      {comments}
    </Card>
  )
}

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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const toCollpase = () => setIsCollapsed(!isCollapsed)

  // const comments = isCollapsed ? null : <Comments postId={post.id} />
  const comments = <Comments postId={post.id} />
  const symbols = post.symbols?.map(x =>
    <Link key={x.id} to={`/symbol/${x.name}`}>{x.name};</Link>
  )
  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null
  const like = me
    ? <PostLike postId={post.id} />
    : <DummyPostLike action={toLogin} />
  // const like = me
  //   ? <a>like</a> : null

  // const title = post.contentLink
  //   ? <a href={post.contentLink.url}><b>{post.title}</b></a>
  //   : <h2>{post.title}</h2>
  const title = <b>{post.title}</b>
  const text = post.contentText
  const poll = post.contentPoll
    ? <PostPoll me={me} toLogin={toLogin} postId={post.id} poll={post.contentPoll} count={post.count} />
    : null

  return (
    <Card size="small" style={{ width: 500, marginTop: 16 }} loading={false}>
      {/* {post.title} */}
      <p>
        <b>{title}</b>
        <br />{post.contentText}
      </p>
      {/* {symbols}<br /> */}
      {like}<br />

      {/* {text}<br /> */}
      {/* {poll}<br /> */}

      {/* <p>
        {post.updatedAt}, __some_source__,
        <button onClick={toCollpase}>
          {post.count?.nComments} Comments
        </button>
      </p> */}

      {/* {edit}<br /> */}

      {comments}
    </Card>
  )
}