import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { LaunchTile, Header, Button, Loading } from '../components'
import { RouteComponentProps } from '@reach/router'
import * as GetLaunchListTypes from './__generated__/GetLaunchList'

const GET_FEEDS = gql`
  query GetFeeds($after: String) {
    feeds(after: $after) {
      cursor
      hasMore
      feed {
        id
        title
        type  # url / event / signal
        stats {
          votesUp
          votesDown
        }
      }
    }
  }
`

interface LaunchesProps extends RouteComponentProps { }

const Launches: React.FC<LaunchesProps> = () => {
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  if (loading) return <Loading />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches &&
        data.launches.hasMore && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.launches.cursor,
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </Button>
        )}
    </Fragment>
  );
}

// export default Launches;

export default function FeedsBoard() {
  return ""
}