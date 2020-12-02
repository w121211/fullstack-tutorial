import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Layout } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { CommentList, QueryCommentList } from '../components/tileList'
import { Reply, Comment, CommentWithPoll } from '../components/tile'
// import { CommentForm } from '../components/tileForms'
import { CommentForm, SearchAllForm, SearchPageForm, NoteForm } from '../components/forms'
// import { CommentForm } from '../components/tileForms'
// import { SymbolAutoComplete } from '../components/symbolHint'

import { CssBlockCard } from '../components/block'
import blockMetaCss from '../components/blockMeta/blockMeta.module.scss'

interface RouteProps extends RouteComponentProps<{ title: string }> {
  me?: QT.me_me
}

export const TopicPage: React.FC<RouteProps> = function ({ title, me }) {
  const queryPage = useQuery<QT.page, QT.pageVariables>(
    queries.PAGE, { variables: { title } }
  )
  if (queryPage.loading)
    return null
  if (!queryPage.data)
    return <p>something goes wrong</p>
  const pg = queryPage.data.page
  if (!pg)
    return <h1>Null block</h1>
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      {pg.title}
      <CssBlockCard title="">
        <ul>
          {pg.props.voteCreate &&
            <Comment comment={pg.props.voteCreate} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '同意建立' }} />}
          {pg.props.tickers &&
            <Comment comment={pg.props.tickers} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: 'Tickers' }} />}
          {pg.props.wiki &&
            <li>
              <span className={blockMetaCss.span}>Wiki</span>
              {pg.props.wiki}
            </li>
          }
          {pg.props.shortView &&
            <Comment comment={pg.props.shortView} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '短線' }} />}
          {pg.props.longView &&
            <Comment comment={pg.props.longView} options={{ dispCommentAs: 'key-value', dispReplyAs: 'tag', swapText: '長線' }} />}
        </ul>
      </CssBlockCard>
      <pre>(NEXT) Compare tickers table</pre>
      <pre>(NEXT) Comments: by filter</pre>
    </Layout.Content>
  )
}
