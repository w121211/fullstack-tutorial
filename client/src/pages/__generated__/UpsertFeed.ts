/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertFeed
// ====================================================

export interface UpsertFeed_upsertFeed {
  __typename: "Feed";
  id: string;
}

export interface UpsertFeed {
  upsertFeed: UpsertFeed_upsertFeed;
}

export interface UpsertFeedVariables {
  id?: string | null;
  data: FeedInput;
}
