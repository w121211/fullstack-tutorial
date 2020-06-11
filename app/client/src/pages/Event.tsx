import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { PostTile } from '../components/postTile'

interface EventProps {
  name: string
}

const _eventContent = {
  status: "ALIVE",  // ALIVE, END
  cat: "", // NEWS, COMPANY, SIGNAL
  start: Date.now(),
  end: null,
  // title: "Some event name?",
  tags: ["#tag1", "tag2"],
  events: ["a-event", "b-event"],
  shotedAt: Date.now(),
}

const Event: React.FC<EventProps> = ({ name }) => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const getMe = useQuery<QT.me>(queries.ME)
  const getPosts = useQuery<QT.latestPosts, QT.latestPostsVariables>(
    queries.LATEST_POSTS, { fetchPolicy: "cache-and-network", })
  // const [showLogin, setShowLogin] = useState<boolean>(false)
  const getSymbol = useQuery<QT.getSymbol, QT.getSymbolVariables>(
    queries.GET_SYMBOL, {
    variables: { name },
    fetchPolicy: "cache-and-network"
  })

  if (getSymbol.loading) return <p>Loading...</p>
  // if (getSymbol.error) return <p>ERROR: {getSymbol.error.message}</p>
  if (getSymbol.error) return <p>Event {name} is not found</p>
  if (getSymbol.data) console.log(getSymbol.data)

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
  // const posts = getPosts.data?.latestPosts.map(
  //   x => <PostTile
  //     key={x.id}
  //     post={x}
  //     me={getMe.data?.me}
  //     // toLogin={() => setShowLogin(true)}
  //     toLogin={() => { }}
  //   />)
  const morePosts = null
  const commits = null
  const createCommit = null
  const parentEvent = null
  const tickers = ["$$風電"]
  const tags = []
  const synonyms = []  // resolve
  // const redirect = ""
  // const follow = <button onClick={}></button>

  return (
    <>
      {/* {showLogin ? <button>Login</button> : null} */}
      {header}
      {chart}
      {/* {posts} */}
      {morePosts}
    </>
  )
}


interface Props extends RouteComponentProps {
  name?: string
}

export const EventPage: React.FC<Props> = ({ name }) => {
  if (name === undefined) return <Event name="404" />
  return <Event name={name} />
}