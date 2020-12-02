import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { AutoComplete, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

import { Comment } from '../components/tile'
import { CommentList } from '../components/tileList'
import { CssBlockCard } from '../components/block'
import blockMetaCss from '../components/blockMeta/blockMeta.module.scss'

function PageLinkProps({ link }: { link: QT.page_page_link }) {
  return (
    <>
      URL: {link.url}
      domain: {link.domain}
      {/* contentAuthor: {link.author} */}
      {/* contentType: */}
      {/* contentCreatedAt: */}
    </>
  )
}

interface RouteProps extends RouteComponentProps<{ id: string }> {
  me?: QT.me_me
}

export const WebpagePage: React.FC<RouteProps> = function ({ id, me }) {
  const queryPage = useQuery<QT.page, QT.pageVariables>(
    queries.PAGE, { variables: { id } }
  )
  if (queryPage.loading)
    return null
  if (!queryPage.data)
    return <p>something goes wrong</p>
  const pg = queryPage.data.page
  if (!pg)
    return <h1>Page not found</h1>
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      {pg.props.srcTitle}[{pg.link?.url}] by {pg.props.srcAuthor}
      <CssBlockCard title="">
        <ul>
          <li>
            <span className={blockMetaCss.span}>Symbols</span>
            {pg.props.wiki}
          </li>
        </ul>
      </CssBlockCard>
      <pre>Note</pre>
      <CommentList comments={pg.comments ?? []} />
      {/* <NoteForm /> */}
    </Layout.Content>
  )
}
