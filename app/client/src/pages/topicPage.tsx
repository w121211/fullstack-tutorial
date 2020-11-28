import React, { useState } from 'react'
import { RouteComponentProps, Redirect, Link, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'
import { AutoComplete, Card, Space, List, Typography, Layout, Divider, Drawer, Modal, Input } from 'antd'
import { SelectProps } from 'antd/es/select'
import { ArrowLeftOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { RepliedPostList } from '../components/postList'
import { CommentList, QueryCommentList, QuerySpotCommentList } from '../components/tileList'
import { Reply, Comment, CommentWithPoll } from '../components/tile'
// import { CommentForm } from '../components/tileForms'
import { CommentForm, SearchAllForm, SearchPageForm, NoteForm } from '../components/forms'
// import { CommentForm } from '../components/tileForms'
// import { SymbolAutoComplete } from '../components/symbolHint'

import { LineChart } from '../components/charts'
import ProsCons from '../components/prosCons/prosCons'
import Anchor from '../components/anchor/tickerAnchor'
import Tag from '../components/tag/tag'
import BlockCss from '../components/block/block.module.scss'
import BlockMetaCss from '../components/blockMeta/blockMeta.module.scss'
import Radio from '../components/radios/radios'
import CommenTemplate from '../components/commentTemplate/commentTemplate'
import MyTextArea from '../components/myTextArea/myTextArea'
import CssCommentList from '../components/commentList/commentList'
import { SomeTable } from '../components/tables'


interface RouteProps extends RouteComponentProps<{ title: string }> {
  me?: QT.me_me
}

export const TopicPage: React.FC<RouteProps> = function ({ title, me }) {
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { path: title } }
  )
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Null block</h1>
  return (
    <pre>
      [[Topic]]
      status: new
      symbols:
      tickers:
      [Ticker compare table]
      [Comments:filter]
    </pre>
  )
}