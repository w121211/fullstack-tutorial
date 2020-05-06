import React from 'react'
import { useMutation, } from '@apollo/react-hooks'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

interface Props {
  commentId: string
  // myPostLikes: QT.myPostLikes_myPostLikes[]
  meLike: QT.commentLike | null
}

export const CommentLike: React.FC<Props> = ({ commentId, meLike }) => {
  const [createCommentLike] = useMutation<QT.createCommentLike, QT.createCommentLikeVariables>(
    queries.CREATE_COMMENT_LIKE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myCommentLikes>({
        query: queries.MY_COMMENT_LIKES,
      })
      if (data?.createCommentLike && res?.myCommentLikes) {
        cache.writeQuery<QT.myCommentLikes>({
          query: queries.MY_COMMENT_LIKES,
          data: {
            myCommentLikes: res?.myCommentLikes.concat([data?.createCommentLike]),
          },
        })
      }
    },
  })
  const [updateCommentLike] = useMutation<QT.updateCommentLike, QT.updateCommentLikeVariables>(
    queries.UPDATE_COMMENT_LIKE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myCommentLikes>({
        query: queries.MY_COMMENT_LIKES,
      })
      if (data?.updateCommentLike && res?.myCommentLikes) {
        cache.writeQuery<QT.myCommentLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myCommentLikes: res.myCommentLikes.map((x) =>
              x.commentId === data.updateCommentLike.commentId ? data.updateCommentLike : x
            ),
          },
        })
      }
    },
  })

  let like
  let liked = false
  if (meLike && meLike.choice !== 1) {
    like = (e: any) =>
      updateCommentLike({ variables: { commentId, data: { choice: 1 } } })
  } else if (meLike && meLike.choice === 1) {
    like = (e: any) =>
      updateCommentLike({ variables: { commentId, data: { choice: 0 } } })
    liked = true
  } else {
    like = (e: any) =>
      createCommentLike({ variables: { commentId, data: { choice: 1 } } })
  }

  let dislike
  let disliked = false
  if (meLike && meLike.choice !== 2) {
    dislike = (e: any) =>
      updateCommentLike({ variables: { commentId, data: { choice: 2 } } })
  } else if (meLike && meLike.choice === 2) {
    dislike = (e: any) =>
      updateCommentLike({ variables: { commentId, data: { choice: 0 } } })
    disliked = true
  } else {
    dislike = (e: any) =>
      createCommentLike({ variables: { commentId, data: { choice: 2 } } })
  }

  return (
    <>
      <a onClick={like}>
        {liked ? 'liked' : 'like'}
      </a>
      &nbsp;
      <a onClick={dislike}>
        {disliked ? 'disliked' : 'dislike'}
      </a>
    </>
  )
}