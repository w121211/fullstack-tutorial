/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvent
// ====================================================

export interface GetEvent_event_tickers {
  __typename: "Ticker";
  id: string;
  name: string;
}

export interface GetEvent_event {
  __typename: "Event";
  slug: string;
  header: string;
  tickers: GetEvent_event_tickers[];
}

export interface GetEvent {
  event: GetEvent_event;
}

export interface GetEventVariables {
  id: string;
}
