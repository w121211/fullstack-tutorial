/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSeq
// ====================================================

export interface GetSeq_seq {
  __typename: "Seq";
  from: any;
  to: any;
  values: string | null;
}

export interface GetSeq {
  seq: GetSeq_seq | null;
}

export interface GetSeqVariables {
  id: string;
  after?: string | null;
}
