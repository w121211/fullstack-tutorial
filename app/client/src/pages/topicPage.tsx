import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Layout } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CssBlockCard } from '../components/block'
// import { filterManyComments, filterOneComments } from '../components/card'

interface RouteProps extends RouteComponentProps<{ title: string }> {
  me?: QT.me_me
}

export const TopicPage: React.FC<RouteProps> = function ({ title, me }) {
  const { loading, data, error } = useQuery<QT.cocard, QT.cocardVariables>(
    queries.COCARD, { variables: { symbolName: title } }
  )
  if (loading)
    return null
  if (!data || error)
    return <p>something goes wrong</p>
  if (data.cocard === null)
    return <p>Topic {title} not found</p>
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <h1>{title}</h1>
      <p>
        {/* {filterOneComments('description', data.cocard.comments)} */}
        <br />
        {/* {filterManyComments('link', data.cocard.comments).map(e => e.text)} */}
        <br />
        {/* {filterManyComments('ticker', data.cocard.comments).map(e => e.text)} */}
      </p>

      {/* <CssBlockCard title="">
        <TopicCocardBody card={data.cocard} />
      </CssBlockCard> */}

      <pre>(NEXT) Compare tickers table</pre>
      <pre>(NEXT) Discuss: by filter</pre>
    </Layout.Content>
  )
}
