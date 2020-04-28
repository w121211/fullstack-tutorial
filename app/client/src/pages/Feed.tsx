import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Post } from '../components/Post'

interface Props extends RouteComponentProps { }

export const Feed: React.FC<Props> = () => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  useQuery<QT.myPostVotes>(queries.MY_POST_VOTES)
  const { data: meData } = useQuery<QT.me>(queries.ME)
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
    <>
      {showLogin ? <button>Login</button> : null}
      {
        data?.latestPosts && data?.latestPosts.map(x =>
          <Post
            key={x.id}
            post={x}
            me={meData?.me}
            toLogin={() => setShowLogin(true)} />
        )
      }
      {more}
    </>
  )
}