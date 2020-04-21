import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Post } from './Post'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

export function Posts() {
  // const after = null
  const { data, loading, error, refetch } = useQuery<
    QT.newFeed,
    QT.newFeedVariables
  >(queries.NEW_FEED, {
    // variables: { after },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>No feeds</p>

  const after = '1234'

  return (
    <>
      {data.newFeed && data.newFeed.map((p) => <Post key={p.id} post={p} />)}
      <a onClick={() => refetch({ after })}>Load more</a>
    </>
  )
}
