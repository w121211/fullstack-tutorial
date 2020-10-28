/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: block
// ====================================================

export interface block_block_props_commentIntro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_props_commentIntro {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_props_commentIntro_count;
}

export interface block_block_props_commentSymbols_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_props_commentSymbols {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_props_commentSymbols_count;
}

export interface block_block_props {
  __typename: "BlockProperties";
  name: string | null;
  longName: string | null;
  path: string | null;
  symbol: string | null;
  canComment: boolean | null;
  canOpenAsPage: boolean | null;
  commentIntro: block_block_props_commentIntro | null;
  commentSymbols: block_block_props_commentSymbols | null;
}

export interface block_block_body_ticks {
  __typename: "Tick";
  id: string;
  symbolId: string;
  value: number;
  at: any;
}

export interface block_block_body_blocks_props_commentIntro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_body_blocks_props_commentIntro {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_body_blocks_props_commentIntro_count;
}

export interface block_block_body_blocks_props_commentSymbols_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_body_blocks_props_commentSymbols {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_body_blocks_props_commentSymbols_count;
}

export interface block_block_body_blocks_props {
  __typename: "BlockProperties";
  name: string | null;
  longName: string | null;
  path: string | null;
  symbol: string | null;
  canComment: boolean | null;
  canOpenAsPage: boolean | null;
  commentIntro: block_block_body_blocks_props_commentIntro | null;
  commentSymbols: block_block_body_blocks_props_commentSymbols | null;
}

export interface block_block_body_blocks_body_ticks {
  __typename: "Tick";
  id: string;
  symbolId: string;
  value: number;
  at: any;
}

export interface block_block_body_blocks_body {
  __typename: "BlockBody";
  text: string | null;
  ticks: block_block_body_blocks_body_ticks[] | null;
  table: (number | null)[] | null;
  chart: (number | null)[] | null;
}

export interface block_block_body_blocks_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_body_blocks_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_body_blocks_comments_count;
}

export interface block_block_body_blocks {
  __typename: "Block";
  id: string;
  props: block_block_body_blocks_props;
  body: block_block_body_blocks_body;
  comments: block_block_body_blocks_comments[] | null;
}

export interface block_block_body {
  __typename: "BlockBody";
  text: string | null;
  ticks: block_block_body_ticks[] | null;
  table: (number | null)[] | null;
  chart: (number | null)[] | null;
  blocks: (block_block_body_blocks | null)[] | null;
}

export interface block_block_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface block_block_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: block_block_comments_count;
}

export interface block_block {
  __typename: "Block";
  id: string;
  props: block_block_props;
  body: block_block_body;
  comments: block_block_comments[] | null;
}

export interface block {
  block: block_block;
}

export interface blockVariables {
  id?: string | null;
  path?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: comments
// ====================================================

export interface comments_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comments_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: comments_comments_count;
}

export interface comments {
  comments: comments_comments[];
}

export interface commentsVariables {
  blockId: string;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: replies
// ====================================================

export interface replies_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface replies_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: replies_replies_count;
}

export interface replies {
  replies: replies_replies[];
}

export interface repliesVariables {
  commentId: string;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myCommentLikes
// ====================================================

export interface myCommentLikes_myCommentLikes {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface myCommentLikes {
  myCommentLikes: myCommentLikes_myCommentLikes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myReplyLikes
// ====================================================

export interface myReplyLikes_myReplyLikes {
  __typename: "ReplyLike";
  id: string;
  replyId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface myReplyLikes {
  myReplyLikes: myReplyLikes_myReplyLikes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myVotes
// ====================================================

export interface myVotes_myVotes {
  __typename: "Vote";
  id: string;
  pollId: string;
  choiceIdx: number;
}

export interface myVotes {
  myVotes: myVotes_myVotes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsUserLoggedIn
// ====================================================

export interface IsUserLoggedIn {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  __typename: "User";
  id: string;
}

export interface me {
  me: me_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComment_createComment {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: createComment_createComment_count;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  blockId: string;
  data: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createReply
// ====================================================

export interface createReply_createReply_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createReply_createReply {
  __typename: "Reply";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: createReply_createReply_count;
}

export interface createReply {
  createReply: createReply_createReply;
}

export interface createReplyVariables {
  replyId: string;
  data: ReplyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createVote
// ====================================================

export interface createVote_createVote {
  __typename: "Vote";
  id: string;
  pollId: string;
  choiceIdx: number;
}

export interface createVote {
  createVote: createVote_createVote;
}

export interface createVoteVariables {
  pollId: string;
  choiceIdx: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCommentLike
// ====================================================

export interface createCommentLike_createCommentLike_like {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface createCommentLike_createCommentLike_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createCommentLike_createCommentLike {
  __typename: "CommentLikeResonse";
  like: createCommentLike_createCommentLike_like;
  count: createCommentLike_createCommentLike_count;
}

export interface createCommentLike {
  createCommentLike: createCommentLike_createCommentLike;
}

export interface createCommentLikeVariables {
  commentId: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCommentLike
// ====================================================

export interface updateCommentLike_updateCommentLike_like {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface updateCommentLike_updateCommentLike_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface updateCommentLike_updateCommentLike {
  __typename: "CommentLikeResonse";
  like: updateCommentLike_updateCommentLike_like;
  count: updateCommentLike_updateCommentLike_count;
}

export interface updateCommentLike {
  updateCommentLike: updateCommentLike_updateCommentLike;
}

export interface updateCommentLikeVariables {
  id: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_user {
  __typename: "User";
  id: string;
}

export interface signup_signup {
  __typename: "AuthPayload";
  token: string;
  user: signup_signup_user;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  __typename: "User";
  id: string;
}

export interface login_login {
  __typename: "AuthPayload";
  token: string;
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: vote
// ====================================================

export interface vote {
  __typename: "Vote";
  id: string;
  pollId: string;
  choiceIdx: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: replyCount
// ====================================================

export interface replyCount {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: reply
// ====================================================

export interface reply_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface reply {
  __typename: "Reply";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: reply_count;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commentCount
// ====================================================

export interface commentCount {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: comment
// ====================================================

export interface comment_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comment {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: comment_count;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commentLike
// ====================================================

export interface commentLike {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: replyLike
// ====================================================

export interface replyLike {
  __typename: "ReplyLike";
  id: string;
  replyId: string;
  choice: LikeChoice;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: blockFragment
// ====================================================

export interface blockFragment_props_commentIntro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface blockFragment_props_commentIntro {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: blockFragment_props_commentIntro_count;
}

export interface blockFragment_props_commentSymbols_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface blockFragment_props_commentSymbols {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: blockFragment_props_commentSymbols_count;
}

export interface blockFragment_props {
  __typename: "BlockProperties";
  name: string | null;
  longName: string | null;
  path: string | null;
  symbol: string | null;
  canComment: boolean | null;
  canOpenAsPage: boolean | null;
  commentIntro: blockFragment_props_commentIntro | null;
  commentSymbols: blockFragment_props_commentSymbols | null;
}

export interface blockFragment_body_ticks {
  __typename: "Tick";
  id: string;
  symbolId: string;
  value: number;
  at: any;
}

export interface blockFragment_body {
  __typename: "BlockBody";
  text: string | null;
  ticks: blockFragment_body_ticks[] | null;
  table: (number | null)[] | null;
  chart: (number | null)[] | null;
}

export interface blockFragment_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface blockFragment_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isSpot: boolean | null;
  text: string | null;
  updatedAt: any;
  count: blockFragment_comments_count;
}

export interface blockFragment {
  __typename: "Block";
  id: string;
  props: blockFragment_props;
  body: blockFragment_body;
  comments: blockFragment_comments[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CommentCat {
  POLL = "POLL",
  PROP = "PROP",
  TEXT = "TEXT",
}

export enum LikeChoice {
  DOWN = "DOWN",
  NEUTRAL = "NEUTRAL",
  UP = "UP",
}

export interface CommentInput {
  cat: CommentCat;
  symbols: string[];
  text: string;
  poll?: PollInput | null;
}

export interface LikeInput {
  choice: LikeChoice;
}

export interface PollInput {
  choices: string[];
}

export interface ReplyInput {
  text: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
