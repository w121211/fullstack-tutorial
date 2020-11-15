import React, { Fragment } from 'react'
import { Layout } from 'antd'
import { Router, RouteComponentProps, Redirect } from '@reach/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PageContainer, Pane } from '../components/layout'
import { BoardPage } from './board'
import { PostThreadPage } from './postThread'
// import { SubmitPage } from './submit'
// import { SymbolPage } from './symbol'
import { ProtectedRoute, LoginPage, AutoLogin } from './login'
import { Ticker } from './ticker'
import { EventPage } from './event'
import { StackPage } from './stack'
import { StagePage } from './stage'
import { CreditPage } from './credit'
import { CreatePollPage } from './createPoll'
import { TagPage } from './tag'
import { ComparePage } from './compare'
import { BlockPage, BlockMetaPage } from './block'

import '../appLayout/appLayout.less'
import Anchor from '../components/anchor/tickerAnchor'


interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.FC<NotFoundProps> = () => {
  return <h1>Page not found</h1>
}

const { Header, Sider, Content } = Layout

export function LayoutPages() {
  // useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  // useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  // useQuery<QT.myVotes>(queries.MY_VOTES)
  const { data, loading } = useQuery<QT.me>(queries.ME)
  const isLoggedIn = !!data?.me

  // if (loading)
  //   return null
  return (
    <Layout className="my-app">
      {/* <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
          style={{ position: 'relative' }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              探索
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              熱門
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              關注
            </Menu.Item>
          </Menu>
        </Sider> */}
      <Layout className="site-layout" style={{ position: 'relative' }}>
        <Header
          className="site-layout-background header "
          style={{ padding: 0 }}
        >
        </Header>
        {/* <div className="anchorWrapper">
          <Anchor />
        </div> */}

        <Router primary={false} component={Fragment}>
          {/* <BlockMetaPage path="/" /> */}
          <BlockPage path="block/:id" me={data?.me} />
          {/* <BlockMeta path="/" /> */}

          {/* <ProsCons />
            <TickerComment />
            <Tab /> */}
        </Router>
      </Layout>
    </Layout>
  )
}

export function Pages() {
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  // useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  // useQuery<QT.myVotes>(queries.MY_VOTES)
  const { data, loading } = useQuery<QT.me>(queries.ME)
  const isLoggedIn = !!data?.me

  if (loading)
    return null
  return (
    <>
      <AutoLogin />
      {/* {!isLoggedIn && <Redirect from="" to="/login" noThrow />} */}

      <Router primary={false} component={Fragment}>

        <BlockPage path="block/:id" me={data?.me} />

        {/* <BlockPage path="block/*path" me={data?.me} /> */}

        {/* <SubmitPage path="submit" /> */}

        {/* <ProtectedRoute path="submit" isLoggedIn={isLoggedIn} as={<SubmitPage />} /> */}

        <PostThreadPage path="post/:id" me={data?.me} />

        {/* <PostThreadPage path="post/:id" /> */}

        <PageContainer path="/" isLoggedIn={isLoggedIn}>

          {/* <BoardPage path="/" me={data?.me} /> */}

          <StagePage path="/" me={data?.me} />

          {/* <SymbolPage path="symbol/:name" /> */}

          <Ticker path="ticker" />

          {/* <EventPage path="event/:name" /> */}
          <EventPage path="event" />
          <StackPage path="stack" />
          <CreditPage path="credit" />
          <CreatePollPage path="cpoll" />
          <TagPage path="tag" />
          <ComparePage path="compare" />

          {/* <ProtectedRoute as={Feed} isLoggedIn={isLoggedIn} default /> */}
          {/* <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default /> */}

          <LoginPage path="login" />

          <NotFound default />

        </PageContainer>

        {/* <Pane path="/" left={<Feeds />} right={undefined} /> */}
        {/* <EventPage path="event/:name" /> */}
        {/* <CommitCreate path="commit/new" /> */}
        {/* <Ticker path="ticker" /> */}
        {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
        {/* <Feeds path="feeds" /> */}

      </Router>
    </>
  )
}

