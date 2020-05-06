import React, { useState } from 'react'
import { Link } from '@reach/router'
import { useQuery, useMutation, } from '@apollo/react-hooks'
import { Space } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentLike } from './CommentLike'
import { CommentForm } from './CommentForm'


function CommentEditForm() {
  return null
}

interface CommentProps {
  comment: QT.comments_comments
  i: number
}

const Comment: React.FC<CommentProps> = ({ comment, i }) => {
  const edit = comment.meComment ? <a>edit</a> : null
  return (
    <>
      {comment.content}
      <span style={{ float: "right" }}>
        <Space direction="horizontal">
          <a>#{i}</a>
          {/* &nbsp; */}
          <CommentLike commentId={comment.id} meLike={comment.meLike} />
          {/* <a>like</a> <a>dislike</a> #1 */}
          {edit}
        </Space>
      </span>
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
      <p>
        {data.comments.map((x, i) => (
          <Comment key={x.id} comment={x} i={i} />
        ))}
        {/* * Ant Design, a design language for background applications, is refined by Ant UED Team
              <span style={{ float: "right" }}><a>like</a> <a>dislike</a> #1</span> */}
      </p>
      {/* <CommentForm postId={postId} /> */}
    </>
  )
}

