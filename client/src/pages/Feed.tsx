import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

// import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, FeedDetail } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';
import * as FeedDetailTypes from './__generated__/FeedDetail'

export const FEED_TILE = gql`
  fragment FeedTile on Feed {
    __typename
    id
    header
    event {
      id
      slug
    }
    tags {
      id
      slug
    }
    tickers {
      id
      name
      # seq {
      #   id
      # }
    }
    # comments
    # stats {
    #   nViews
    #   nVoteUps
    #   nVoteDowns
    # }
    # createdAt
    updatedAt
  }
`;

export const COMMENT_TILE = gql`
  fragment CommentTile on Comment {
    __typename
    id
  }
`;

export const GET_FEED = gql`
  query FeedDetail($id: ID!) {
    feed(id: $id) {
      ...FeedTile
      body
      comments {
        ...CommentTile
      }
      stats {
        nViews
        nVoteUps
        nVoteDowns
      }
      # isInCart @client
      # site
      # rocket {
        # type
      # }
      # ...LaunchTile
    }
  }
  ${FEED_TILE}
  ${COMMENT_TILE}
`

interface Props extends RouteComponentProps {
  id?: any
}

const Feed: React.FC<Props> = ({ id }) => {
  const {
    data,
    loading,
    error
  } = useQuery<
    FeedDetailTypes.FeedDetail,
    FeedDetailTypes.FeedDetailVariables
  >(
    GET_FEED,
    { variables: { id } }
  )

  if (loading) return <Loading />
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Not found</p>


  return (
    <>
      {/* <Header> */}
      <FeedDetail {...data.feed} />
      {/* </Header> */}
    </>
  )
}

// const Feed: React.FC<LaunchProps> = ({ id }) => {
//   const {
//     data,
//     loading,
//     error
//   } = useQuery<
//     LaunchDetailsTypes.LaunchDetails,
//     LaunchDetailsTypes.LaunchDetailsVariables
//   >(GET_LAUNCH_DETAILS,
//     { variables: { launchId } }
//   )

//   if (loading) return <Loading />;
//   if (error) return <p>ERROR: {error.message}</p>;
//   if (!data) return <p>Not found</p>;

//   return (
//     <Fragment>
//       <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>
//         {data && data.launch && data.launch.mission && data.launch.mission.name}
//       </Header>
//       <LaunchDetail {...data.launch} />
//       <ActionButton {...data.launch} />
//     </Fragment>
//   )
// }

export default Feed