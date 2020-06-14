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
import { Pane } from '../components/layout'
import { SymbolAutoComplete } from '../components/symbolHint'

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

let placeholdersByCat = {
  [QT.PostCat.POLL]: {
    cat: QT.PostCat.POLL,
    title: "這是一個預測",
    text: "這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測這是一個預測",
    symbols: ["#poll"],
    choices: ["AAA", "BBB", "CCC"],
    nDays: 7,
  },
  [QT.PostCat.ASK]: {
    cat: QT.PostCat.ASK,
    title: "這是一個問題",
    text: "這是一個問題這是一個問題這是一個問題這是一個問題這是一個問題這是一個問題這是一個問題這是一個問題",
    symbols: ["#ask"],
    choices: [],
  },
  [QT.PostCat.IDEA]: {
    cat: QT.PostCat.IDEA,
    title: "台達電斥9.65億元 收購加拿大圖控軟體公司Trihedral",
    text: "主文從第這裏開始...",
    symbols: ["#idea"],
    choices: [],
  },
  [QT.PostCat.REPLY]: {
    cat: QT.PostCat.REPLY,
    title: "Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開",
    text: "主文從第這裏開始...Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開",
    symbols: ["#reply"],
  },
  [QT.PostCat.COMMIT]: {
    cat: QT.PostCat.IDEA,
    title: "這是一個想法",
    text: "主文從第這裏開始...",
    symbols: [],
  },
  [QT.PostCat.LINK]: {
    cat: QT.PostCat.IDEA,
    title: "這是一個想法",
    text: "主文從第這裏開始...",
    symbols: [],
  },
}

interface PostFormProps {
  form: FormInstance
  parent?: QT.post_post
}

const PostForm: React.FC<PostFormProps> = ({ form, parent }) => {
  const [createPost] = useMutation<QT.createPost, QT.createPostVariables>(
    queries.CREATE_POST, {
    update(cache, { data }) {
      // console.log(typeof data?.createPost.poll?.start)
      // console.log(data?.createPost)
      try {
        const res = cache.readQuery<QT.latestPosts>({ query: queries.LATEST_POSTS })
        if (data?.createPost && res?.latestPosts) {
          cache.writeQuery<QT.latestPosts>({
            query: queries.LATEST_POSTS,
            data: {
              latestPosts: res.latestPosts.concat([data.createPost]),
            },
          })
        }
      } catch (e) {
        if (e instanceof InvariantError) { }
        else { console.error(e) }
      }

      navigate("/")
    },
  })
  const [cat, setCat] = useState<QT.PostCat>(form.getFieldValue("cat") || QT.PostCat.ASK)

  const isReply = parent !== undefined && QT.PostCat.REPLY === cat
  // const isSpin = parent !== undefined && !isReply

  if (isReply && parent) {
    placeholdersByCat[QT.PostCat.REPLY].title = `Reply: ${parent.title}`
  }

  function onFinish(values: any) {
    console.log('submit', values)

    createPost({
      variables: {
        data: {
          cat: values.cat,
          title: values.title,
          symbolIds: values.symbols,
          text: values.text,
          poll: values.cat === QT.PostCat.POLL ?
            {
              nDays: values.nDays,
              choices: values.choices,
            } : undefined
        },
        parentId: parent?.id,
      }
    })
  }
  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }


  return (
    <Form
      form={form}
      name="basic"
      size="small"
      initialValues={placeholdersByCat[cat]}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        {...layout}
        label="類別"
        name="cat"
        rules={[{ required: true, message: '請選擇類別' }]}
      >
        <Radio.Group onChange={(e) => {
          setCat(e.target.value)
          form.setFieldsValue(placeholdersByCat[e.target.value as QT.PostCat])
        }}>
          {
            isReply ?
              <Radio value={QT.PostCat.REPLY} checked>回覆</Radio>
              :
              <>
                <Radio value={QT.PostCat.ASK}>問題</Radio>
                <Radio value={QT.PostCat.POLL}>預測</Radio>
                <Radio value={QT.PostCat.IDEA}>想法</Radio>
                {/* <Radio value="d">連結</Radio> */}
              </>
          }
        </Radio.Group>
      </Form.Item>

      <Form.Item
        {...layout}
        label="標題"
        name="title"
        rules={[{ required: true, message: '請輸入標題' }]}
      >
        {
          isReply ?
            <Input disabled /> :
            <Input />
        }
      </Form.Item>

      {
        cat === QT.PostCat.POLL &&
        <Form.Item
          {...layout}
          label="預測期間"
          name="nDays"
          rules={[{ required: true, message: '請選擇預測期間' }]}
        >
          <Radio.Group>
            <Radio value={7}>7日</Radio>
            <Radio value={14}>14日</Radio>
            <Radio value={30}>30日</Radio>
            <Radio value={90}>90日</Radio>
          </Radio.Group>
        </Form.Item>
      }

      <Form.List name="choices">
        {(fields, { add, remove }) => {
          if (cat !== QT.PostCat.POLL) return null
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? layout : layoutWithoutLabel)}
                  label={index === 0 ? '選項' : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "請輸入選項",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder={`選項${index + 1}`} style={{ width: '60%' }} />
                  </Form.Item>

                  {fields.length > 2 ? (
                    <MinusCircleOutlined
                      style={{ margin: '0 8px' }}
                      onClick={() => { remove(field.name) }}
                    />
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item  {...layoutWithoutLabel}>
                <Button
                  type="dashed"
                  onClick={() => { add() }}
                // style={{ width: '60%' }}
                >
                  <PlusOutlined /> 增加選項
                    </Button>
              </Form.Item>

            </div>
          )
        }}
      </Form.List>

      <Form.Item
        {...layout}
        label="內文"
        name="text"
        rules={
          cat !== QT.PostCat.POLL
            ? [{ required: true, message: '請輸入內文' }] : []
        }
      >
        <Input.TextArea rows={3} autoSize={{ minRows: 8 }} />
      </Form.Item>

      <Form.Item name="symbols" label="標籤" {...layout}>
        <SymbolAutoComplete form={form} cat={cat} />
      </Form.Item>

      <Form.Item {...layoutWithoutLabel}>
        <Button type="primary" htmlType="submit">送出</Button>
      </Form.Item>

    </Form >
  )
}

interface PreviewProps {
  values: any
  parent?: QT.post_post
}

const Preview: React.FC<PreviewProps> = ({ values, parent }) => {
  const [showDetail, setShowDetail] = useState(true)

  const start = dayjs().startOf('d')

  return (
    <>
      <Typography.Paragraph>
        <Typography.Text strong>
          <span onClick={() => { setShowDetail(!showDetail) }}>{values.title}</span>&nbsp;
          </Typography.Text>

        {
          (values.symbols as string[]).length > 0 &&
          <Space>
            {(values.symbols as string[]).map((x, i) => (
              <a key={i} href={`/symbol/${encodeURIComponent(x)}`} target="_blank" rel="noopener noreferrer">
                <i>
                  <Typography.Text type="secondary">{x}</Typography.Text>
                </i>
              </a>
            ))}
          </Space>
        }

        {
          parent &&
          <>
            <br />
            <a href={`/post/${encodeURIComponent(parent.id)}`} target="_blank" rel="noopener noreferrer">
              <Typography.Text type="secondary">
                spin from {parent.title}
                {/* <SwapLeftOutlined />{parent.title} */}
              </Typography.Text>
            </a>
          </>
        }

        {
          values.cat === QT.PostCat.POLL && (
            <>
              <br />
              <Radio.Group onChange={() => { setShowDetail(true) }}>
                {
                  (values.choices as string[]).map(
                    (item, i) => <Radio key={i} value={item}>{item}</Radio>
                  )
                }
              </Radio.Group>
              <Button type="link" onClick={() => { setShowDetail(!showDetail) }}>{values.nDays}日期預測</Button>
              <Button shape="round">投票</Button>

              {
                showDetail && (
                  <>
                    <Typography.Text type="secondary">
                      <br />預測日：{start.add(values.nDays || 0, 'd').format('l')} ({values.nDays}日後)
                      <br />投票期間：{start.format('l')} - {start.add(values.nDays - 1 || 0, 'd').format('l')}
                      <br />判定方式：投票人評審小組
                  </Typography.Text>
                    <br />
                  </>
                )
              }
            </>
          )
        }

      </Typography.Paragraph>

      {
        showDetail &&
        <Typography.Paragraph>{values.text}</Typography.Paragraph>
      }

    </>
  )
}

interface PostCreateProps {
  parent?: QT.post_post
  isReply?: boolean
}

const PostCreate: React.FC<PostCreateProps> = ({ parent, isReply = false }) => {
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState<boolean>(true)

  if (parent && isReply) form.setFields([{ name: "cat", value: QT.PostCat.REPLY }])

  return (
    <>
      {
        parent &&
        <Typography.Title level={4}>
          <i>
            {form.getFieldValue("cat") === QT.PostCat.REPLY ? "Reply to: " : "Spin from: "}
            {parent?.title}
          </i>
        </Typography.Title>
      }

      {
        showForm ?
          <div>
            <Button type="link"><Typography.Text strong>編輯</Typography.Text></Button>
            <Button type="link" onClick={() => { setShowForm(false) }}>預覽</Button>
          </div>
          :
          <div>
            <Button type="link" onClick={() => { setShowForm(true) }}>編輯</Button>
            <Button type="link"><Typography.Text strong>預覽</Typography.Text></Button>
          </div>
      }

      <Card style={{ width: "100%" }}>
        {
          showForm ?
            <PostForm form={form} parent={parent} />
            :
            <Preview values={form.getFieldsValue()} parent={parent} />
        }
      </Card>
    </>
  )
}

interface SubmitPageProps extends RouteComponentProps {
  location?: WindowLocation<{ parent: QT.post_post }>
  isLoggedIn?: boolean
}

export const SubmitPage: React.FC<SubmitPageProps> = ({ location, isLoggedIn = false }) => {
  const params = new URLSearchParams(window.location.search)
  const reply = params.get("reply")
  const spin = params.get("spin")

  const { data, loading, error } = useQuery<QT.post, QT.postVariables>(
    queries.POST, {
    variables: { id: reply || spin || "" }
  })

  if (reply) {
    if (loading) return null
    if (error) return <p>something goes wrong</p>
    if (!data) return <p>something goes wrong</p>
  } else if (spin) {
    if (loading) return null
    if (error) return <p>something goes wrong</p>
    if (!data) return <p>something goes wrong</p>
  }

  return (
    <Layout>
      <Layout.Content>
        <Pane left={<PostCreate parent={data?.post} isReply={Boolean(reply)} />} />
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
