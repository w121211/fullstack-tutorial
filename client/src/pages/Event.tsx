import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

// import { LAUNCH_TILE_DATA } from './launches';
// import { Loading, Header } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';


interface Props extends RouteComponentProps {
  id?: any
}

// const Event: React.FC<Props> = ({ id }) => {
//   const {
//     data,
//     loading,
//     error
//   } = useQuery<
//     FeedDetailTypes.FeedDetail,
//     FeedDetailTypes.FeedDetailVariables
//   >(
//     GET_FEED,
//     { variables: { id } }
//   )

//   if (loading) return <Loading />
//   if (error) return <p>ERROR: {error.message}</p>
//   if (!data) return <p>Not found</p>


//   return (
//     <>
//       {/* <Header> */}
//       <FeedDetail {...data.feed} />
//       {/* </Header> */}
//     </>
//   )
// }

export default Event