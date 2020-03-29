/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedDetail
// ====================================================

export interface FeedDetail_feed_event {
  __typename: "Event";
  id: string | null;
  slug: string;
}

export interface FeedDetail_feed_tags {
  __typename: "Tag";
  id: string;
  slug: string;
}

export interface FeedDetail_feed_tickers {
  __typename: "Ticker";
  id: string;
  name: string;
}

export interface FeedDetail_feed_comments {
  __typename: "Comment";
  id: string;
}

export interface FeedDetail_feed_stats {
  __typename: "Stats";
  nViews: number;
  nVoteUps: number;
  nVoteDowns: number;
}

export interface FeedDetail_feed {
  __typename: "Feed";
  id: string;
  header: string;
  event: FeedDetail_feed_event | null;
  tags: (FeedDetail_feed_tags | null)[] | null;
  tickers: (FeedDetail_feed_tickers | null)[] | null;
  updatedAt: any;
  body: string | null;
  comments: (FeedDetail_feed_comments | null)[] | null;
  stats: FeedDetail_feed_stats;
}

export interface FeedDetail {
  feed: FeedDetail_feed;
}

export interface FeedDetailVariables {
  id: string;
}
