import dayjs from 'dayjs'

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import ReactMarkdown from 'react-markdown'
import { wikiLinkPlugin } from 'remark-wiki-link'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

function _parser(text: string) {
  /** 
   * @deprecated
   * 用regex寫的parser，已棄置（應該要用現成的grammar, parser庫）
   * */
  // const tokens = [
  //   <span key={1}>This is some </span>,
  //   <a key={2}>#bbb</a>,
  // ]
  // return <>{tokens.map(e => e)}</>
  const re = /#\w+/g
  const matched = []

  while (true) {
    const match = re.exec(text);
    if (!match) break
    matched.push([match.index, re.lastIndex])
  }
  const elements = []
  let start = 0
  for (let m of matched) {
    const pre = text.substr(start, m[0] - start)
    const matched = text.substr(m[0], m[1] - m[0])
    start = m[1]
    elements.push(pre)
    elements.push(matched)
  }
  // tail string
  elements.push(text.substr(start))
  return null
}


export function SyntaxText({ text = "this is a simple test" }: { text?: string }) {
  /**
   * 將markdown轉成components
   * - [[topic with blank]] -> /topic/topic_with_blank
   * - @asomebody:domain -> /author/@asomebody:domain
   * - $ticker -> /ticker/$ticker
   * - [external link](http://...) -> <a href="...">...</a>
   */

  // var unified = require('unified')
  // var markdown = require('remark-parse')
  // var tree = unified().use(markdown).parse('# Hello world!')
  // console.log(tree)

  const renderers = {
    // inlineMath: ({ value }) => <InlineMath math={value} />,
    // math: ({ value }) => <BlockMath math={value} />
    paragraph: function ({ value, children }: any) {
      return <span>{children}</span>
    },
    link: function (a: any) {
      console.log('~~~')
      console.log(a)
      console.log(a.href)
      return <h3>{a.children}</h3>
      // <h1>{value}</h1>
    },
    wikiLink: function ({ value }: any) {
      // console.log(a)
      return <b>{value}</b>
    }
  }

  return <ReactMarkdown
    plugins={[wikiLinkPlugin]}
    allowedTypes={['text', 'paragraph', 'link']}
    children={`The [[lift]] [[@coefficient|this is a]] ($C_L$) is a [I'm an inline-style link](https://www.google.com).`}
    renderers={renderers}
  />
}