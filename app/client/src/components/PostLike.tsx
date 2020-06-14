import React, { useState } from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'
import * as QT from '../store/queryTypes'

interface DummyPostLikeProps {
  // setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
  action: any
}

// const action = () => setShowLogin(true)

export const DummyPostLike: React.FC<DummyPostLikeProps> = ({ action }) => {
  return (
    <>
      <button onClick={action}>
        like
      </button>
      <button onClick={action}>
        dislike
      </button>
    </>
  )
}

interface PostLikeProps {
  postId: string
  count: QT.post_post_count
  meLike?: QT.postLike
  createPostLike: (a: { variables: QT.createPostLikeVariables }) => void
  updatePostLike: (a: { variables: QT.updatePostLikeVariables }) => void
}


export const PostLike: React.FC<PostLikeProps> = ({ postId, count, meLike, createPostLike, updatePostLike }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = () =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = () =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    liked = true
  } else {
    onClick = () =>
      createPostLike({ variables: { postId, data: { choice: QT.LikeChoice.UP } } })
  }
  return (
    <span onClick={onClick}>
      {liked ? <LikeFilled /> : <LikeOutlined />}
      {count.nUps}
    </span>
  )

}

export const PostDislike: React.FC<PostLikeProps> = ({ postId, count, meLike, createPostLike, updatePostLike }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = () =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = () =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    disliked = true
  } else {
    onClick = () =>
      createPostLike({ variables: { postId, data: { choice: QT.LikeChoice.DOWN } } })
  }
  return (
    <span onClick={onClick}>
      {disliked ? <DislikeFilled /> : <DislikeOutlined />}
      {count.nDowns}
    </span>
  )
}