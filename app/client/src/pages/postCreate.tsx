import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import React, { useState } from 'react'
import { RouteComponentProps, navigate, Link, WindowLocation } from '@reach/router'
import { InvariantError } from 'ts-invariant'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Alert, AutoComplete, Form, Input, Button, Layout, Row, Col, Card, Typography, Radio, Popover, Space } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { Post } from '../components/PostForm'
import { PageContainer, Pane } from '../components/layout'

dayjs.extend(localizedFormat)

function PopoverSymbol({ symbol, removeSymbol }: { symbol: string, removeSymbol: (a: string) => void }) {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Popover
      content={
        <>
          <Button type="link" onClick={() => {
            removeSymbol(symbol)
            setVisible(false)
          }}>
            刪除
            </Button>
        </>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
    >
      <Button type="link">{symbol}</Button>
    </Popover>
  )
}

function SymbolAutoComplete({ form }: { form: FormInstance }) {
  const [symbols, setSymbols] = useState<string[]>(form.getFieldValue("symbols"))
  const [value, setValue] = useState<string>("")
  const [options, setOptions] = useState<{ value: string }[]>([])
  // const [suggestSymbols, setSuggestSymbols] = useState<string[]>(["#aaa", "#bbb"])
  const suggestSymbols = ["#aaa", "#bbb"]

  function addSymbol(name: string) {
    const _symbols = Array.from(new Set(symbols).add(name))
    setSymbols(_symbols)
    form.setFields([{ name: "symbols", value: _symbols }])
  }
  function removeSymbol(name: string) {
    const _symbols = symbols.filter(x => x !== name)
    setSymbols(_symbols)
    form.setFields([{ name: "symbols", value: _symbols }])
  }
  function onSearch(data: string) {
    if (data.includes("#"))
      setOptions([{ value: "#aaa" }, { value: "#bbb" }])
    else if (data.includes("$"))
      setOptions([{ value: "$123" }, { value: "$456" }])
    else
      setOptions([])
  }
  function onSelect(data: string) {
    addSymbol(data)
    setValue("")
  }
  function onChange(data: string) {
    setValue(data)
  }

  return (
    <>
      {
        symbols.map((item, i) => <PopoverSymbol key={i} symbol={item} removeSymbol={removeSymbol} />)
      }
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 120 }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="輸入#, $搜尋"
      />
      {/* 建議：
      {
        suggestSymbols.map((item, i) => {
          if (symbols.includes(item))
            return null
          return <Button type="link" key={i} onClick={() => { addSymbol(item) }}>{item}</Button>
        })
      } */}
    </>
  )

}

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

const placeholdersByCat = {
  [QT.PostCat.POLL]: {
    cat: QT.PostCat.POLL,
    title: "台達電斥9.65億元 收購加拿大圖控軟體公司Trihedral",
    text: "電源大廠台達電 (2308-TW) 今 (30) 日宣布，擬透過子公司 Delta Electronics (Netherlands) B.V.，斥約 4500 萬加幣(約新台幣 9.65 億元)，收購加拿大 SCADA 圖控與工業物聯網軟體公司 Trihedral Engineering Limited，深入佈局自動化、人工智能及資料分析等領域。",
    symbols: ["$AAA", "$BBB"],
    choices: ["AAA", "BBB", "CCC"],
    nDays: 7,
  },
  [QT.PostCat.ASK]: {
    cat: QT.PostCat.ASK,
    title: "台達電斥9.65億元 收購加拿大圖控軟體公司Trihedral",
    text: "電源大廠台達電 (2308-TW) 今 (30) 日宣布，擬透過子公司 Delta Electronics (Netherlands) B.V.，斥約 4500 萬加幣(約新台幣 9.65 億元)，收購加拿大 SCADA 圖控與工業物聯網軟體公司 Trihedral Engineering Limited，深入佈局自動化、人工智能及資料分析等領域。",
    symbols: ["#ask"],
    choices: [],
  },
  [QT.PostCat.IDEA]: {
    cat: QT.PostCat.IDEA,
    title: "台達電斥9.65億元 收購加拿大圖控軟體公司Trihedral",
    text: "主文從第這裏開始...",
    symbols: ["$AAA", "$BBB"],
    choices: [],
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
  [QT.PostCat.REPLY]: {
    cat: QT.PostCat.REPLY,
    title: "Reply: 〈友訊經營權之爭〉股東常會確定不延期 公司派決議維持6/15召開",
    text: "主文從第這裏開始...",
    symbols: ["#reply"],
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
      console.log(typeof data?.createPost.poll?.start)
      console.log(data?.createPost)
      try {
        const res = cache.readQuery<QT.latestPosts>({ query: queries.LATEST_POSTS })
        if (data?.createPost && res?.latestPosts) {
          cache.writeQuery<QT.latestPosts>({
            query: queries.LATEST_POSTS,
            data: {
              latestPosts: res.latestPosts.concat([data.createPost]),
            },
          })
          // setCount(data.createPostLike.count)
        }
      } catch (e) {
        if (e instanceof InvariantError) { }
        else {
          console.error(e)
        }
      }
      // navigate("/")
    },
  })
  const [cat, setCat] = useState<QT.PostCat>(form.getFieldValue("cat") || QT.PostCat.ASK)

  // const isSpin = [QT.PostCat.SPIN_ASK, QT.PostCat.SPIN_IDEA, QT.PostCat.SPIN_POLL].includes(cat)
  const isSpin = parent !== undefined && QT.PostCat.REPLY !== cat
  const isReply = parent !== undefined && QT.PostCat.REPLY === cat

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

  let root = null
  let radio =
    <>
      <Radio value={QT.PostCat.ASK}>問題</Radio>
      <Radio value={QT.PostCat.POLL}>預測</Radio>
      <Radio value={QT.PostCat.IDEA}>想法</Radio>
    </>
  if (isReply) {
    root =
      <Typography.Paragraph>
        <b>Reply to</b> <a>{parent?.title}</a>
      </Typography.Paragraph>
    radio = <Radio value={QT.PostCat.REPLY} checked>回覆</Radio>

  } else if (isSpin) {
    root =
      <Typography.Paragraph>
        <b>Spin from</b> <a>{parent?.title}</a>
      </Typography.Paragraph>
    radio =
      <>
        <Radio value={QT.PostCat.ASK}>問題</Radio>
        <Radio value={QT.PostCat.POLL}>預測</Radio>
        <Radio value={QT.PostCat.IDEA}>看法</Radio>
      </>
  }


  return (
    <>
      {root}

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
            {radio}
            {/* <Radio value="d">連結</Radio> */}
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
              <Input placeholder={placeholdersByCat[cat]["title"]} disabled /> :
              <Input placeholder={placeholdersByCat[cat]["title"]} />
          }

        </Form.Item>

        {
          cat === QT.PostCat.POLL ?
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
            : null
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
              ? [{ required: true, message: '請輸入內文' }]
              : []
          }
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
    </>
  )
}

interface PreviewProps {
  values: any
}

const Preview: React.FC<PreviewProps> = ({ values }) => {
  const [showDetail, setShowDetail] = useState(false)

  let text
  if (showDetail)
    text = values.text
  else if (!showDetail && values.cat === QT.PostCat.POLL)
    text = null
  else if (!showDetail && (values.text as string).length > 50)
    text = (
      <>
        {`${values.text.substring(0, 50)}...`}
        <Button type="link" onClick={() => { setShowDetail(true) }}>more</Button>
      </>
    )
  else
    text = values.text

  const start = dayjs().startOf('d')

  return (
    <>
      <Typography.Paragraph>
        <b>{values.title}</b>

        {
          (values.symbols as string[]).length > 0 && (
            <>
              <br />
              <Space>
                {(values.symbols as string[]).map((x, i) => (
                  <a key={i} href={`/symbol/${encodeURIComponent(x)}`} target="_blank" rel="noopener noreferrer">
                    <i>
                      <Typography.Text type="secondary">{x}</Typography.Text>
                    </i>
                  </a>
                ))}
              </Space>
            </>
          )
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

        {text && <><br />{text}</>}

      </Typography.Paragraph>
    </>
  )
}

function PostCreate() {
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState<boolean>(true)

  form.setFields([
    // { name: "cat", value: QT.PostCat.REPLY },
  ])
  const parent = {
    __typename: "Post",
    id: "4",
    userId: "aaa",
    cat: QT.PostCat.IDEA,
    status: QT.PostStatus.ACTIVE,
    title: "string;",
    text: "string;",
    symbols: [],
    count: {
      __typename: "PostCount",
      id: "123",
      nViews: 1,
      nUps: 1,
      nDowns: 1,
      nComments: 1,
      updatedAt: null,
      poll: null,
    },
    updatedAt: null,
    poll: null,
  } as QT.post_post

  return (
    <>
      {/* <Typography.Title level={2}><i>新增 Post</i></Typography.Title> */}
      {
        showForm ?
          <div>
            <Button type="link"><Typography.Text strong>編輯</Typography.Text></Button>
            <Button type="link" onClick={() => { setShowForm(false) }}>預覽</Button>
          </div> :
          <div>
            <Button type="link" onClick={() => { setShowForm(true) }}>編輯</Button>
            <Button type="link"><Typography.Text strong>預覽</Typography.Text></Button>
          </div>
      }

      {
        showForm ?
          <Card style={{ width: "100%" }}>
            <PostForm form={form} parent={parent} />
          </Card> :
          <Card style={{ width: "100%" }}>
            <Preview values={form.getFieldsValue()} />
          </Card>
      }

    </>
  )
}

interface PostCreatePageProps {
  location?: WindowLocation
  isLoggedIn?: boolean
}

export const PostCreatePage: React.FC<PostCreatePageProps> = ({ location, isLoggedIn = false }) => {
  const cat = (new URLSearchParams(window.location.search)).get("cat")
  const postId = (new URLSearchParams(window.location.search)).get("id")

  console.log(cat, postId)

  // if (cat === "reply" && postId)
  //   return null
  // if (cat === "reply" && postId)
  //   return null

  return (
    <Layout>
      <Layout.Content>
        <Pane left={<PostCreate />} leftSpan={12} />
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
