import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as queries from '../store/queries'
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
}

export const PostLike: React.FC<PostLikeProps> = ({ postId }) => {
  const { data } = useQuery<QT.myPostLikes>(
    queries.MY_POST_LIKES, {
    fetchPolicy: "cache-only"
  })
  const [createPostLike] = useMutation<QT.createPostLike, QT.createPostLikeVariables>(
    queries.CREATE_POST_LIKE, {
    update(cache, { data }) {
      console.log("createPostLike")
      const res = cache.readQuery<QT.myPostLikes>({
        query: queries.MY_POST_LIKES,
      })
      if (data?.createPostLike && res?.myPostLikes) {
        // data?.createPostLike.postId = postId
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPostLikes>({
          query: queries.MY_POST_LIKES,
          data: {
            myPostLikes: res?.myPostLikes.concat([data?.createPostLike]),
            // myPostLikes: res?.myPostLikes.concat([fake]),
          },
        })
      }
    },
  })
  const [updatePostLike] = useMutation<QT.updatePostLike, QT.updatePostLikeVariables>(
    queries.UPDATE_POST_LIKE, {
    refetchQueries: [],
    update(cache, { data }) {
      console.log("updatePostLike")
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

  const meLike = data?.myPostLikes.find((x) => x.postId === postId)

  let likeFn, liked = false
  if (meLike && meLike.choice !== 1) {
    likeFn = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 1 } } })
  } else if (meLike && meLike.choice === 1) {
    likeFn = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 0 } } })
    liked = true
  } else {
    likeFn = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: 1 } } })
  }
  let dislikeFn, disliked = false
  if (meLike && meLike.choice !== 2) {
    dislikeFn = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 2 } } })
  } else if (meLike && meLike.choice === 2) {
    dislikeFn = (e: any) =>
      updatePostLike({ variables: { postId, data: { choice: 0 } } })
    disliked = true
  } else {
    dislikeFn = (e: any) =>
      createPostLike({ variables: { postId, data: { choice: 2 } } })
  }

  return (
    <>
      <button onClick={likeFn}>
        {liked ? 'liked' : 'like'}
      </button>
      <button onClick={dislikeFn}>
        {disliked ? 'disliked' : 'dislike'}
      </button>
    </>
  )
}