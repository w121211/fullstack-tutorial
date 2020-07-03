import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import React, { useState } from 'react'
import { RouteComponentProps, navigate, Link, WindowLocation } from '@reach/router'
import { InvariantError } from 'ts-invariant'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Alert, AutoComplete, Form, Input, Button, Layout, Row, Col, Card, Typography, Radio, Popover, Space } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { MinusCircleOutlined, PlusOutlined, SwapLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Pane } from './layout'
import { SymbolAutoComplete } from './symbolHint'

dayjs.extend(localizedFormat)

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const layoutWithoutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}

const PLACEHOLDER = {
  choice: "這是一個選項",
  text: "這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測",
  symbols: ["#poll"],
}

interface PostFormProps {
  cat?: QT.PollCat
  choice?: QT.pollFragment_choices
}

export const PostForm: React.FC<PostFormProps> = ({ cat = QT.PostCat.REPLY, choice }) => {
  const [form] = Form.useForm()
  const [createPost] = useMutation<QT.createPost, QT.createPostVariables>(
    queries.CREATE_POST, {
    update(cache, { data }) {
      // console.log(typeof data?.createPost.poll?.start)
      // console.log(data?.createPost)
      // try {
      //   const res = cache.readQuery<QT.latestPosts>({ query: queries.LATEST_POLLS })
      //   if (data?.createPost && res?.latestPolls) {
      //     cache.writeQuery<QT.latestPolls>({
      //       query: queries.LATEST_POLLS,
      //       data: {
      //         latestPolls: res.latestPolls.concat([data.createPoll]),
      //       },
      //     })
      //   }
      // } catch (e) {
      //   if (e instanceof InvariantError) { }
      //   else { console.error(e) }
      // }

      navigate("/")
    },
  })

  function onFinish(values: any) {
    console.log('submit', values)

    createPost({
      variables: {
        data: {
          cat: values.cat,
          symbolIds: values.symbols,
          text: values.text,
        }
      }
    })
  }
  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }

  const requireText = cat === QT.PollCat.ADD_BY_POST


  return (
    <Form
      form={form}
      name="basic"
      size="small"
      initialValues={PLACEHOLDER}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item {...layout} label="選項">
        {choice?.text}
      </Form.Item>

      {
        cat === QT.PollCat.ADD &&
        <Form.Item
          {...layout}
          label="選項"
          name="choice"
          rules={[{ required: true, message: '請輸入選項' }]}
        >
          <Input />
        </Form.Item>
      }

      <Form.Item
        {...layout}
        label="內文"
        name="text"
        required={requireText}
        rules={[{ required: requireText, message: '請輸入內文' }]}
      >
        <Input.TextArea rows={3} autoSize={{ minRows: 8 }} />
      </Form.Item>

      <Form.Item name="symbols" label="標籤" {...layout}>
        <SymbolAutoComplete form={form} />
      </Form.Item>

      <Form.Item {...layoutWithoutLabel}>
        <Button type="primary" htmlType="submit">送出</Button>
      </Form.Item>

    </Form >
  )
}