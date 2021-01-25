import React, { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation, useLazyQuery, useApolloClient } from '@apollo/client'
import { Link, navigate, redirectTo } from '@reach/router'
import { AutoComplete, Button, Modal, Popover, Tag, Tooltip, Radio, Form, Space, Input, Layout, Row, Col, Spin } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentPanel } from './tilePanel'
import { CssBlockCard } from './block'
import BlockMetaCss from './blockMeta/blockMeta.module.scss'
import { Token as PrismToken } from 'prismjs'
import * as MarkerHelper from '../utils/marker'

type QueryCard =
  | QT.cocard_cocard
  | QT.ocard_ocard
  | QT.selfcard_selfcard

function Token({ token, marker }: { token: PrismToken | string, marker?: MarkerHelper.Marker }) {
  if (typeof (token) === 'string')
    return <span style={{ color: 'gray' }}>{token}</span>
  if (Array.isArray(token.content))
    return <>{token.content.map((e, i) => <Token key={i} token={e} />)}</>
  const mk = marker ? <span>({marker.error})</span> : null
  switch (token.type) {
    case 'marker':
      return <span style={{ color: '#9a6e3a' }}>{token.content}{mk}</span>
    case 'ticker':
      return <Link to={`/ticker/${token.content}`}>{token.content}</Link>
    // return <a style={{ color: '#9a6e3a' }} href="https://regex101.com/r/C2T0so/2" contentEditable={false}>{token.content}{mk}</a>
    case 'inline-ticker':
      return <a style={{ color: '#9a6e3a' }} href="https://regex101.com/r/C2T0so/2" contentEditable={false}>{token.content}{mk}</a>
  }
  // if (token.type === 'marker')
  //   return <span style={{ color: '#9a6e3a' }}>{token.content}</span>
  // if (token.type === '')
  //   return <a style={{ color: '#9a6e3a' }} href="https://regex101.com/r/C2T0so/2" contentEditable={false}>{token.content}</a>
  if (['number', 'radio', 'line-value', 'value'].includes(token.type))
    return <span style={{ color: '#905' }}>{token.content}{mk}</span>
  return <span>{token.content}{mk}</span>
}

function MarkComment({ comment, onClick }: { comment: QT.comment, onClick?(comment: QT.comment): void }) {
  return (
    <>
      {/* 
      TODO: onClick是用於叫出該comment的source card modal，尚未實裝
      {onClick ?
          <Button type="text" onClick={() => { if (onClick) onClick(comment) }}>{comment.text}</Button> :
          comment.text
        } */}
      {comment.text && MarkerHelper.tokenizeSymbol(comment.text)
        .map((e, i) => <Token key={i} token={e} />)}
      <CommentPanel comment={comment} />
      {comment.meta?.src && <Button type="link">來源</Button>}
    </>
  )
}

function NestedTickerOcard({ symbolName, oauthorName, src }: { symbolName: string, oauthorName: string, src: string }) {
  const { data, error, loading } = useQuery<QT.ocard, QT.ocardVariables>(
    queries.OCARD, { variables: { symbolName, oauthorName } })
  if (loading)
    return <span>~ Loading... ~</span>
  if (data?.ocard)
    return <CardBody card={data.ocard} allowedMarkers={MarkerHelper.TICKER_ALLOWED_MARKERS} bySrc={src} />
  return <span>Error!</span>
}

export function CardBody({ card, allowedMarkers, bySrc }: { card: QueryCard, allowedMarkers: MarkerHelper.MarkerFormat[], bySrc?: string }) {
  const markerCommentsDict: Record<string, QT.comment[]> = {}
  for (const e of card.comments) {
    if (e.meta?.mark) {
      if (e.meta.mark in markerCommentsDict)
        markerCommentsDict[e.meta.mark].push(e)
      else
        markerCommentsDict[e.meta.mark] = [e]
    }
  }

  // Render
  const lines: ReactElement[] = []
  for (const e of allowedMarkers) {
    const comments = markerCommentsDict[e.mark]

    if (comments === undefined) {
      lines.push(<>{e.mark}___(空的value)____</>)
      continue
    }

    if (e.nested && card.__typename === 'Cocard' && card.link.oauthorName) {
      console.log(comments)
      for (const f of comments) {
        if (f.text === null)
          continue
        lines.push(<span style={{ backgroundColor: '#FFFF00' }}>{e.mark}{f.text}</span>)
        lines.push(<NestedTickerOcard symbolName={f.text} oauthorName={card.link.oauthorName} src={card.link.url} />)
        lines.push(<br />)
      }
      // lines.push(<CardBody />)
    } else if (e.inline) {
      for (const f of comments) {
        lines.push(<>{e.mark}<MarkComment comment={f} /></>)
      }
      // if (comments.length === 1) {
      //   lines.push(<>{e.mark}<MarkComment comment={comments[0]} /></>)
      // } else if (comments.length > 1) {
      //   throw new Error("")
      // }
    } else if (e.multiline) {
      lines.push(<>{e.mark}</>)
      for (const f of comments) {
        lines.push(<><MarkComment comment={f} /></>)
      }
    }
  }
  return <>{lines.map((e, i) => <div key={i}>{e}</div>)}</>
}

function PrettyInput({ sects }: { sects: MarkerHelper.TokenizedTextSection[] }) {
  /** 
   * render每個sections的tokens
   * TODO: 錯誤提示
   * */
  // let lineNumber = 0
  // const zipped: [PrismToken | string, MarkerHelper.Marker | undefined][] = []
  // function _zip(token: PrismToken | string) {
  //   if (typeof token === 'string') {
  //     lineNumber += token.split('\n').length - 1
  //   } else if (Array.isArray(token.content)) {
  //     for (const e of token.content)
  //       _zip(e)
  //     return
  //   }
  //   zipped.push([token, markers.find(e => e.lineNumber === lineNumber)])
  // }
  // for (const e of tokens)
  //   _zip(e)
  // return <pre>{zipped.map(([tk, mk], i) => <Token key={i} token={tk} marker={mk} />)}</pre>
  return (
    <pre>
      {sects.map((sect, i) => {
        if (sect.ticker) {
          return (
            <span key={i}>
              <span style={{ backgroundColor: '#FFFF00' }}>
                {sect.ticker}
                {sect.card?.error && <span>(找不到)</span>}
              </span>
              {sect.tokens && sect.tokens.map((e, j) => <Token key={j} token={e} />)}
            </span>
          )
        } else if (sect.root) {
          return <span key={i}>{sect.tokens && sect.tokens.map((e, j) => <Token key={j} token={e} />)}</span>
        } else if (sect.breaker) {
          return <span key={i} style={{ backgroundColor: '#FFFF00' }}>{sect.text}</span>
        }
        return <span key={i}>{sect.text}</span>
      })}
    </pre>
  )
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
  // function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {}
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

function _toCommentInputs(markers: MarkerHelper.Marker[], prevComments: QT.comment[], srcUrl?: string): QT.CommentInput[] {
  return markers
    .map<QT.CommentInput | null>(e => {
      // 暴力法直接看該marker是否和既有的重複，有的話就忽略，不重複紀錄
      if (prevComments.find(c => c.text === e.value && c.meta?.mark === e.mark))
        return null
      if (e.error || e.value === undefined)
        return null
      return {
        mark: e.mark,
        src: srcUrl,
        text: e.value,
        // poll?: PollInput | null;
      }
    })
    .filter(e => e !== null) as QT.CommentInput[]
}

function QueryOcard({ oauthorName, symbolName, updateNestedOcards }: {
  oauthorName: string,
  symbolName?: string,
  updateNestedOcards(symbol: string, card?: QT.ocard_ocard, error?: string): void
}) {
  /** 僅用於call api，不render（需要這樣寫是因為目前apollo似乎沒有提供直接query data的方法，都得搭配hook） */
  console.log('called QueryOcard()', symbolName)
  const { error, data } = useQuery<QT.ocard, QT.ocardVariables>(
    queries.OCARD, { variables: { oauthorName, symbolName } })
  if (symbolName === undefined)
    return null
  if (error)
    updateNestedOcards(symbolName, undefined, error.toString())
  else if (data?.ocard)
    updateNestedOcards(symbolName, data?.ocard)
  return null
}

export function CardForm(
  { card, allowedSects, rootFormat, onFinishFn, initialInput }: {
    card: QueryCard,
    allowedSects: ('ticker' | 'topic')[],
    rootFormat: MarkerHelper.MarkerFormat[],
    onFinishFn?: () => void
    initialInput?: string
  }) {
  /**
   * 取消webpage-cocard與oauthor-ticker-card的雙重form設計，以nested-marker做處理（全統一在webpage-cocard裡面）
   * 
   * TODO: 
   * - cache(目前只要一離開card就需要重來)
   * - `<QueryOcard />`無法解決初始render時會互相卡住的問題，最好替換回最為直接的query.refetch
   */
  const [createComments] = useMutation<QT.createComments, QT.createCommentsVariables>(
    queries.CREATE_COMMENTS, {
    update(cache, { data }) {
      console.log(data)
      if (card.__typename === "Cocard") {
        const res = cache.readQuery<QT.cocard, QT.cocardVariables>({
          query: queries.COCARD,
          variables: { url: card.link.url },
        })
        if (data?.createComments && res?.cocard) {
          cache.writeQuery<QT.cocard, QT.cocardVariables>({
            query: queries.COCARD,
            variables: { url: card.link.url },
            data: { cocard: { ...res.cocard, comments: res.cocard.comments.concat(data?.createComments) } }
          })
        }
      } else if (card.__typename === "Selfcard") {
        const res = cache.readQuery<QT.mycard, QT.mycardVariables>({
          query: queries.MYCARD,
          variables: { symbolName: card.symbol.name },
        })
        if (data?.createComments && res?.mycard) {
          cache.writeQuery<QT.mycard, QT.mycardVariables>({
            query: queries.MYCARD,
            variables: { symbolName: card.symbol.name },
            data: { mycard: { ...res.mycard, comments: res.mycard.comments.concat(data?.createComments) } }
          })
        }
      }
    }
  })
  const [queryOcard, { refetch }] = useLazyQuery<QT.ocard, QT.ocardVariables>(queries.OCARD)

  const temp = initialInput ?? MarkerHelper.t3
  // const temp = MarkerHelper.commentsToText(card.comments ?? [], MarkerHelper.WEBPAGE_ALLOWED_MARKERS)

  // Section-tokenize inital value
  const link = ('link' in card ? card.link : undefined) ?? undefined
  const oauthorName = link?.oauthorName ?? undefined

  // async function _toInitialText() {
  //   let text: string = ''
  //   if (refetch && oauthorName) {
  //     const nested = findManyComments(MarkerHelper.MARKER_FORMAT.card.mark, card.comments)
  //     for (const e of nested) {
  //       const symbolName = e.text
  //       const ocard = await refetch({ oauthorName, symbolName })
  //       text += `${symbolName}\n${MarkerHelper.commentsToText(ocard.comments ?? [], MarkerHelper.TICKER_ALLOWED_MARKERS)}`
  //     }
  //   }
  // }

  // async function queryOcards() {
  //   const queried = []
  //   for (const e of nestedOcards) {
  //     if (!e.queried) {
  //     }
  //   }
  // }

  const [_sects, { symbols: _symbols, nestedCards: _nestedCards }] = MarkerHelper.tokenizeSection(
    temp, [], oauthorName, allowedSects, rootFormat)

  // Hooks
  const [sects, setSects] = useState<MarkerHelper.TokenizedTextSection[]>(_sects)
  const [symbols, setSymbols] = useState<string[]>([..._symbols])
  // 用於紀錄symbol ids，若改用dict的話會有bug（不知為何最後一個symbol會很神奇的從query變回unquery（某種memory問題？可能是react的bug？））
  const [nestedOcards, setNestedOcards] = useState<MarkerHelper.CardIdentifier[]>(_nestedCards)

  function updateNestedOcards(symbolName: string, card?: QT.ocard_ocard, error?: string): void {
    const res = nestedOcards.find(e => e.symbolName === symbolName)
    if (res === undefined)
      throw new Error()
    if (error) {
      setNestedOcards([...nestedOcards.filter(e => e.symbolName !== symbolName), { symbolName, queried: true, error }])
    } else if (card) {
      setNestedOcards([...nestedOcards.filter(e => e.symbolName !== symbolName), { symbolName, queried: true, card: card }])
    }
  }
  function onValuesChange(changedValues: any) {
    if (changedValues['input']) {
      // setInput(changedValues['input'])
      const [sects, { symbols, nestedCards }] = MarkerHelper.tokenizeSection(
        changedValues['input'], nestedOcards, oauthorName, allowedSects, rootFormat)
      console.log(sects)

      setSects(sects)
      setSymbols([...symbols])
      setNestedOcards(nestedCards)
    }
  }
  async function onFinish(values: any) {
    // TODO: 若有不合格的input應該要提出warning & 無法submit
    const [sects] = MarkerHelper.tokenizeSection(
      values['input'], nestedOcards, oauthorName, allowedSects, rootFormat)

    // 儲存nested cards
    const cardMarkers: MarkerHelper.Marker[] = []
    for (const e of sects) {
      if (e.card && (e.card.unfound || !e.card.queried)) {
        continue
        // throw new Error("")
      }
      if (e.card && e.card.card && e.markers) {
        await createComments({
          variables: {
            cardId: e.card.card.id,
            cardType: e.card.card.__typename,
            symbolName: e.ticker,
            data: _toCommentInputs(e.markers, e.card.card.comments, link?.url),
          }
        })
        cardMarkers.push(
          {
            mark: MarkerHelper.MARKER_FORMAT.card.mark,
            value: e.card.symbolName as string
          })
      }
    }
    // 儲存root
    const rootMarkers = (sects.find(e => e.root && e.markers)?.markers ?? []).concat(cardMarkers)
    await createComments({
      variables: {
        cardId: card.id,
        cardType: card.__typename,
        symbolName: 'symbol' in card ? card.symbol.name : undefined,
        data: _toCommentInputs(rootMarkers, card.comments)
      }
    })

    if (onFinishFn !== undefined)
      onFinishFn()
  }

  const symbolTokens = symbols.reduce<Array<string | PrismToken>>(
    (acc, cur) => acc.concat(MarkerHelper.tokenizeSymbol(cur)), [])
  return (
    <div>
      {oauthorName && nestedOcards
        .filter(e => !e.queried)
        .map((e, i) => <QueryOcard key={i} oauthorName={oauthorName} symbolName={e.symbolName} updateNestedOcards={updateNestedOcards} />)
      }
      <PrettyInput sects={sects} />
      {symbolTokens.map((e, i) => <Token key={i} token={e} />)}
      <Form
        onFinish={onFinish}
        initialValues={{ input: temp }}
        onValuesChange={onValuesChange}>
        <Form.Item name="input">
          <Input.TextArea rows={10} autoSize />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">儲存</Button>
        </Form.Item>
      </Form>
    </div>
  )
}


// --- Helpers ---

export function findOneComment<T extends QT.comment | QT.CommentInput>(mark: string, comments: T[]): T | undefined {
  return comments.find(e => {
    if ('meta' in e)
      return (e as QT.comment).meta?.mark === mark
    if ('mark' in e)
      return (e as QT.CommentInput).mark === mark
    throw new Error()
  })
}

export function findManyComments<T extends QT.comment | QT.CommentInput>(mark: string, comments: T[]): T[] {
  return comments.filter(e => {
    if ('meta' in e)
      return (e as QT.comment).meta?.mark === mark
    if ('mark' in e)
      return (e as QT.CommentInput).mark === mark
    throw new Error()
  })
}


// ------- Deprecated --------

// export function TickerMycardForm({ symbol, card }: { symbol: string, card?: QT.selfcard_selfcard }) {
//   const [input, setInput] = useState<string>(t1)
//   // const [symbols, setSymbols] = useState<string[] | undefined>()
//   // const [symbol, setSymbol] = useState<string | undefined>()
//   const [tokens, setTokens] = useState<Array<PrismToken | string>>([])
//   const [markers, setMarkers] = useState<MarkerHelper.Marker[]>([])
//   const [mycard, mycardResult] = useLazyQuery<QT.mycard, QT.mycardVariables>(
//     queries.MYCARD)
//   const [createMycard] = useMutation<QT.createMycard, QT.createMycardVariables>(
//     queries.CREATE_MYCARD)
//   const [createComments] = useMutation<QT.createComments, QT.createCommentsVariables>(
//     queries.CREATE_COMMENTS)
//   if (card === undefined && !mycardResult.called)
//     mycard({ variables: { symbolName: symbol } })
//   if (mycardResult.loading)
//     return null
//   if (mycardResult.error)
//     return <h1>{mycardResult.error}</h1>
//   if (mycardResult.data && mycardResult.data.mycard) {
//     // TODO: set input as mycard
//     setInput(MarkerHelper.commentsToText(mycardResult.data.mycard.comments, MarkerHelper.TICKER_ALLOWED_MARKERS))
//   }
//   // function onValuesChange(changedValues: any) {
//   //   const value = changedValues['input']
//   //   if (value) {
//   //     const [tokens, _markers] = MarkerHelper.tokenize(value)
//   //     const markers = MarkerHelper.validate(_markers, MarkerHelper.TICKER_ALLOWED_MARKERS)
//   //     setTokens(tokens)
//   //     setMarkers(markers)
//   //     setInput(value)
//   //     // const comments = textToComments(value, [{ mark: 'ticker', syntax: '[卡]', multi: true }])
//   //     // setSymbol(comments[comments.length - 1].text)
//   //     // const _symbols = comments.map(e => e.text)
//   //     // setSymbols(_symbols.filter((e, i) => _symbols.indexOf(e) === i))
//   //   }
//   // }
//   function onFinish(values: any) {
//     // if (card) {
//     //   createComments({
//     //     variables: {
//     //       cardId: card.id,
//     //       cardType: card.__typename,
//     //       data: textToComments(values['input'], TICKER_ALLOWED_MARKERS)
//     //     }
//     //   })
//     // } else {
//     //   createMycard({
//     //     variables: {
//     //       symbolName: symbol,
//     //       data: textToComments(values['input'], TICKER_ALLOWED_MARKERS)
//     //     }
//     //   })
//     // }
//   }
//   return (
//     <div>
//       {/* <StylizedText tokens={tokens} markers={markers} /> */}
//       <Form onFinish={onFinish}
//         initialValues={
//           { input: t1 }
//           // { card: commentsToText(card.comments ?? [], WEBPAGE_ALLOWED_MARKERS) }
//         }
//       // onValuesChange={onValuesChange}
//       >
//         <Form.Item name="input">
//           <Input.TextArea rows={10} autoSize />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">儲存</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   )
// }

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
        // await createOcard({
        //   variables: {
        //     symbolName: symbol,
        //     oauthorName: oauthor,
        //     // data: textToComments(input, undefined, link.url)
        //     data: textToComments(input, undefined)
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
    } else {
      // await createComments({
      //   variables: {
      //     cardId: card.id,
      //     cardType: card.__typename,
      //     data: textToComments(input, undefined)
      //   }
      // })
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
        <Form onFinish={onFinish}
          // initialValues={{ card: commentsToText(card?.comments ?? []) }} 
          onValuesChange={onValuesChange}>
          <CardInput />
          <Form.Item>
            <Button type="primary" htmlType="submit">送出</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        {/* <TickerCardPreview commentInputs={textToComments(input)} /> */}
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
  // return <TickerCocard card={data.cocard} />
  return null
}

// function QueryOcard({ id, oauthorName, symbolName }: { id?: string, oauthorName?: string, symbolName?: string }) {
//   const { data, loading } = useQuery<QT.ocard, QT.ocardVariables>(
//     queries.OCARD, { variables: { id, oauthorName, symbolName } }
//   )
//   if (loading)
//     return null
//   if (!data)
//     return <p>something goes wrong</p>
//   if (data.ocard === null)
//     return <h1>Card not found</h1>
//   return <TickerCard card={data.ocard} />
// }

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

function QueryCardModal({ card, mycard }: { card: QT.cocard_cocard, mycard?: QT.selfcard_selfcard }) {
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
        {/* {cardId && cardId[0] === 'Ocard' && <QueryOcard id={cardId[1].toString()} />} */}
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
              {findManyComments('pros', card.comments).map((e, i) => (
                <li key={i}>
                  <span>&#8226;<MarkComment comment={e} onClick={onClick} /></span>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span className={BlockMetaCss.span}>Cons</span>
            <ul>
              {findManyComments('cons', card.comments).map((e, i) => (
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

function TickerCard({ card, isMe, fromComment }: { card: QT.selfcard_selfcard | QT.ocard_ocard, isMe?: boolean, fromComment?: QT.comment }) {
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
            {findManyComments('pros', card.comments).map((e, i) => (
              <li key={i}>
                <span>&#8226;<MarkComment comment={e} /></span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className={BlockMetaCss.span}>Cons</span>
          <ul>
            {findManyComments('cons', card.comments).map((e, i) => (
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