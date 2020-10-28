import React, { useState } from 'react'
import { useMutation, } from '@apollo/client'
import { Form, Button, Input } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

export function CommentForm({ blockId, toAddCommentCountByOne }: { blockId: string, toAddCommentCountByOne: () => void }) {
  const [form] = Form.useForm()
  const [createComment] = useMutation<QT.createComment, QT.createCommentVariables>(
    queries.CREATE_COMMENT, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.comments, QT.commentsVariables>({
        query: queries.COMMENTS,
        variables: { blockId },
      })
      if (data?.createComment && res?.comments) {
        cache.writeQuery<QT.comments, QT.commentsVariables>({
          query: queries.COMMENTS,
          variables: { blockId },
          data: { comments: res?.comments.concat([data?.createComment]) },
        })
        toAddCommentCountByOne()
        form.resetFields()
      }
    }
  })
  const onFinish = (values: any) => {
    createComment({ variables: { blockId, data: values } })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <Form
      form={form}
      name="comment-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    // size="small"
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
        <Input placeholder="你的意見..." />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">送出</Button>
      </Form.Item>

    </Form>
  )
}
