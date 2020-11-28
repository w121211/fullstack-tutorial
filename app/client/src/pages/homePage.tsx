import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { AutoComplete, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { QueryLatestWebpageList } from '../components/tileList'

function queryCommentByTitle({ title, propName }: { title: string, propName: string }) {
  /** 
   * 用於找特定的comment（因為無法確定commentID，只能透過pageTitle-pageProps的方式去尋找） 
   * 需求：道瓊predict、那斯達克predict
   * */
  // useQuery
  return null
}

interface RouteProps extends RouteComponentProps {
  me?: QT.me_me
}

export const HomePage: React.FC<RouteProps> = function ({ me }) {
  return (
    <pre>
      # Homepage
      ## SearchPanel
      search:SearchAllForm
      (NEXT)trending topics, new topics
      (NEXT)waiting tickers

      (NEXT)市場預測：
      - DJI:CommentWithPoll:DJI-block-propsComment-id
      
      Feeds (from youtube):WebpageTileList
      <QueryLatestWebpageList />

      (NEXT)battles
      (NEXT)抽卡
    </pre>
  )
}