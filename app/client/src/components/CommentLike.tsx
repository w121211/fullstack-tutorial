import React from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'

import * as QT from '../store/queryTypes'

interface CommentLikeProps {
  commentId: string
  count: QT.comment_count
  meLike?: QT.commentLike
  createCommentLike: (a: { variables: QT.createCommentLikeVariables }) => void
  updateCommentLike: (a: { variables: QT.updateCommentLikeVariables }) => void
}

export const CommentLike: React.FC<CommentLikeProps> = ({ commentId, count, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    liked = true
  } else {
    onClick = () =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.UP } } })
  }

  return (
    <span onClick={onClick}>
      {liked ? <LikeFilled /> : <LikeOutlined />}
      {count.nUps}
    </span>
  )
}

export const CommentDislike: React.FC<CommentLikeProps> = ({ commentId, count, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = () =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    disliked = true
  } else {
    onClick = () =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.DOWN } } })
  }

  return (
    <span onClick={onClick}>
      {disliked ? <DislikeFilled /> : <DislikeOutlined />}
      {count.nDowns}
    </span>
  )
}