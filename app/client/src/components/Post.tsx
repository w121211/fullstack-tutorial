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

// interface Props {
//   me?: QT.me_me
//   posts?: QT.post_post[]
//   setShowLogin: Dispatch<SetStateAction<boolean>>
// }

// export const Posts: React.FC<Props> = ({ me, posts, setShowLogin }) => {
//   // useQuery<QT.me>(queries.ME)
//   // useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
//   // useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
//   const { data, loading, error, fetchMore } = useQuery<QT.latestPosts, QT.latestPostsVariables>(
//     queries.LATEST_POSTS, {
//     fetchPolicy: "cache-and-network"
//   })

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>ERROR: {error.message}</p>
//   // if (!data) return <p>No feeds</p>

//   const after = '1234'
//   return (
//     <>
//       <button onClick={() => { setShowLogin(true) }}>
//         showLogin
//       </button>
//       {
//         data?.latestPosts && data?.latestPosts.map(
//           (x) => <Post key={x.id} post={x} setShowLogin={setShowLogin} />
//         )
//       }
//       <button onClick={
//         () => fetchMore({
//           variables: { after },
//           updateQuery: (prev, { fetchMoreResult }) => {
//             if (!fetchMoreResult) return prev
//             return {
//               ...prev,
//               latestPosts: [...prev.latestPosts, ...fetchMoreResult.latestPosts]
//             }
//           }
//         })
//       }>
//         Load more
//       </button>
//     </>
//   )
// }
