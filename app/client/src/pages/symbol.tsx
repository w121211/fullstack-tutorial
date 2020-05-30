import React from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Button, Card, Divider, Layout, Row, Col, Space, List, Typography, Result } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Pane } from '../components/layout'
import { PostTile } from '../components/postTile'

interface SymbolProps {
  name: string
}

const Symbol: React.FC<SymbolProps> = ({ name }) => {
  console.log(name)
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  useQuery<QT.myPollVotes>(queries.MY_POLL_VOTES)
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
  if (getSymbol.error) return <Result
    title="Oops..."
    subTitle={<><i>{name}</i> is not existed</>}
  />
  if (getSymbol.data) console.log(getSymbol.data)
  if (!getSymbol.data) return <p>No data...</p>

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

  const status = <p>{getSymbol.data?.symbol.status}</p>
  const chart = null
  const commits = null
  const createCommit = null
  const parentEvent = null
  const tickers = ["$$風電"]
  const tags = []
  const synonyms = []  // resolve
  // const redirect = ""
  // const follow = <button onClick={}></button>

  return (
    <Space direction="vertical">
      {/* {showLogin ? <button>Login</button> : null} */}
      <Typography>
        <Typography.Title level={2}><i>{getSymbol.data.symbol.name}</i></Typography.Title>
        {/* <Typography.Paragraph>
          咖啡相關、咖啡類股、咖啡產業
        </Typography.Paragraph> */}
      </Typography>

      {/* <Button>訂閱</Button> */}

      {
        getPosts.data?.latestPosts.map(
          x => <PostTile
            key={x.id}
            post={x}
            me={getMe.data?.me}
            // toLogin={() => setShowLogin(true)}
            toLogin={() => { }}
          />)
      }

      <Button>讀取更多</Button>

    </Space>
  )
}

interface SymbolPageProps extends RouteComponentProps<{ name: string }> { }

export const SymbolPage: React.FC<SymbolPageProps> = ({ name }) => {
  if (!name)
    return <Redirect to="/" />

  // return <Symbol name={decodeURIComponent(name)} />
  return <Pane left={<Symbol name={decodeURIComponent(name)} />} />
}