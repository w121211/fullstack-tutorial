import React from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'

import * as QT from '../store/queryTypes'

interface CommentLikeProps {
  commentId: string
  meLike?: QT.commentLike
  createCommentLike: (a: { variables: QT.createCommentLikeVariables }) => void
  updateCommentLike: (a: { variables: QT.updateCommentLikeVariables }) => void
}

export const CommentLike: React.FC<CommentLikeProps> = ({ commentId, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = (e: any) =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = (e: any) =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    liked = true
  } else {
    onClick = (e: any) =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.UP } } })
  }
  if (liked) return <LikeFilled onClick={onClick} />
  else return <LikeOutlined onClick={onClick} />
}

export const CommentDislike: React.FC<CommentLikeProps> = ({ commentId, meLike, createCommentLike, updateCommentLike }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = (e: any) =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = (e: any) =>
      updateCommentLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    disliked = true
  } else {
    onClick = (e: any) =>
      createCommentLike({ variables: { commentId, data: { choice: QT.LikeChoice.DOWN } } })
  }
  if (disliked) return <DislikeFilled onClick={onClick} />
  else return <DislikeOutlined onClick={onClick} />
}