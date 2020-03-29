import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import { List } from 'antd'

// import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, FeedDetail } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';
import * as Types from './__generated__/GetComments'

export const GET_COMMENTS = gql`
  query GetComments($feedId: ID!, $after: String) {
    comments(feedId: $feedId, after: $after) {
      # user {
      #   id
      # }
      body
      stats {
        nViews
        nVoteUps
        nVoteDowns
      }
    }
  }
`

interface Props extends Types.GetCommentsVariables { }

const Comments: React.FC<Props> = ({ feedId, after }) => {
  const { data, loading, error } = useQuery<Types.GetComments, Types.GetCommentsVariables>(
    GET_COMMENTS, { variables: { feedId, after } }
  )

  if (loading) return <Loading />
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Not found</p>

  // const _data = ['d1', 'd2', 'd3']

  return <List
    bordered
    dataSource={data.comments}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
}

export default Comments