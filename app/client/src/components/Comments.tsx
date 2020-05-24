import React, { useState } from 'react'
import { Link } from '@reach/router'
import { useQuery, useMutation, } from '@apollo/react-hooks'
import { Card, Typography, List, Form, Button, Input, Comment, Space } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentLike, CommentDislike } from './CommentLike'


interface Props extends QT.commentsVariables {
  toAddCommentCountByOne: () => void
}

export const Comments: React.FC<Props> = ({ postId, after, toAddCommentCountByOne }) => {
  const { data, loading, error } = useQuery<QT.comments, QT.commentsVariables>(
    queries.COMMENTS,
    { variables: { postId, after } }
  )
  const myCommentLikes = useQuery<QT.myCommentLikes>(
    queries.MY_COMMENT_LIKES, {
    fetchPolicy: "cache-only"
  })
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
  const [form] = Form.useForm()
  const [createComment] = useMutation<QT.createComment, QT.createCommentVariables>(
    queries.CREATE_COMMENT, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.comments, QT.commentsVariables>({
        query: queries.COMMENTS,
        variables: { postId, after },
      })
      if (data?.createComment && res?.comments) {
        cache.writeQuery<QT.comments, QT.commentsVariables>({
          query: queries.COMMENTS,
          variables: { postId, after },
          data: { comments: res?.comments.concat([data?.createComment]) },
        })
        toAddCommentCountByOne()
        form.resetFields()
      }
    }
  })

  const onFinish = (values: any) => {
    createComment({ variables: { postId, data: values } })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Null data</p>

  return (
    <Card bordered={false}>
      {data.comments.map(c => {
        myCommentLikes.data?.myCommentLikes.find((x) => x.commentId === c.id)
        return (
          <Typography.Paragraph>
            <Typography.Text type="secondary">@anonymous, 5-15</Typography.Text>
            <br />
            {c.content}
            <br />
            <small>
              <Space>
                <span>
                  <CommentLike commentId={"123"} createCommentLike={createCommentLike} updateCommentLike={updateCommentLike} />
                </span>
                <span>
                  <CommentDislike commentId={"456"} createCommentLike={createCommentLike} updateCommentLike={updateCommentLike} />
                </span>
              </Space>
            </small>
          </Typography.Paragraph>
        )
      })}

      <Form
        form={form}
        name="comment-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="small"
      // layout="inline"
      // style={{ marginRight: 20 }}
      >
        <Form.Item
          name="content"
          rules={[{
            required: true,
            message: 'comment cannot be empty'
          }]}
        >
          <Input.TextArea rows={1} autoSize={true} placeholder="write a comment..." />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">送出</Button>
        </Form.Item>

      </Form>
      {/* <Button onClick={toAddCommentCountByOne}>aaa</Button> */}
    </Card>
  )
}

