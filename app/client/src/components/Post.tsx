import React, { useState } from 'react'
import { Link } from '@reach/router'
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useApolloClient,
} from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import { Input, Card, Divider, Typography, Tag, Button, Form } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

interface PostLikeProps {
  postId: string
  // myPostLikes: QT.myPostLikes_myPostLikes[]
}

const PostLike: React.FC<PostLikeProps> = ({ postId }) => {
  const [createPostLike] = useMutation<
    QT.createPostLike,
    QT.createPostLikeVariables
  >(queries.CREATE_POST_LIKE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPostLikes>({
        query: queries.MY_POST_LIKES,
      })
      if (data?.createPostLike && res?.myPostLikes) {
        cache.writeQuery<QT.myPostLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myPostLikes: res?.myPostLikes.concat([data?.createPostLike]),
          },
        })
      }
    },
  })
  const [updatePostLike] = useMutation<
    QT.updatePostLike,
    QT.updatePostLikeVariables
  >(queries.UPDATE_POST_LIKE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPostLikes>({
        query: queries.MY_POST_LIKES,
      })
      if (data?.updatePostLike && res?.myPostLikes) {
        cache.writeQuery<QT.myPostLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myPostLikes: res.myPostLikes.map((x) =>
              x.postId === data.updatePostLike.postId ? data.updatePostLike : x,
            ),
          },
        })
      }
    },
  })
  const { data, loading, error } = useQuery<QT.myPostLikes>(
    queries.MY_POST_LIKES,
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Null data</p>

  const meLike = data.myPostLikes.find((e) => e.postId === postId)

  let likeAction
  let liked = false
  if (meLike && meLike.choice !== 1) {
    likeAction = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 1 } } })
  } else if (meLike && meLike.choice === 1) {
    likeAction = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 0 } } })
    liked = true
  } else {
    likeAction = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: 1 } } })
  }

  let dislikeAction
  let disliked = false
  if (meLike && meLike.choice !== 2) {
    dislikeAction = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 2 } } })
  } else if (meLike && meLike.choice === 2) {
    dislikeAction = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 0 } } })
    liked = true
  } else {
    dislikeAction = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: 2 } } })
  }

  return (
    <>
      <a onClick={likeAction}>{liked ? <b>like</b> : 'like'}</a>
      <a onClick={dislikeAction}>{disliked ? <b>dislike</b> : 'dislike'}</a>
    </>
  )
}

interface CommentsProps extends QT.commentsVariables {}

const Comments: React.FC<CommentsProps> = ({ postId, after }) => {
  const { data, loading, error } = useQuery<QT.comments, QT.commentsVariables>(
    queries.COMMENTS,
    { variables: { postId, after } },
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Null data</p>
  return (
    <>
      {/* <CreateComment feedId={feedId} after={after} isHidden={isHidden} /> */}
      <ul>
        {data.comments.map((c) => (
          <li key={c.id}>
            {c.content} <br />
            <p>
              xx
              {/* <Like parent={c} /> */}
            </p>
          </li>
        ))}
      </ul>
      {/* <CommentForm createComment={null} /> */}
    </>
  )
}

// interface SymbolProps {
//   symbol: PostTypes.post_symbols
// }

// const Symbol: React.FC<SymbolProps> = ({ symbol }) => {
//   const { id, slug } = symbol
//   return (
//     <Link key={id} to={`/tag/${id}`}>
//       {slug}
//     </Link>
//   )
// }

interface Props {
  post?: QT.post_post
}

const _post: QT.post_post = {
  __typename: 'Post',
  id: 'id',
  view: QT.View.PUBLIC,
  title: 'title',
  content: 'content',
  symbols: [],
  updatedAt: '2000-1-1',
  // count: null,
  // meLike: null,
  count: {
    __typename: 'PostCount',
    id: 'id',
    nViews: 10,
    nUps: 15,
    nDowns: 5,
    nComments: 30,
    updatedAt: '2000-1-1',
  },
}

export const Post: React.FC<Props> = ({ post = _post }) => {
  const { id, view, title, content, symbols, updatedAt, count, meLike } = post
  // const [isHidden, setIsHidden] = useState<boolean>(true)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  // const { data, loading, error } = useQuery<MyLikesTypes.MyLikes>(MY_LIKES, {
  //   // skip: isHidden
  //   onCompleted(res) {
  //     console.log('fetched myLikes')
  //     console.log(res)
  //   },
  //   // pollInterval: 500
  // })
  const comments = isHidden ? null : <Comments postId={id} />
  return (
    <Card size="small">
      <a>
        <b>{title}</b>
      </a>
      <br />
      {symbols?.map((t) => (
        <Link key={t.id} to={`/tag/${t.id}`}>
          {t.slug};
        </Link>
      ))}
      <br />
      <PostLike postId={id} />
      <p>
        __updatedAt__ __Source.com__ |
        <a onClick={() => setIsHidden(!isHidden)}>
          {count?.nComments} Comments
        </a>
      </p>
      {/* {!isHidden && <Comments feedId={id} isHidden={isHidden} />} */}
      {/* {<Comments feedId={id} isHidden={false} />} */}
      {comments}
    </Card>
  )
}
