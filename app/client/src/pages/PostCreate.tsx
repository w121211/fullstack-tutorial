import React, { useState } from 'react';
import { RouteComponentProps, useLocation } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { Alert, AutoComplete, Form, Input, Button, Layout, Row, Col, Card, Typography, Radio, Popover } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { Post } from '../components/PostForm'

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
    title: "這是一個預測",
    content: "主文從第這裏開始...",
    symbols: [],
    choices: ["AAA", "BBB", "CCC"],
  },
  [QT.PostCat.ASK]: {
    cat: QT.PostCat.ASK,
    title: "這是一個提問",
    content: "主文從第這裏開始...",
    symbols: [],
    choices: [],
  },
  [QT.PostCat.IDEA]: {
    cat: QT.PostCat.IDEA,
    title: "這是一個想法",
    content: "主文從第這裏開始...",
    symbols: [],
    choices: [],
  },
  [QT.PostCat.COMMIT]: {
    cat: QT.PostCat.IDEA,
    title: "這是一個想法",
    content: "主文從第這裏開始...",
    symbols: [],
  },
  [QT.PostCat.LINK]: {
    cat: QT.PostCat.IDEA,
    title: "這是一個想法",
    content: "主文從第這裏開始...",
    symbols: [],
  }
}


function PostForm({ form }: { form: FormInstance }) {
  const [cat, setCat] = useState<QT.PostCat>(form.getFieldValue("cat") || QT.PostCat.ASK)
  // const cat = (form.getFieldValue("cat") || QT.PostCat.ASK) as QT.PostCat
  // console.log(form.getFieldValue("cat"))
  console.log(cat)

  function onFinish(values: any) {
    console.log('Success:', values)
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
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Radio.Group onChange={(e) => {
          setCat(e.target.value)
          form.setFieldsValue(placeholdersByCat[e.target.value as QT.PostCat])
        }}>
          <Radio value={QT.PostCat.ASK}>問題</Radio>
          <Radio value={QT.PostCat.POLL}>預測</Radio>
          <Radio value={QT.PostCat.IDEA}>想法</Radio>
          {/* <Radio value="d">連結</Radio> */}
        </Radio.Group>
      </Form.Item>

      {/* <Typography.Paragraph>
        建議的預測類別：
        <ul>
          <li>趨勢預測，例如：</li>
        </ul>
        不建議的預測類別：
        <ul>
          <li>商品價格預測（例如上漲、下跌、目標價），未來會納入</li>
        </ul>
      </Typography.Paragraph> */}

      <Form.Item
        {...layout}
        label="標題"
        name="title"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder={placeholdersByCat[cat]["title"]} />
      </Form.Item>

      {
        cat === QT.PostCat.POLL ?
          <Form.Item
            {...layout}
            label="預測期間"
            name="pollLength"
            rules={[{ required: true, message: 'Please input your username!' }]}
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
                        message: "Please input passenger's name or delete this field.",
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
        name="content"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input.TextArea rows={3} />
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

interface PreviewProps {
  values: any
}

const Preview: React.FC<PreviewProps> = ({ values }) => {
  const [showDetail, setShowDetail] = useState(false)
  console.log(values)

  if (!values.title) return null
  return (
    <>
      {/* <Button onClick={() => { console.log(form.getFieldsValue()) }}>aaa</Button> */}
      <Typography.Paragraph>
        <b>{values.title}</b>
      </Typography.Paragraph>

      {
        values.cat === QT.PostCat.POLL ? (
          <>
            <Typography.Paragraph>
              <Radio.Group>
                {
                  (values.choices as string[]).map(
                    (item, i) => <Radio key={i} value={item}>{item}</Radio>
                  )
                }
              </Radio.Group>
              <Button>送出</Button>
            </Typography.Paragraph>

            <Typography.Paragraph type="secondary">
              預測期間：2010/4/1（90日後）
              {
                showDetail ? (
                  <>
                    <br />投票期間：2020/1/1 - 2020/2/1 （共80日）
                    <br />結果判定：投票人評審小組
                    </>
                ) : <Button type="link" onClick={() => { setShowDetail(true) }}>詳細</Button>
              }
            </Typography.Paragraph>
          </>
        ) : null
      }

      <Typography.Paragraph>
        {values.content}
      </Typography.Paragraph>

      <i>{(values.symbols as string[]).join(" ")}</i>
    </>
  )
}

interface Props extends RouteComponentProps { }

export const PostCreate: React.FC<Props> = () => {
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState<boolean>(true)

  return (
    <Layout>
      <Layout.Content className="site-layout">
        <Row justify="center">
          <Col span={20}>
            <h1>New Post</h1>

            {
              showForm
                ? (
                  <div>
                    <Button type="link"><Typography.Text strong>編輯</Typography.Text></Button>
                    <Button type="link" onClick={() => { setShowForm(false) }}>預覽</Button>
                  </div>
                )
                : (
                  <div>
                    <Button type="link" onClick={() => { setShowForm(true) }}>編輯</Button>
                    <Button type="link"><Typography.Text strong>預覽</Typography.Text></Button>
                  </div>
                )
            }

            {
              showForm
                ? <Card>
                  <PostForm form={form} />
                </Card>
                : <Card>
                  <Preview values={form.getFieldsValue()} />
                </Card>
            }

          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )

  // return (
  //   <>
  //     <PostForm form={form} />
  //     {/* <Preview form={form} /> */}
  //   </>
  // )
  // // const location = useLocation()
  // // const sp = new URLSearchParams(window.location.search)
  // // const cat = sp.get("cat")
  // // const [cat, setCat] = useState<string>(sp.get("cat") || QT.PostCat.LINK)
  // // if (!(cat in QT.PostCat)) setCat(QT.PostCat.LINK)
  // // const cat = (!(sp.get("cat") || "" in QT.PostCat)) 
  // // Object.values(QT.PostCat).includes(null)

  // const [cat, setCat] = useState<QT.PostCat>(QT.PostCat.LINK)
  // const { data: meData } = useQuery<QT.me>(queries.ME)
  // const [showLogin, setShowLogin] = useState<boolean>(false)

  // switch (cat) {
  //   case QT.PostCat.LINK:
  //     // return <PostForm />
  //     return null
  //   case QT.PostCat.POST:
  //     return <></>
  //   case QT.PostCat.POLL:
  //     return <></>
  //   case QT.PostCat.COMMIT:
  //     return <></>
  // }

}
