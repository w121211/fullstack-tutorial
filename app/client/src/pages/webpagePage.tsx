import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate, useLocation } from '@reach/router'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { Alert, Form, Layout, Button, Input } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { WEBPAGE_ALLOWED_MARKERS, MARKER_FORMAT, findUrl } from '../utils/marker'
import { CardForm, CardBody, findOneComment } from '../components/card'


interface RouteProps extends RouteComponentProps<{ location: { state?: { card: QT.cocardFragment } } }> {
  me?: QT.me_me
}

function _toUrlParams(key: string, value: string): string {
  const params = new URLSearchParams()
  params.set(key, value)
  return params.toString()
}

function CardHeader({ card }: { card: QT.cocardFragment }) {
  console.log(card)
  const title = findOneComment(MARKER_FORMAT.srcTitle.mark, card.comments)
  const publishDate = findOneComment(MARKER_FORMAT.srcPublishDate.mark, card.comments)
  return (
    <pre>
      {card.link.url + '\n'}
      {title && title.text + '\n'}
      {publishDate && publishDate.text + '\n'}
      {card.link.oauthorName + '\n'}
      {'(NEXT)Keywords\n'}
      {card.comments.length === 0 ? "新建立" : undefined}
    </pre>
  )
}

function ResolvedWebpageForm({ card }: { card: QT.cocardFragment }) {
  const [mode, setMode] = useState<string>('EDIT')
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <CardHeader card={card} />
      {/* <Button onClick={() => { setMode('EDIT') }}>編輯</Button> */}
      {/* <Button onClick={() => { setMode('BROWSE') }}>瀏覽</Button> */}
      { mode === 'EDIT' &&
        <CardForm
          card={card}
          allowedSects={['ticker', 'topic']}
          rootFormat={WEBPAGE_ALLOWED_MARKERS}
          onFinishFn={() => { navigate(`/webpage?${_toUrlParams('url', card.link.url)}`) }}
        />}
      { mode === 'BROWSE' &&
        <CardBody card={card} allowedMarkers={WEBPAGE_ALLOWED_MARKERS} />}
    </Layout.Content>
  )
}

function PlainWebpageForm() {
  /** （僅用於測試期間）在沒有預先給URL的情況，用textarea取得URL，再轉至cardForm */
  const [err, setErr] = useState<string | undefined>()
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { url, textAfterUrl: text } = findUrl(e.target.value)
    if (url) {
      navigate(`/webpage/form?${_toUrlParams('url', url)}`)
    } else {
      setErr('No URL found')
    }
  }
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <pre>
        URL: 用input首行代表
        貼上文字後會自動fetch
      </pre>
      {err && <h1>{err}</h1>}
      <Input.TextArea onChange={onChange} rows={10} autoSize />
    </Layout.Content>
  )
}


export const WebpageFormPage: React.FC<RouteProps> = function ({ location }) {
  /**
   * 注意：
   * - 不要用locatiion.state：因為找不到方法變更state，會記錄著之前的狀態而不更新 -> 用apollo cache
   * 
   * TODO:
   * - ticker section
   * - comment freeze -> 暫時方案：與既有comment重複的marker直接忽略不重複創建
   * - 載入預設template
   * - poll marker
   * - pretty form
   * - input auto-complete: ticker, topic
   * - 在編輯時可以叫出其他卡片 & import comment
   * - comment replies
   * - modify/delete existed markers
   */
  const [cocard, cocardResult] = useLazyQuery<QT.cocard, QT.cocardVariables>(queries.COCARD, {
    // fetchPolicy: "network-only" 
  })
  const url = new URLSearchParams(location?.search).get("url")

  if (url === null)
    return <PlainWebpageForm />
  if (!cocardResult.called)
    cocard({ variables: { url } })
  if (cocardResult.loading)
    return null
  if (cocardResult.error)
    return <h1>Error: {cocardResult.error.message}</h1>
  if (cocardResult.data && cocardResult.data.cocard !== null)
    return <ResolvedWebpageForm card={cocardResult.data.cocard} />
  return <h1>Unpected error</h1>
}

function ResolvedWebpagePage({ card }: { card: QT.cocardFragment }) {
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <CardHeader card={card} />
      <Button onClick={() => { navigate(`/webpage/form?${_toUrlParams('url', card.link.url)}`) }}>編輯</Button>
      <CardBody card={card} allowedMarkers={WEBPAGE_ALLOWED_MARKERS} />
    </Layout.Content>
  )
}

export const WebpagePage: React.FC<RouteProps> = function ({ location }) {
  const [cocard, { called, loading, data, error }] = useLazyQuery<QT.cocard, QT.cocardVariables>(queries.COCARD)

  const url = new URLSearchParams(location?.search).get("url")
  if (!url)
    return <h1>Require URL</h1>
  if (!called)
    cocard({ variables: { url } })
  if (loading)
    return <h1>loading</h1>
  if (error)
    return <h1>{error.message}</h1>
  if (data && data.cocard !== null)
    return <ResolvedWebpagePage card={data.cocard} />
  if (data && data.cocard === null)
    // 目前query cocard若沒找到會直接建立新的，所以這個原則上不會發生
    navigate(`/webpage/form?${_toUrlParams('url', url)}`)
  return <h1>Unpected error</h1>
}

// ------- Deprecated --------

// export const WebpageFetchFormPage: React.FC<RouteComponentProps> = function () {
//   /** @deprecated */
//   const [fetchLink, { data, loading, error }] = useLazyQuery<QT.fetchLink, QT.fetchLinkVariables>(queries.FETCH_LINK)
//   function onFinish(values: any) {
//     fetchLink({ variables: { url: values.url } })
//   }
//   if (data?.fetchLink)
//     navigate('/webpage/form', { state: { link: data.fetchLink } })
//   return (
//     <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
//       <h1>新增Note-card</h1>
//       <p>步驟1：輸入來源URL</p>
//       { loading ?
//         <Alert message="Loading ..." type="info" />
//         :
//         <Form onFinish={onFinish} >
//           <Form.Item label="URL" name="url" rules={[{ required: true, message: 'URL is required' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">送出</Button>
//           </Form.Item>
//         </Form >
//       }
//       { error && <Alert message={error.message} type="error" />}
//     </Layout.Content>
//   )
// }
