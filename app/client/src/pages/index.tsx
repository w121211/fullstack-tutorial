import React, { Fragment } from 'react'
import { Layout } from 'antd'
import { Router, RouteComponentProps, Redirect } from '@reach/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PageContainer, Pane } from '../components/layout'
import { ProtectedRoute, LoginPage, AutoLogin } from './login'
import { HomePage } from './homePage'
import { TickerPage } from './tickerPage'
import { TopicPage } from './topicPage'
import { AuthorPage } from './authorPage'
import { WebpagePage } from './webpagePage'

import '../appLayout/appLayout.less'
import Anchor from '../components/anchor/tickerAnchor'


interface NotFoundProps extends RouteComponentProps { }

const NotFoundPage: React.FC<NotFoundProps> = function () {
  return <h1>Page not found</h1>
}

const { Header, Sider, Content } = Layout

function LayoutPages() {
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
          {/* <BlockPage path="block/:id" me={data?.me} /> */}

          {/* <ProsCons />
            <TickerComment />
            <Tab /> */}
        </Router>
      </Layout>
    </Layout>
  )
}

export function Pages() {
  // 為了存cache
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  useQuery<QT.myReplyLikes>(queries.MY_REPLY_LIKES)
  useQuery<QT.myVotes>(queries.MY_VOTES)
  const { data, loading } = useQuery<QT.me>(queries.ME)
  const isLoggedIn = !!data?.me

  if (loading)
    return null
  return (
    <Layout className="my-app">
      <AutoLogin />

      <Layout className="site-layout" style={{ position: 'relative' }}>
        {/* {!isLoggedIn && <Redirect from="" to="/login" noThrow />} */}

        <Router primary={false} component={Fragment}>
          {/* <BlockPage path="block/:id" me={data?.me} /> */}
          <HomePage path="/" />
          <TickerPage path="ticker/:symbol" />
          <TopicPage path="topic/:title" />
          <AuthorPage path="author/:symbol" />
          <WebpagePage path="webpage/:id" />

          {/* <BlockPage path="block/*path" me={data?.me} /> path可以為'/aaa/bbb/ccc' */}

          <PageContainer path="/" isLoggedIn={isLoggedIn}>
            {/* <ProtectedRoute as={Feed} isLoggedIn={isLoggedIn} default /> */}
            {/* <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default /> */}
            <LoginPage path="login" />
            <NotFoundPage default />
          </PageContainer>

          {/* <Pane path="/" left={<Feeds />} right={undefined} /> */}
          {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
        </Router>

      </Layout>

    </Layout>

  )
}

