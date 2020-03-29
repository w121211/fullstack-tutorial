import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

// import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, FeedTile } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';

interface Props extends RouteComponentProps { }

const Feeds: React.FC<Props> = () => {
  // const {
  //   data,
  //   loading,
  //   error
  // } = useQuery<
  //   FeedDetailTypes.FeedDetail,
  //   FeedDetailTypes.FeedDetailVariables
  // >(
  //   GET_FEED,
  //   { variables: { id } }
  // )

  // if (loading) return <Loading />
  // if (error) return <p>ERROR: {error.message}</p>
  // if (!data) return <p>Not found</p>


  return (
    <>
      {/* <Header> */}
      {/* <FeedTile {...data.feed} /> */}
      <FeedTile />
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

export default Feeds