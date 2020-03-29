/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedTile
// ====================================================

export interface FeedTile_event {
  __typename: "Event";
  id: string | null;
  slug: string;
}

export interface FeedTile_tags {
  __typename: "Tag";
  id: string;
  slug: string;
}

export interface FeedTile_tickers {
  __typename: "Ticker";
  id: string;
  name: string;
}

export interface FeedTile {
  __typename: "Feed";
  id: string;
  header: string;
  event: FeedTile_event | null;
  tags: (FeedTile_tags | null)[] | null;
  tickers: (FeedTile_tickers | null)[] | null;
  updatedAt: any;
}
