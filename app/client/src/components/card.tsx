import React, { useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { Link, redirectTo } from '@reach/router'
import { Card, Button, Modal, Popover, Tag, Tooltip, Radio, Form, Space, Input, Layout, Row, Col, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentPanel } from './tilePanel'
import { commentsToText, textToComments, webpageMarkers } from '../utils/markline'
import { CssBlockCard } from './block'
import BlockMetaCss from './blockMeta/blockMeta.module.scss'


function makeCardId(comment: QT.comment): string {
  let id: string
  if (comment.cocardId)
    id = "Cocard:" + comment.ocardId
  else if (comment.ocardId)
    id = "Ocard:" + comment.ocardId
  else if (comment.selfcardId)
    id = "Ocard:" + comment.ocardId
  else
    throw new Error()
  return id
}

function getVoteIdx(str: string): number | undefined {
  /** []buy [X]sell []watch  -> return 1 */
  const re = /\[.?\]/gm;
  let m
  const matches = []
  while ((m = re.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === re.lastIndex)
      re.lastIndex++
    // 選擇的選項標為1，其餘為0
    matches.push(m[0].length > 2 ? 1 : 0)
  }
  return matches.indexOf(1)
}

function mapVoters(voteComments: QT.comment[], nChoices: number): string[][] {
  const voters: string[][] = []
  for (let i = 0; i < nChoices; i++) {
    const _voteChoiceN: string[] = []
    for (const e of voteComments) {
      if (e.text && getVoteIdx(e.text) === i) {
        _voteChoiceN.push(makeCardId(e))
      }
    }
    voters.push(_voteChoiceN)
  }
  return voters
}

function filterCommentsByVote(voteIdx: number, voters: string[][], comments: QT.comment[]): QT.comment[] {
  // const voters = ["Ocard:1", "Selfcard:1"]
  const votersByVote = voters[voteIdx]
  return comments.filter(e => votersByVote.indexOf(makeCardId(e)) >= 0)
}

export function filterOneComments<T extends QT.comment | QT.CommentInput>(mark: string, comments: T[]): T | undefined {
  return comments.find(e => {
    if ('meta' in e)
      return (e as QT.comment).meta?.mark === mark
    if ('mark' in e)
      return (e as QT.CommentInput).mark === mark
    throw new Error()
  })
}

export function filterManyComments<T extends QT.comment | QT.CommentInput>(mark: string, comments: T[]): T[] {
  return comments.filter(e => {
    if ('meta' in e)
      return (e as QT.comment).meta?.mark === mark
    if ('mark' in e)
      return (e as QT.CommentInput).mark === mark
    throw new Error()
  })
}

function CardInput() {
  /**
   * 理想（類code-editor）：
   * 1. 自動在前方增加hash（無法消除）
   * 2. 打"[[______]]", "$___"會開啟搜尋視窗
   * 3. (NEXT)換行後會automark前一行
   * 範例：
   * -------------------
   * | # OOOOOOO[[OO]]OOO
   * | # ...
   * ____________________
   * TODO:
   * - autocomplete: 搜尋ticker
   * - (改在別的地方處理)允許update、delete comment
   * - poll?
   */
  // const [options, setOptions] = useState<{ value: string }[]>([]);
  // const [error, setError] = useState<string | null>(null)
  // const [notes, setNotes] = useState<string[]>([])
  // const [searchAll, { loading, data }] = useLazyQuery<QT.createMycardComments, QT.createMycardCommentsVariables>(queries.SEARCH_ALL)
  // const [searchAll, { loading, data }] = useLazyQuery<QT.searchAll, QT.searchAllVariables>(queries.SEARCH_ALL)
  // const [automark, { loading, data }] = useLazyQuery<QT.automark, QT.automarkVariables>(queries.AUTOMARK)

  // const initialValue = {
  //   text: initInputText({ comments })
  // }
  // function onSearch(term: string) {
  //   console.log(`search term: ${term}`)
  //   if (term.endsWith("#")) {
  //     setOptions([{ value: "..." }])
  //     searchAll({ variables: { term } })
  //   } else {
  //     setOptions([])
  //   }
  //   // if (term.length === 0)
  //   //   setOptions([])
  //   // else {
  //   //   searchAll({ variables: { term } })
  //   //   if (data && data.searchAll)
  //   //     setOptions(data.searchAll.map((e) => ({ value: e })))
  //   // }
  // }
  // function onSelect(data: string) {
  //   console.log('onSelect', data)
  //   // redirect('/topic/some_where')
  // }
  // function onChange({ target: { value } }: { target: { value: string } }) {
  //   setValue(value)
  // }
  // function onKeyDown(e: React.KeyboardEvent) {
  //   console.log(e.key)
  //   // if (e.key === "Enter") {
  //     // if (value === "") {
  //       // setError("note不得空白")
  //       // return
  //     // }
  //     // setNotes([...notes, value])
  //     // setValue("")
  //   // }
  // }
  // if (!loading && data && data.searchAll) {
  //   // setOptions([])
  //   console.log(data.searchAll)
  //   setOptions(data.searchAll.map((e) => ({ value: e })))
  // }
  // if (data?.automark) {
  //   setNotes([...notes, value])
  // }
  return (
    <>
      {/* {isHash ? <span>[Note mode]</span> : null} */}
      {/* {notes.map((e, i) => <p key={i}># {e}</p>)} */}
      {/* <AutoComplete style={{ width: 200 }} value={value} onSelect={onSelect} onChange={onChange} onSearch={onSearch} onKeyDown={onKeyDown}>
        {data && data.searchAll.map((e, i) => <AutoComplete.Option key={i} value={e}>{e}</AutoComplete.Option>)}
        <Input value={value} onChange={onChange} onPressEnter={onPressEnter} />
      </AutoComplete> */}
      {/* {!!error && <p>{error}</p>} */}
      {/* <Input.TextArea rows={4} onChange={onChange} value={value} autoSize={true} /> */}
      <Form.Item name="card">
        <Input.TextArea rows={4} autoSize />
      </Form.Item>
    </>
  )
}

function MarkComment({ comment, commentInput, onClick }: { comment?: QT.comment, commentInput?: QT.CommentInput, onClick?(comment: QT.comment): void }) {
  if (commentInput)
    return <>{commentInput.text}</>
  if (comment)
    return (
      <>
        {onClick ?
          <Button type="text" onClick={() => { if (onClick) onClick(comment) }}>{comment.text}</Button> :
          comment.text
        }
        <CommentPanel comment={comment} />
        {comment.meta?.src && <Button type="link">來源</Button>}
      </>
    )
  throw new Error()
}


function ShowCardClicker({ selfcardId, ocardId, children }: { selfcardId?: string, ocardId?: string, children: React.ReactNode }) {
  if (!selfcardId && !ocardId)
    throw new Error("selfcardId及ocardId至少需要一個")
  return (
    <span>
      {children}
    </span>
  )
}

function TickerMiniCard({ symbol }: { symbol: string }) {
  return <div><p>|{symbol} 0.0(+0.00%)|</p></div>
}

function QueryCocard({ symbol }: { symbol: string }) {
  const { data, loading } = useQuery<QT.cocard, QT.cocardVariables>(
    queries.COCARD, { variables: { symbolName: symbol } }
  )
  if (loading)
    return null
  if (!data)
    return <p>Something goes wrong</p>
  if (data.cocard === null)
    return <h1>Card not found</h1>
  return <TickerCocard card={data.cocard} />
}

function QueryOcard({ id, cocard }: { id: string, cocard?: QT.cocard_cocard }) {
  const { data, loading } = useQuery<QT.ocard, QT.ocardVariables>(
    queries.OCARD, { variables: { id } }
  )
  if (loading)
    return null
  if (!data)
    return <p>something goes wrong</p>
  if (data.ocard === null)
    return <h1>Card not found</h1>
  return <TickerCard card={data.ocard} />
}

function QuerySelfcard({ id }: { id: string }) {
  const { data, loading } = useQuery<QT.selfcard, QT.selfcardVariables>(
    queries.SELFCARD, { variables: { id } }
  )
  if (loading)
    return null
  if (!data)
    return <p>something goes wrong</p>
  if (data.selfcard === null)
    return <h1>Card not found</h1>
  return <TickerCard card={data.selfcard} />
}

function TickerCardPreview({ commentInputs }: { commentInputs: QT.CommentInput[] }) {
  return (
    <CssBlockCard title="">
      <ul>
        <li>
          <span className={BlockMetaCss.span}>You are</span>
          <span>(TODO)</span>
          {/* <CommentByMark mark="pros" comments={card.comments} onClick={onClick} /> */}
        </li>
        <li>
          <span className={BlockMetaCss.span}>Verdict</span>
          {/* <CommentListByMark mark="act" comments={card.comments} /> */}
          <span>(TODO)</span>
        </li>
        <li>
          <span className={BlockMetaCss.span}>Pros</span>
          <ul>
            {filterManyComments('pros', commentInputs).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment commentInput={e} /></span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className={BlockMetaCss.span}>Cons</span>
          <ul>
            {filterManyComments('cons', commentInputs).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment commentInput={e} /></span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className={BlockMetaCss.span}>目標價</span>
          <span>(TODO)</span>
        </li>
      </ul>

    </CssBlockCard>
  )
}

export function TickerCocard({ card, mycard }: { card: QT.cocard_cocard, mycard?: QT.selfcard_selfcard }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [cardId, setCardId] = useState<[string, number] | null>(null)
  function onClick(comment: QT.comment): void {
    console.log('onClick')
    if (comment.ocardId)
      setCardId(['Ocard', comment.ocardId])
    else if (comment.selfcardId)
      setCardId(['Selfcard', comment.selfcardId])
    else
      return
    setIsModalVisible(true)
  }
  /** (NEXT)將mycard的comments放入裡面，便利push到cocard */
  // const battles = oneCommentByKey({ comments: card.comments, key: "battles" })
  return (
    <>
      <Modal visible={isModalVisible} onCancel={function () { setIsModalVisible(false) }}>
        {cardId && cardId[0] === 'Ocard' && <QueryOcard id={cardId[1].toString()} />}
        {cardId && cardId[0] === 'Selfcard' && <QuerySelfcard id={cardId[1].toString()} />}
      </Modal>

      <CssBlockCard title={card.link.url.replace('ticker/', '$')}>
        {/* <button>Push All</button> */}
        <pre>You are</pre>
        {/* <ModalWrapper> */}

        {/* <MarkComment comment={filterOneComment('')} /> */}
        {/* <p>this is a comment</p> */}
        {/* </ModalWrapper> */}
        {/* 點下後可以連結至個別卡 */}
        <ul>
          <li>
            <span className={BlockMetaCss.span}>You are</span>
            <span>(TODO)</span>
            {/* <CommentByMark mark="pros" comments={card.comments} onClick={onClick} /> */}
          </li>
          <li>
            <span className={BlockMetaCss.span}>Verdict</span>
            {/* <CommentListByMark mark="act" comments={card.comments} /> */}
            <span>(TODO)</span>
          </li>
          <li>
            <span className={BlockMetaCss.span}>Pros</span>
            <ul>
              {filterManyComments('pros', card.comments).map((e, i) => (
                <li key={i}>
                  <span>&#8226;<MarkComment comment={e} onClick={onClick} /></span>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span className={BlockMetaCss.span}>Cons</span>
            <ul>
              {filterManyComments('cons', card.comments).map((e, i) => (
                <li key={i}>
                  <span>&#8226;<MarkComment comment={e} onClick={onClick} /></span>
                </li>
              ))}
            </ul>
            {/* <span>
              預測率: OOO，排名: OO
            </span> */}
          </li>
          <li>
            <span className={BlockMetaCss.span}>目標價</span>
            <span>(TODO)</span>
          </li>
          <li>
            <span className={BlockMetaCss.span}>(NEXT)Alternatives</span>
            <span>
              [相似]$AA
              [相似]$BB
              [相似]$CC
        </span>
          </li>
        </ul>
      </CssBlockCard>
    </>
  )
}

export function TickerCard({ card, isMe, fromComment }: { card: QT.selfcard_selfcard | QT.ocard_ocard, isMe?: boolean, fromComment?: QT.comment }) {
  // TODO: 將fromComment特別標出來（user從這個comment連結而來）
  /* 用extra來攜帶source資訊（因為無法存在ocard?）-> 這資訊應該是存在每個comment.meta裡面 */
  return (
    <CssBlockCard title={card.symbol.name}>
      {
        card.__typename === 'Ocard' ?
          <pre> {card.oauthorName}</pre>
          :
          <pre>{isMe ? "@me" : "@anonymous"}</pre>
      }
      <ul>
        <li>
          <span className={BlockMetaCss.span}>Verdict</span>
          <span>
            Buy  (1-3)
            {/* <MarkComment mark="act" comments={card.comments} /> */}
          </span>
        </li>
        <li>
          <span className={BlockMetaCss.span}>Pros</span>
          <ul>
            {filterManyComments('pros', card.comments).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment comment={e} /></span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className={BlockMetaCss.span}>Cons</span>
          <ul>
            {filterManyComments('cons', card.comments).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment comment={e} /></span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      {isMe && card.__typename === "Selfcard" && <Button onClick={() => { redirectTo('/ticker/edit') }}>編輯</Button>}
    </CssBlockCard>
  )
}

export function TickerMycardForm({ symbol, card }: { symbol: string, card?: QT.selfcard_selfcard | null, }) {
  /**
   * 若有oauthor：視為create ocard
   * 完全用textare實現
   * 若已經有card，1. 將card的內容導入input 2. 需要知道哪些是新增、哪些是修正
   */
  const [input, setInput] = useState<string>('')
  const [createMycard] = useMutation<QT.createMycard, QT.createMycardVariables>(
    queries.CREATE_MYCARD,
  )
  // const [createVote] = useMutation<QT.createVote, QT.createVoteVariables>(
  //   queries.CREATE_VOTE,
  // )
  async function onFinish(values: any) {
    try {
      await createMycard({ variables: { symbolName: symbol, data: textToComments(input) } })
    } catch (err) {
      console.log(err)
    }
    // if (card === null) {
    //   createCard({ variables: { data: textToComments(value) } })
    // } else {
    //   createCardComments({ variables: { data: textToComments(value) } })
    // }
    // createVote({ value: actValue })
  }
  function onValuesChange(changedValues: any, values: any) {
    if (changedValues['card']) {
      setInput(changedValues['card'])
    }
  }
  return (
    <Row>
      <Col span={12}>
        <Form onFinish={onFinish} initialValues={{ card: commentsToText(card?.comments) }} onValuesChange={onValuesChange}>
          <CardInput />
          <Form.Item>
            <Button type="primary" htmlType="submit">送出</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <TickerCardPreview commentInputs={textToComments(input)} />
      </Col>
    </Row>
  )
}

function TickerOcardForm({ symbol, card, oauthor, link }: { symbol: string, card?: QT.ocard_ocard, oauthor: string, link?: QT.linkFragment }) {
  /**
   * 完全用textare實現
   * 若card已經存在，1. 將card的內容導入input 2. 需要知道哪些是新增、哪些是修正
   * link用於紀錄source（webpage的情況）
   */
  const [input, setInput] = useState<string>('')
  const [createOcard] = useMutation<QT.createOcard, QT.createOcardVariables>(
    queries.CREATE_OCARD,
  )
  const [createComments] = useMutation<QT.createComments, QT.createCommentsVariables>(
    queries.CREATE_COMMENTS,
  )
  // const [createVote] = useMutation<QT.createVote, QT.createVoteVariables>(
  //   queries.CREATE_VOTE,
  // )
  async function onFinish(values: any) {
    if (card === undefined) {
      try {
        await createOcard({
          variables: {
            symbolName: symbol,
            oauthorName: oauthor,
            // data: textToComments(input, undefined, link.url)
            data: textToComments(input, undefined)
          }
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      await createComments({
        variables: {
          cardId: card.id,
          cardType: card.__typename,
          data: textToComments(input, undefined)
        }
      })
    }
  }
  function onValuesChange(changedValues: any, values: any) {
    if (changedValues['card']) {
      setInput(changedValues['card'])
    }
  }
  return (
    <Row>
      <Col span={12}>
        {card === undefined && <h1>New</h1>}
        <Form onFinish={onFinish} initialValues={{ card: commentsToText(card?.comments ?? []) }} onValuesChange={onValuesChange}>
          <CardInput />
          <Form.Item>
            <Button type="primary" htmlType="submit">送出</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <TickerCardPreview commentInputs={textToComments(input)} />
      </Col>
    </Row>
  )
}

function QueryTickerOcardForm({ oauthor, symbol, link }: { oauthor: string, symbol: string, link?: QT.linkFragment }) {
  /**
   * 有幾種情況：
   * 1. ocard尚未建立時 -> query return null
   * 2. symbol不存在時 -> throw Error?
   * 3. oauthor不存在時 -> return
   */
  const queryOcard = useQuery<QT.ocard, QT.ocardVariables>(queries.OCARD, {
    variables: { oauthorName: oauthor, symbolName: symbol },
    fetchPolicy: "network-only"
  })
  if (queryOcard.loading)
    return null
  if (queryOcard.error?.message === 'Oauthor not found')
    return <p>Oauthor '{oauthor}' not found</p>
  if (queryOcard.error?.message === 'Symbol not found')
    return <p>Symbol '{symbol}' not found</p>
  if (!queryOcard.data)
    return <p>Something goes wrong</p>
  return <TickerOcardForm symbol={symbol} card={queryOcard.data.ocard ?? undefined} oauthor={oauthor} />
}

function WebpageCardPreview({ commentInputs }: { commentInputs: QT.CommentInput[] }) {
  return (
    <CssBlockCard title="">
      <ul>
        <li>
          <span className={BlockMetaCss.span}>Tickers</span>
          <ul>
            {filterManyComments('ticker', commentInputs).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment commentInput={e} /></span>
              </li>
            ))}
          </ul>
        </li>
      </ul>

    </CssBlockCard>
  )
}


export function WebpageCocardForm({ link, card }: { link: QT.linkFragment, card: QT.cocard_cocard }) {
  /**
   * TODO:
   * - cache(目前只要一離開ocard就需要重來)
   */
  const [input, setInput] = useState<string>('[標題]ＯＯＯＯＯＯＯＯＯ\n\n[卡]$AA\n[卡]\n[卡]\n\n')
  const [symbols, setSymbols] = useState<string[] | undefined>()
  const [symbol, setSymbol] = useState<string | undefined>()
  function onFinish() { }
  // function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  // }
  // function onFormFinish(name, { values, forms }) {
  //   if (name === 'userForm') {
  //     const { basicForm } = forms;
  //     const users = basicForm.getFieldValue('users') || [];
  //     basicForm.setFieldsValue({ users: [...users, values] });
  //   }
  // }
  function onValuesChange(changedValues: any, values: any) {
    const value = changedValues['card']
    if (value) {
      setInput(value)
      const comments = textToComments(value, [{ mark: 'ticker', syntax: '[卡]', multi: true }])
      // setSymbol(comments[comments.length - 1].text)
      const _symbols = comments.map(e => e.text)
      setSymbols(_symbols.filter((e, i) => _symbols.indexOf(e) === i))
    }
  }
  return (
    <>
      <pre>
        Link: {link.url}
        {/* Link Title: {cocard.meta.} */}
        Oauthor: {link.oauthorName}
      </pre>
      <Row>
        <Col span={12}>
          {/* <Input.TextArea rows={4} autoSize onChange={onChange} /> */}
          <Form onFinish={onFinish} initialValues={{ card: commentsToText(card.comments ?? [], webpageMarkers) }} onValuesChange={onValuesChange}>
            <CardInput />
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">送出</Button>
            </Form.Item> */}
          </Form>
        </Col>
        <Col span={12}>
          <WebpageCardPreview commentInputs={textToComments(input, webpageMarkers)} />
        </Col>
      </Row>
      {
        symbols && symbols.map((e, i) =>
          <Button key={i} onClick={() => { setSymbol(e) }} type={e === symbol ? 'primary' : undefined}>{e}</Button>)
      }
      {
        symbol && link.oauthorName && link &&
        <QueryTickerOcardForm oauthor={link.oauthorName} symbol={symbol} link={link} />
      }
      {/* <Form.Provider onFormFinish={onFormFinish}> */}
      {/* <Form name="basicForm" onFinish={onFinish}>
          <Form.Item name="group" label="Group Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="User List"
            shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
          >
            {({ getFieldValue }) => {
              const users = getFieldValue('users') || [];
              return users.length ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user">
                      <Avatar icon={<UserOutlined />} />
                      {user.name} - {user.age}
                    </li>
                  ))}
                </ul>
              ) : (
                  <Typography.Text className="ant-form-text" type="secondary">
                    ( <SmileOutlined /> No user yet. )
                  </Typography.Text>
                );
            }}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button htmlType="button" style={{ margin: '0 8px' }} onClick={showUserModal}>
              Add User
            </Button>
          </Form.Item>
        </Form>

        <Form form={form} layout="vertical" name="userForm">
          <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button htmlType="button" style={{ margin: '0 8px' }} onClick={showUserModal}>
              Add User
            </Button>
          </Form.Item>
        </Form>

      </Form.Provider> */}
    </>
  )
}

export function TopicCocardBody({ card }: { card: QT.cocard_cocard }) {
  return (
    <ul>
      <li>
        <span className={BlockMetaCss.span}>View</span>
        {/* <CommentListByMark mark="act" comments={card.comments} /> */}
        <span>(TODO)</span>
      </li>
      <li>
        <span className={BlockMetaCss.span}>Pros</span>
        <ul>
          {filterManyComments('pros', card.comments).map((e, i) => (
            <li key={i}>
              <span>&#8226;<MarkComment comment={e} /></span>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <span className={BlockMetaCss.span}>Cons</span>
        <ul>
          {filterManyComments('cons', card.comments).map((e, i) => (
            <li key={i}>
              <span>&#8226;<MarkComment comment={e} /></span>
            </li>
          ))}
        </ul>
        {/* <span>
              預測率: OOO，排名: OO
            </span> */}
      </li>
      <li>
        <span className={BlockMetaCss.span}>(NEXT)Alternatives</span>
        <span>
          [相似]$AA
          [相似]$BB
          [相似]$CC
            </span>
      </li>
    </ul>
  )
}