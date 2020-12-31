import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery, useLazyQuery } from '@apollo/client'
import { Alert, Form, Layout, Button, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

import { WebpageCocardForm } from '../components/card'

// function PageLinkProps({ link }: { link: QT.page_page_link }) {
//   return (
//     <>
//       URL: {link.url}
//       domain: {link.domain}
//       {/* contentAuthor: {link.author} */}
//       {/* contentType: */}
//       {/* contentCreatedAt: */}
//     </>
//   )
// }

interface RouteProps extends RouteComponentProps<{ id: string }> {
  me?: QT.me_me
}

export const WebpageFetchFormPage: React.FC<RouteComponentProps> = function () {
  const [fetchLink, { data, loading, error }] = useLazyQuery<QT.fetchLink, QT.fetchLinkVariables>(queries.FETCH_LINK)
  function onFinish(values: any) {
    fetchLink({ variables: { url: values.url } })
  }
  if (data?.fetchLink)
    navigate('/webpage/form', { state: { link: data.fetchLink } })
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <h1>新增Note-card</h1>
      <p>步驟1：輸入來源URL</p>
      { loading ?
        <Alert message="Loading ..." type="info" />
        :
        <Form onFinish={onFinish} >
          <Form.Item label="URL" name="url" rules={[{ required: true, message: 'URL is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">送出</Button>
          </Form.Item>
        </Form >
      }
      { error && <Alert message={error.message} type="error" />}
    </Layout.Content>
  )
}

export const WebpageCocardFormPage: React.FC<RouteComponentProps> = function ({ location }) {
  /**
   * 1. 用link（from fetchLink）抓cocard
   * 2. 導入webpage meta等東西
   */
  // if (location?.state === null)
  //   return <Redirect to="/webpage/fetch" noThrow />
  const fakeLink: QT.fetchLink_fetchLink = {
    __typename: "Link",
    id: '32',
    url: 'https://www.youtube.com/watch?v=pAmQY9yX8mM&list=PLYtoePJQbGmiO08bS7xF78czdQy6gDw9Q&index=6',
    domain: 'youtube',
    contentType: 'VIDEO',
    contentId: 'pAmQY9yX8mM',
    oauthorName: '@妈咪说MommyTalk:youtube',
  }
  const { loading, data, error } = useQuery<QT.cocard, QT.cocardVariables>(
    queries.COCARD, { variables: { linkUrl: fakeLink.url } }
  )
  if (loading)
    return null
  if (error)
    return <h1>{error.message}</h1>
  if (!data || data.cocard === null)
    return <h1>Cocard not found</h1>
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <WebpageCocardForm link={fakeLink} card={data.cocard} />
    </Layout.Content>
  )
}

export const WebpagePage: React.FC<RouteProps> = function ({ id, me }) {
  // const queryPage = useQuery<QT.page, QT.pageVariables>(
  //   queries.PAGE, { variables: { id } }
  // )
  // if (queryPage.loading)
  //   return null
  // if (!queryPage.data)
  //   return <p>something goes wrong</p>
  // const pg = queryPage.data.page
  // if (!pg)
  //   return <h1>Page not found</h1>
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      {/* {pg.props.srcTitle}[{pg.link?.url}] by {pg.props.srcAuthor}
      <CssBlockCard title="">
        <ul>
          <li>
            <span className={blockMetaCss.span}>Symbols</span>
            {pg.props.wiki}
          </li>
        </ul>
      </CssBlockCard>
      <pre>Note</pre>
      <CommentList comments={pg.comments ?? []} /> */}
      {/* <NoteForm /> */}
    </Layout.Content>
  )
}
