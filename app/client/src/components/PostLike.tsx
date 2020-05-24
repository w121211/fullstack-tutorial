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
  meLike?: QT.postLike
  createPostLike: (a: { variables: QT.createPostLikeVariables }) => void
  updatePostLike: (a: { variables: QT.updatePostLikeVariables }) => void
  count: QT.post_post_count
}


export const PostLike: React.FC<PostLikeProps> = ({ postId, meLike, createPostLike, updatePostLike, count }) => {
  let onClick
  let liked = false
  if (meLike && meLike.choice !== QT.LikeChoice.UP) {
    onClick = (e: any) =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.UP } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.UP) {
    onClick = (e: any) =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    liked = true
  } else {
    onClick = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: QT.LikeChoice.UP } } })
  }
  return (
    <span onClick={onClick}>
      {liked ? <LikeFilled /> : <LikeOutlined />}
      {count.nUps}
    </span>
  )

}

export const PostDislike: React.FC<PostLikeProps> = ({ postId, meLike, createPostLike, updatePostLike, count }) => {
  let onClick
  let disliked = false
  if (meLike && meLike.choice !== QT.LikeChoice.DOWN) {
    onClick = (e: any) =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.DOWN } } })
  } else if (meLike && meLike.choice === QT.LikeChoice.DOWN) {
    onClick = (e: any) =>
      updatePostLike({ variables: { id: meLike.id, data: { choice: QT.LikeChoice.NEUTRAL } } })
    disliked = true
  } else {
    onClick = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: QT.LikeChoice.DOWN } } })
  }
  return (
    <span onClick={onClick}>
      {disliked ? <LikeFilled /> : <LikeOutlined />}
      {count.nDowns}
    </span>
  )
}