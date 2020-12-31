/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchLink
// ====================================================

export interface fetchLink_fetchLink {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  oauthorName: string | null;
}

export interface fetchLink {
  fetchLink: fetchLink_fetchLink;
}

export interface fetchLinkVariables {
  url: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cocard
// ====================================================

export interface cocard_cocard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocard_cocard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: cocard_cocard_comments_replies_count;
}

export interface cocard_cocard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocard_cocard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: cocard_cocard_comments_topReplies_count;
}

export interface cocard_cocard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface cocard_cocard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: cocard_cocard_comments_poll_count;
  createdAt: any;
}

export interface cocard_cocard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocard_cocard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface cocard_cocard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: cocard_cocard_comments_replies[] | null;
  topReplies: cocard_cocard_comments_topReplies[] | null;
  poll: cocard_cocard_comments_poll | null;
  count: cocard_cocard_comments_count;
  meta: cocard_cocard_comments_meta | null;
}

export interface cocard_cocard_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  oauthorName: string | null;
}

export interface cocard_cocard {
  __typename: "Cocard";
  id: string;
  template: CardTemplate;
  comments: cocard_cocard_comments[];
  link: cocard_cocard_link;
}

export interface cocard {
  cocard: cocard_cocard | null;
}

export interface cocardVariables {
  symbolName?: string | null;
  linkUrl?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ocard
// ====================================================

export interface ocard_ocard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocard_ocard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: ocard_ocard_comments_replies_count;
}

export interface ocard_ocard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocard_ocard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: ocard_ocard_comments_topReplies_count;
}

export interface ocard_ocard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface ocard_ocard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: ocard_ocard_comments_poll_count;
  createdAt: any;
}

export interface ocard_ocard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocard_ocard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface ocard_ocard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: ocard_ocard_comments_replies[] | null;
  topReplies: ocard_ocard_comments_topReplies[] | null;
  poll: ocard_ocard_comments_poll | null;
  count: ocard_ocard_comments_count;
  meta: ocard_ocard_comments_meta | null;
}

export interface ocard_ocard_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface ocard_ocard {
  __typename: "Ocard";
  id: string;
  template: CardTemplate;
  comments: ocard_ocard_comments[];
  symbol: ocard_ocard_symbol;
  oauthorName: string;
}

export interface ocard {
  ocard: ocard_ocard | null;
}

export interface ocardVariables {
  id?: string | null;
  oauthorName?: string | null;
  symbolName?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: selfcard
// ====================================================

export interface selfcard_selfcard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcard_selfcard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: selfcard_selfcard_comments_replies_count;
}

export interface selfcard_selfcard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcard_selfcard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: selfcard_selfcard_comments_topReplies_count;
}

export interface selfcard_selfcard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface selfcard_selfcard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: selfcard_selfcard_comments_poll_count;
  createdAt: any;
}

export interface selfcard_selfcard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcard_selfcard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface selfcard_selfcard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: selfcard_selfcard_comments_replies[] | null;
  topReplies: selfcard_selfcard_comments_topReplies[] | null;
  poll: selfcard_selfcard_comments_poll | null;
  count: selfcard_selfcard_comments_count;
  meta: selfcard_selfcard_comments_meta | null;
}

export interface selfcard_selfcard_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface selfcard_selfcard {
  __typename: "Selfcard";
  id: string;
  template: CardTemplate;
  comments: selfcard_selfcard_comments[];
  symbol: selfcard_selfcard_symbol;
}

export interface selfcard {
  selfcard: selfcard_selfcard | null;
}

export interface selfcardVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mycard
// ====================================================

export interface mycard_mycard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface mycard_mycard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: mycard_mycard_comments_replies_count;
}

export interface mycard_mycard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface mycard_mycard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: mycard_mycard_comments_topReplies_count;
}

export interface mycard_mycard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface mycard_mycard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: mycard_mycard_comments_poll_count;
  createdAt: any;
}

export interface mycard_mycard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface mycard_mycard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface mycard_mycard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: mycard_mycard_comments_replies[] | null;
  topReplies: mycard_mycard_comments_topReplies[] | null;
  poll: mycard_mycard_comments_poll | null;
  count: mycard_mycard_comments_count;
  meta: mycard_mycard_comments_meta | null;
}

export interface mycard_mycard_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface mycard_mycard {
  __typename: "Selfcard";
  id: string;
  template: CardTemplate;
  comments: mycard_mycard_comments[];
  symbol: mycard_mycard_symbol;
}

export interface mycard {
  mycard: mycard_mycard | null;
}

export interface mycardVariables {
  symbolName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: comments
// ====================================================

export interface comments_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comments_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: comments_comments_replies_count;
}

export interface comments_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comments_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: comments_comments_topReplies_count;
}

export interface comments_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface comments_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: comments_comments_poll_count;
  createdAt: any;
}

export interface comments_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comments_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface comments_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: comments_comments_replies[] | null;
  topReplies: comments_comments_topReplies[] | null;
  poll: comments_comments_poll | null;
  count: comments_comments_count;
  meta: comments_comments_meta | null;
}

export interface comments {
  comments: comments_comments[];
}

export interface commentsVariables {
  cardId: string;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: commentsBySymbol
// ====================================================

export interface commentsBySymbol_commentsBySymbol_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface commentsBySymbol_commentsBySymbol_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: commentsBySymbol_commentsBySymbol_replies_count;
}

export interface commentsBySymbol_commentsBySymbol_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface commentsBySymbol_commentsBySymbol_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: commentsBySymbol_commentsBySymbol_topReplies_count;
}

export interface commentsBySymbol_commentsBySymbol_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface commentsBySymbol_commentsBySymbol_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: commentsBySymbol_commentsBySymbol_poll_count;
  createdAt: any;
}

export interface commentsBySymbol_commentsBySymbol_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface commentsBySymbol_commentsBySymbol_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface commentsBySymbol_commentsBySymbol {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: commentsBySymbol_commentsBySymbol_replies[] | null;
  topReplies: commentsBySymbol_commentsBySymbol_topReplies[] | null;
  poll: commentsBySymbol_commentsBySymbol_poll | null;
  count: commentsBySymbol_commentsBySymbol_count;
  meta: commentsBySymbol_commentsBySymbol_meta | null;
}

export interface commentsBySymbol {
  commentsBySymbol: commentsBySymbol_commentsBySymbol[];
}

export interface commentsBySymbolVariables {
  pageTitle: string;
  symbol: string;
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
  isTop: boolean | null;
  text: string;
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
// GraphQL query operation: searchAll
// ====================================================

export interface searchAll {
  searchAll: string[];
}

export interface searchAllVariables {
  term: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: automark
// ====================================================

export interface automark {
  automark: string;
}

export interface automarkVariables {
  text: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createMycard
// ====================================================

export interface createMycard_createMycard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createMycard_createMycard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createMycard_createMycard_comments_replies_count;
}

export interface createMycard_createMycard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createMycard_createMycard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createMycard_createMycard_comments_topReplies_count;
}

export interface createMycard_createMycard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface createMycard_createMycard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: createMycard_createMycard_comments_poll_count;
  createdAt: any;
}

export interface createMycard_createMycard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createMycard_createMycard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface createMycard_createMycard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: createMycard_createMycard_comments_replies[] | null;
  topReplies: createMycard_createMycard_comments_topReplies[] | null;
  poll: createMycard_createMycard_comments_poll | null;
  count: createMycard_createMycard_comments_count;
  meta: createMycard_createMycard_comments_meta | null;
}

export interface createMycard_createMycard_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface createMycard_createMycard {
  __typename: "Selfcard";
  id: string;
  template: CardTemplate;
  comments: createMycard_createMycard_comments[];
  symbol: createMycard_createMycard_symbol;
}

export interface createMycard {
  createMycard: createMycard_createMycard;
}

export interface createMycardVariables {
  symbolName: string;
  data: CommentInput[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createOcard
// ====================================================

export interface createOcard_createOcard_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createOcard_createOcard_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createOcard_createOcard_comments_replies_count;
}

export interface createOcard_createOcard_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createOcard_createOcard_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createOcard_createOcard_comments_topReplies_count;
}

export interface createOcard_createOcard_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface createOcard_createOcard_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: createOcard_createOcard_comments_poll_count;
  createdAt: any;
}

export interface createOcard_createOcard_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createOcard_createOcard_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface createOcard_createOcard_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: createOcard_createOcard_comments_replies[] | null;
  topReplies: createOcard_createOcard_comments_topReplies[] | null;
  poll: createOcard_createOcard_comments_poll | null;
  count: createOcard_createOcard_comments_count;
  meta: createOcard_createOcard_comments_meta | null;
}

export interface createOcard_createOcard_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface createOcard_createOcard {
  __typename: "Ocard";
  id: string;
  template: CardTemplate;
  comments: createOcard_createOcard_comments[];
  symbol: createOcard_createOcard_symbol;
  oauthorName: string;
}

export interface createOcard {
  createOcard: createOcard_createOcard;
}

export interface createOcardVariables {
  symbolName: string;
  oauthorName: string;
  data: CommentInput[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComments
// ====================================================

export interface createComments_createComments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComments_createComments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createComments_createComments_replies_count;
}

export interface createComments_createComments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComments_createComments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createComments_createComments_topReplies_count;
}

export interface createComments_createComments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface createComments_createComments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: createComments_createComments_poll_count;
  createdAt: any;
}

export interface createComments_createComments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComments_createComments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface createComments_createComments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: createComments_createComments_replies[] | null;
  topReplies: createComments_createComments_topReplies[] | null;
  poll: createComments_createComments_poll | null;
  count: createComments_createComments_count;
  meta: createComments_createComments_meta | null;
}

export interface createComments {
  createComments: createComments_createComments[];
}

export interface createCommentsVariables {
  cardId: string;
  cardType: string;
  data: CommentInput[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComment_createComment_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createComment_createComment_replies_count;
}

export interface createComment_createComment_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComment_createComment_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createComment_createComment_topReplies_count;
}

export interface createComment_createComment_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface createComment_createComment_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: createComment_createComment_poll_count;
  createdAt: any;
}

export interface createComment_createComment_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createComment_createComment_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface createComment_createComment {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: createComment_createComment_replies[] | null;
  topReplies: createComment_createComment_topReplies[] | null;
  poll: createComment_createComment_poll | null;
  count: createComment_createComment_count;
  meta: createComment_createComment_meta | null;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  cardId: string;
  cardType: string;
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
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: createReply_createReply_count;
}

export interface createReply {
  createReply: createReply_createReply;
}

export interface createReplyVariables {
  commentId: string;
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
// GraphQL mutation operation: createReplyLike
// ====================================================

export interface createReplyLike_createReplyLike_like {
  __typename: "ReplyLike";
  id: string;
  replyId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface createReplyLike_createReplyLike_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface createReplyLike_createReplyLike {
  __typename: "ReplyLikeResonse";
  like: createReplyLike_createReplyLike_like;
  count: createReplyLike_createReplyLike_count;
}

export interface createReplyLike {
  createReplyLike: createReplyLike_createReplyLike;
}

export interface createReplyLikeVariables {
  replyId: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateReplyLike
// ====================================================

export interface updateReplyLike_updateReplyLike_like {
  __typename: "ReplyLike";
  id: string;
  replyId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface updateReplyLike_updateReplyLike_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface updateReplyLike_updateReplyLike {
  __typename: "ReplyLikeResonse";
  like: updateReplyLike_updateReplyLike_like;
  count: updateReplyLike_updateReplyLike_count;
}

export interface updateReplyLike {
  updateReplyLike: updateReplyLike_updateReplyLike;
}

export interface updateReplyLikeVariables {
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
// GraphQL fragment: poll
// ====================================================

export interface poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: poll_count;
  createdAt: any;
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
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: reply_count;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: comment
// ====================================================

export interface comment_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comment_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: comment_replies_count;
}

export interface comment_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comment_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: comment_topReplies_count;
}

export interface comment_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface comment_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: comment_poll_count;
  createdAt: any;
}

export interface comment_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface comment_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface comment {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: comment_replies[] | null;
  topReplies: comment_topReplies[] | null;
  poll: comment_poll | null;
  count: comment_count;
  meta: comment_meta | null;
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
// GraphQL fragment: linkFragment
// ====================================================

export interface linkFragment {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  oauthorName: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: cocardFragment
// ====================================================

export interface cocardFragment_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocardFragment_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: cocardFragment_comments_replies_count;
}

export interface cocardFragment_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocardFragment_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: cocardFragment_comments_topReplies_count;
}

export interface cocardFragment_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface cocardFragment_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: cocardFragment_comments_poll_count;
  createdAt: any;
}

export interface cocardFragment_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface cocardFragment_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface cocardFragment_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: cocardFragment_comments_replies[] | null;
  topReplies: cocardFragment_comments_topReplies[] | null;
  poll: cocardFragment_comments_poll | null;
  count: cocardFragment_comments_count;
  meta: cocardFragment_comments_meta | null;
}

export interface cocardFragment_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  oauthorName: string | null;
}

export interface cocardFragment {
  __typename: "Cocard";
  id: string;
  template: CardTemplate;
  comments: cocardFragment_comments[];
  link: cocardFragment_link;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ocardFragment
// ====================================================

export interface ocardFragment_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocardFragment_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: ocardFragment_comments_replies_count;
}

export interface ocardFragment_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocardFragment_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: ocardFragment_comments_topReplies_count;
}

export interface ocardFragment_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface ocardFragment_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: ocardFragment_comments_poll_count;
  createdAt: any;
}

export interface ocardFragment_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface ocardFragment_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface ocardFragment_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: ocardFragment_comments_replies[] | null;
  topReplies: ocardFragment_comments_topReplies[] | null;
  poll: ocardFragment_comments_poll | null;
  count: ocardFragment_comments_count;
  meta: ocardFragment_comments_meta | null;
}

export interface ocardFragment_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface ocardFragment {
  __typename: "Ocard";
  id: string;
  template: CardTemplate;
  comments: ocardFragment_comments[];
  symbol: ocardFragment_symbol;
  oauthorName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: selfcardFragment
// ====================================================

export interface selfcardFragment_comments_replies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcardFragment_comments_replies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: selfcardFragment_comments_replies_count;
}

export interface selfcardFragment_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcardFragment_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: selfcardFragment_comments_topReplies_count;
}

export interface selfcardFragment_comments_poll_count {
  __typename: "PollCount";
  nVotes: number[];
}

export interface selfcardFragment_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  count: selfcardFragment_comments_poll_count;
  createdAt: any;
}

export interface selfcardFragment_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface selfcardFragment_comments_meta {
  __typename: "CommentMeta";
  seq: number | null;
  mark: string | null;
  src: string | null;
}

export interface selfcardFragment_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  cocardId: number | null;
  ocardId: number | null;
  selfcardId: number | null;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  replies: selfcardFragment_comments_replies[] | null;
  topReplies: selfcardFragment_comments_topReplies[] | null;
  poll: selfcardFragment_comments_poll | null;
  count: selfcardFragment_comments_count;
  meta: selfcardFragment_comments_meta | null;
}

export interface selfcardFragment_symbol {
  __typename: "Symbol";
  name: string;
  cat: SymbolCat;
}

export interface selfcardFragment {
  __typename: "Selfcard";
  id: string;
  template: CardTemplate;
  comments: selfcardFragment_comments[];
  symbol: selfcardFragment_symbol;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CardTemplate {
  TICKER = "TICKER",
  WEBPAGE = "WEBPAGE",
}

export enum LikeChoice {
  DOWN = "DOWN",
  NEUTRAL = "NEUTRAL",
  UP = "UP",
}

export enum SymbolCat {
  EVENT = "EVENT",
  SYS_TICKER_FOLLOWERS = "SYS_TICKER_FOLLOWERS",
  TAG = "TAG",
  TICKER = "TICKER",
}

export interface CommentInput {
  mark: string;
  src?: string | null;
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
