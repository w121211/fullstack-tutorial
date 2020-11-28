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


function PageLinkProps({ link }: { link: QT.block_block_link }) {
  return (
    <>
      URL: {link.url}
      domain: {link.domain}
      {/* contentAuthor: {link.author} */}
      {/* contentType: */}
      {/* contentCreatedAt: */}
    </>
  )
}

interface RouteProps extends RouteComponentProps<{ id: string }> {
  me?: QT.me_me
}

export const WebpagePage: React.FC<RouteProps> = function ({ id, me }) {
  const queryBlock = useQuery<QT.block, QT.blockVariables>(
    queries.BLOCK, { variables: { id } }
  )
  if (queryBlock.loading)
    return null
  if (!queryBlock.data)
    return <p>something goes wrong</p>
  const bk = queryBlock.data.block
  if (!bk)
    return <h1>Page not found</h1>

  return (
    <div>
      <h2>Webpage</h2>
      {/* 
      {bk.props.longName ? bk.props.longName : bk.props.name}
      symbol: {bk.props.symbol ? bk.props.symbol : "null"}<br />
      symbols: {bk.props?.commentSymbols ? <Comment comment={bk.props?.commentSymbols} /> : null}<br />
      intro: {bk.props?.commentIntro ? <Comment comment={bk.props?.commentIntro} /> : null}<br /> 
      */}
      <pre>
        --- Page props ---
        {bk.link && <PageLinkProps link={bk.link} />}
        srctTitle: {bk.props.name}
        srcAuthor:
        symbols:  # 透過綜整note的symbols得到
        ------------------
        Note
        # .... (comment)
        # .... (comment)
        [NoteForm]
        {bk.comments?.map((e, i) => <Comment key={i} comment={e} />)}
        --------------
        <NoteForm />
      </pre>
    </div>
  )
}
