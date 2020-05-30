import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Badge, Button, Card, Divider, Layout, Row, Col, Space, List, Typography, Radio } from 'antd'
import { CoffeeOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostTile, PostList } from '../components/postTile'
import { Pane } from '../components/layout'

// function Login({ me }: { me: QueryResult<QT.me> }) {
export function Login() {
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

  return <></>
}

function TrendingList() {
  const [showList, setShowList] = useState<boolean>(false)
  if (!showList) return <Button
    type={'primary'}
    onClick={() => { setShowList(true) }}
  >trending</Button>

  return (
    <Card>
      <h3>trending</h3>
      <List
        size="small"
        bordered
        dataSource={[
          "#1. data",
          "#2. data",
          "#3. data"
        ]}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </Card>
  )
}

interface Props {
  me?: QT.me_me
}

export const Board: React.FC<Props> = ({ me }) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div />
      <Space direction="horizontal" size="large">
        <span><Badge color="blue" dot>#IPO</Badge></span>
        <span><Badge color="blue" dot>#熱門</Badge></span>
        <span>#預測</span>
        <span>#問題</span>
        <span>@roboCNBC</span>
        <a>...more</a>
      </Space>

      {/* <div style={{ textAlign: "center" }}>
                <TrendingList />
              </div> */}

      <PostList me={me} />
    </Space>
  )
}

export function BoardRightPane() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div />
      <div style={{ textAlign: "center" }}>
        <Button type="primary" size="large">New Post</Button>
      </div>
    </Space>
  )
}

