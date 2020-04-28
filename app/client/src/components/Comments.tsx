import React, { useState } from 'react'
import { Link } from '@reach/router'
import {
  useQuery,
  useMutation,
} from '@apollo/react-hooks'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentLike } from './CommentLike'
import { CommentForm } from './CommentForm'


function CommentEditForm() {
  return null
}

interface CommentProps {
  comment: QT.comments_comments
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const edit = comment.meComment ? <button>edit</button> : null
  return (
    <>
      <p>{comment.content}</p>
      <br />
      <CommentLike commentId={comment.id} meLike={comment.meLike} />
      {edit}
    </>
  )
}

interface Props extends QT.commentsVariables { }

export const Comments: React.FC<Props> = ({ postId, after }) => {
  const { data, loading, error } = useQuery<QT.comments, QT.commentsVariables>(
    queries.COMMENTS,
    { variables: { postId, after } }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Null data</p>

  return (
    <>
      {/* <CreateComment feedId={feedId} after={after} isHidden={isHidden} /> */}
      <ul>
        {data.comments.map((x) => (
          <Comment key={x.id} comment={x} />
        ))}
      </ul>
      <CommentForm postId={postId} />
    </>
  )
}

