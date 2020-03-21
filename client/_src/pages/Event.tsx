import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { LaunchTile, Header, Button, Loading } from '../components'
import { RouteComponentProps } from '@reach/router'
import * as GetLaunchListTypes from './__generated__/GetLaunchList'

/*
如何鼓勵user去track event？ie track event的獎勵？

原則
  1. 提供user足夠的資訊去判斷這個event重不重要、值不值得track，eg feeds，歷史類似event，feed熱度, tracker trend
  2. 一旦user認為此event有足夠價值（ie 賺錢機會），想要找投資標的/策略時，需要track才能獲取資訊
  3. track trend可以顯示出此event的重要程度，成為領先指標
  4. track/untrack需要付出一點代價（1日鎖定期），避免指標過度變動

方法
  1. （解鎖）可能影響的股票、如何影響
  2. （解鎖）看世界線、發布世界線（有先進者優勢，可以獲得較高關注&獎勵）
  3. 隨時知道event最新通知=eventsBoard
  4. 早鳥勳章

如何避免頻繁操作track/untrack？
  1. 每次track/untrack需要1天時間才能更動
  2. 有track event上限，最多只能track n個event
*/


export const GET_EVENT = gql`
  query GetEvent($after: String) {
    event {
      id
      slug
      header
      tracked
      trackUpdatedAt
      # 竄升/新入/
      currentState
      tags {
        slug
      }

      trackSeries {
        from
        to
        interval
        values
        markers {
          at
          label
        }
      }
      feedCountSeries {}
      topTickersSeries {}      

      recentFeeds {
        id
        title
        viewdAt # by cache
      }
      
      tickers {
        id
        name
      }

      polls {
        id
        header
        body?
        choices
        hidden
        meVote
        comments {
          id
          body
          hidden
        }
      }

      # 世界線
      posts {
        id
        body
        comments {
          id
          body
        }
      }
      
      # null case?
      parent {
        id
        slug
      }
      children {
        id
        slug
      }
      similarEvents {
        id
        slug
      }
    }
  }
`

interface LaunchesProps extends RouteComponentProps { }

export function Feeds() {
  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery<GetLaunchListTypes.GetLaunchList, GetLaunchListTypes.GetLaunchListVariables>(GET_FEED)

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
