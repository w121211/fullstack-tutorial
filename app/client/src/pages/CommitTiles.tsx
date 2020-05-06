import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Post } from '../components/Post'

interface Props extends RouteComponentProps {
  name: string
}

export const Commits: React.FC<Props> = ({ name }) => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  useQuery<QT.myPostVotes>(queries.MY_POST_VOTES)
  const getMe = useQuery<QT.me>(queries.ME)
  const getSymbol = useQuery<QT.getSymbol, QT.getSymbolVariables>(
    queries.LATEST_POSTS, { fetchPolicy: "cache-and-network" })
  const getPosts = useQuery<QT.latestPosts, QT.latestPostsVariables>(
    queries.LATEST_POSTS, { fetchPolicy: "cache-and-network", })
  // const [showLogin, setShowLogin] = useState<boolean>(false)

  if (getSymbol.loading) return <p>Loading...</p>
  if (getSymbol.error) return <p>ERROR: {getSymbol.error.message}</p>

  // const after = '1234'
  // const more = null
  //   ? <button onClick={() => fetchMore({
  //     variables: { after },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev
  //       return {
  //         ...prev,
  //         latestPosts: [...prev.latestPosts, ...fetchMoreResult.latestPosts]
  //       }
  //     }
  //   })}>Load more</button>
  //   : <button onClick={() => setShowLogin(true)}>Load more</button>

  const header = <h1>{getSymbol.data?.symbol.name}</h1>
  const status = <p>{getSymbol.data?.symbol.status}</p>
  const chart = null
  const posts = getPosts.data?.latestPosts.map(
    x => <Post
      key={x.id}
      post={x}
      me={getMe.data?.me}
      // toLogin={() => setShowLogin(true)}
      toLogin={() => { }}
    />)
  const morePosts = null
  const commits = null
  const createCommit = null
  const parentEvent = null
  const relatedTickers = null
  const relatedTags = null
  // const follow = <button onClick={}></button>

  return (
    <>
      {/* {showLogin ? <button>Login</button> : null} */}
      {header}
      {chart}
      {posts}
      {morePosts}
    </>
  )
}
export default Event