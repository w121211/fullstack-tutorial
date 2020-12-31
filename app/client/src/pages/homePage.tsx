import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Layout } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CssBlockCard } from '../components/block'
import { SearchAllForm } from '../components/forms'

interface RouteProps extends RouteComponentProps {
  me?: QT.me_me
}

export const HomePage: React.FC<RouteProps> = function ({ me }) {
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280, }}>
      <CssBlockCard title="">
        <SearchAllForm />
        <pre>(NEXT)熱門: ...</pre>
      </CssBlockCard>
      <pre>(NEXT)抽卡</pre>
      <pre>(NEXT)Card Deck</pre>
    </Layout.Content>
  )
}