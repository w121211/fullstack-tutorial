import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common'

import { Layout, Row, Col } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostTile } from '../components/Post'


// function Login({ me }: { me: QueryResult<QT.me> }) {
function Login() {
  // console.log(typeof refetch)
  const me = useQuery<QT.me>(queries.ME)
  const [login, { data, loading }] = useMutation<QT.login, QT.loginVariables>(
    queries.LOGIN,
    {
      onCompleted() {
        me.refetch()
      }
    }
  )
  if (loading) return null
  if (!data) {
    login({
      variables: {
        email: "ccc@ccc.com",
        password: "ccc"
      }
    })
    console.log('logging')
    // me.refetch()
  } else {
    console.log(data)
    // me.refetch()
  }

  if (me.data) {
    console.log(me.data)
  } else {
    console.log('no me data')
  }

  return null
}

interface Props extends RouteComponentProps { }

export const Feed: React.FC<Props> = () => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  useQuery<QT.myPostVotes>(queries.MY_POST_VOTES)
  const me = useQuery<QT.me>(queries.ME)
  const { data, loading, error, fetchMore } = useQuery<QT.latestPosts, QT.latestPostsVariables>(
    queries.LATEST_POSTS, {
    fetchPolicy: "cache-and-network",
    onCompleted() {
      console.log('latestPosts completed')
    }
  })
  const [showLogin, setShowLogin] = useState<boolean>(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>No feeds</p>

  const login = me.data ? null : <Login />
  // console.log(typeof me.refetch)

  const after = '1234'
  const more = null
    ? <button onClick={() => fetchMore({
      variables: { after },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          latestPosts: [...prev.latestPosts, ...fetchMoreResult.latestPosts]
        }
      }
    })}>Load more</button>
    : <button onClick={() => setShowLogin(true)}>Load more</button>

  return (
    <Layout>
      {login}
      <Layout.Content className="site-layout" style={{ maxWidth: 800 }}>
        <Row>
          <Col span={17} offset={1}>

            {showLogin ? <button>Login</button> : null}
            {
              data?.latestPosts && data?.latestPosts.map(x =>
                <PostTile
                  key={x.id}
                  post={x}
                  me={me.data?.me}
                  toLogin={() => setShowLogin(true)} />
              )
            }

            <br />{more}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}