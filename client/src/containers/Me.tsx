import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import { List } from 'antd'

// import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, FeedDetail } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';

export const GET_ME = gql`
  query GetMe {
    me {
      id
    }
  }
`


// const LOGIN = gql`
//   query Login {
//     isLoggedIn @client
//   }
// `

