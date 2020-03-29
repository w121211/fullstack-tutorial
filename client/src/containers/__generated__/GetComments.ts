/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_stats {
  __typename: "Stats";
  nViews: number;
  nVoteUps: number;
  nVoteDowns: number;
}

export interface GetComments_comments {
  __typename: "Comment";
  body: string | null;
  stats: GetComments_comments_stats | null;
}

export interface GetComments {
  comments: GetComments_comments[];
}

export interface GetCommentsVariables {
  feedId: string;
  after?: string | null;
}
