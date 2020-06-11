import dayjs from 'dayjs'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import { Spin, Input, Card, Divider, Row, Col, Typography, Tag, Button, List, Space, Form, Comment, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { CoffeeOutlined, VerticalAlignTopOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Post } from './postTile'


interface PostListProps {
  me?: QT.me_me
  toLogin?: () => void
}

export const PostList: React.FC<PostListProps> = ({ me, toLogin }) => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myPollVotes>(queries.MY_POLL_VOTES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const { data, loading, error, fetchMore } = useQuery<QT.latestPosts, QT.latestPostsVariables>(
    queries.LATEST_POSTS, {
    onCompleted() {
      console.log('latestPosts completed')
    }
  })

  if (error) return <p>Something goes wrong...</p>
  // if (loading || !data) return null
  // if (loading) return <p>loading</p>
  if (!data) return null

  const after = data.latestPosts[data.latestPosts.length - 1].id

  function onClickMore() {
    fetchMore({
      variables: { after },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          latestPosts: [...prev.latestPosts, ...fetchMoreResult.latestPosts]
        }
      }
    })
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {
        data?.latestPosts && data?.latestPosts.map(x =>
          <Post
            key={x.id}
            post={x}
            me={me}
            toLogin={toLogin}
          />
        )
      }
      {/* <Divider>2010-5-1</Divider> */}
      <div style={{ textAlign: "center" }}>
        {
          loading ?
            <Spin /> :
            <Button type="primary" onClick={onClickMore}>載入更多</Button>
        }
      </div>
    </Space>
  )

}