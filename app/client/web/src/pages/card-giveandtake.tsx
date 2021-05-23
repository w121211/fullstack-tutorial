import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate, useLocation } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Layout, Button } from 'antd'
import * as queries from '../graphql/queries'
import * as QT from '../graphql/query-types'
import { CardForm, CardBody } from '../components/card'
import { symbolToUrl, getCardUrlParam } from '../helper'
import { ResolvedCardPage } from './card-page'

interface RouteProps extends RouteComponentProps {
  me?: QT.me_me
}

function ResolvedCardFormPage({ card }: { card: QT.cocardFragment }): JSX.Element {
  const [mode, setMode] = useState<string>('EDIT')
  return (
    <Layout.Content className="site-layout-background content" style={{ minHeight: 280 }}>
      {/* <CardHeader card={card} /> */}
      {/* <Button onClick={() => { setMode('EDIT') }}>編輯</Button> */}
      {/* <Button onClick={() => { setMode('BROWSE') }}>瀏覽</Button> */}
      {mode === 'EDIT' && (
        <CardForm
          card={card}
          // allowedSects={['ticker', 'topic']}
          onFinishFn={() => {
            navigate(`/card?${getCardUrlParam(card)}`)
          }}
        />
      )}
      {mode === 'BROWSE' && <CardBody card={card} />}
    </Layout.Content>
  )
}

export function GiveandtakeCardPage({ path }: RouteProps): JSX.Element {
  const location = useLocation()
  const params = new URLSearchParams(location?.search)
  const symbol = params.get('s')

  const { loading, data, error } = useQuery<QT.cocard, QT.cocardVariables>(queries.COCARD, {
    variables: { url: symbolToUrl(symbol ?? '') },
    // fetchPolicy: 'no-cache',
  })
  const [isLock, setIsLock] = useState()

  if (!symbol) return <h1>僅用於symbol的測試</h1>
  if (loading) return <h1>loading</h1>
  if (error || !data) return <h1>{error?.message}</h1>
  if (data.cocard === null) {
    // 目前query cocard若沒找到會直接建立新的，所以這個原則上不會發生
    // navigate(`/webpage/form?${_toUrlParams('url', url)}`)
    console.error('something wrong')
    return <h1>Unpected error</h1>
  }

  return (
    <>
      {isLock ? (
        <div>
          <p>鎖住中：編寫內容解鎖</p>
          <CardForm
            card={data.cocard}
            // allowedSects={['ticker', 'topic']}
            onFinishFn={() => {
              navigate(`/card?${getCardUrlParam(data.cocard as QT.cocard_cocard)}`)
            }}
          />
        </div>
      ) : (
        <div>已解鎖</div>
      )}
      {!isLock && <ResolvedCardPage card={data.cocard} />}
    </>
  )
}
