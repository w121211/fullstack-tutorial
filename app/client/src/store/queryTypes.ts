/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: page
// ====================================================

export interface page_page_props_tickers_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_tickers_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_tickers_topReplies_count;
}

export interface page_page_props_tickers_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_tickers_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_tickers {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_tickers_topReplies[] | null;
  poll: page_page_props_tickers_poll | null;
  count: page_page_props_tickers_count;
}

export interface page_page_props_topics_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_topics_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_topics_topReplies_count;
}

export interface page_page_props_topics_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_topics_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_topics {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_topics_topReplies[] | null;
  poll: page_page_props_topics_poll | null;
  count: page_page_props_topics_count;
}

export interface page_page_props_links_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_links_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_links_topReplies_count;
}

export interface page_page_props_links_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_links_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_links {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_links_topReplies[] | null;
  poll: page_page_props_links_poll | null;
  count: page_page_props_links_count;
}

export interface page_page_props_pros_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_pros_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_pros_topReplies_count;
}

export interface page_page_props_pros_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_pros_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_pros {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_pros_topReplies[] | null;
  poll: page_page_props_pros_poll | null;
  count: page_page_props_pros_count;
}

export interface page_page_props_cons_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_cons_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_cons_topReplies_count;
}

export interface page_page_props_cons_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_cons_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_cons {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_cons_topReplies[] | null;
  poll: page_page_props_cons_poll | null;
  count: page_page_props_cons_count;
}

export interface page_page_props_act_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_act_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_act_topReplies_count;
}

export interface page_page_props_act_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_act_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_act {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_act_topReplies[] | null;
  poll: page_page_props_act_poll | null;
  count: page_page_props_act_count;
}

export interface page_page_props_intro_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_intro_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_intro_topReplies_count;
}

export interface page_page_props_intro_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_intro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_intro {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_intro_topReplies[] | null;
  poll: page_page_props_intro_poll | null;
  count: page_page_props_intro_count;
}

export interface page_page_props_shortView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_shortView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_shortView_topReplies_count;
}

export interface page_page_props_shortView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_shortView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_shortView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_shortView_topReplies[] | null;
  poll: page_page_props_shortView_poll | null;
  count: page_page_props_shortView_count;
}

export interface page_page_props_longView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_longView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_longView_topReplies_count;
}

export interface page_page_props_longView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_longView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_longView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_longView_topReplies[] | null;
  poll: page_page_props_longView_poll | null;
  count: page_page_props_longView_count;
}

export interface page_page_props_voteCreate_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_voteCreate_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_props_voteCreate_topReplies_count;
}

export interface page_page_props_voteCreate_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_props_voteCreate_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_props_voteCreate {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_props_voteCreate_topReplies[] | null;
  poll: page_page_props_voteCreate_poll | null;
  count: page_page_props_voteCreate_count;
}

export interface page_page_props {
  __typename: "PageProps";
  selfSymbol: string | null;
  tickers: page_page_props_tickers | null;
  topics: page_page_props_topics | null;
  links: page_page_props_links | null;
  pros: page_page_props_pros | null;
  cons: page_page_props_cons | null;
  act: page_page_props_act | null;
  wiki: string | null;
  intro: page_page_props_intro | null;
  shortView: page_page_props_shortView | null;
  longView: page_page_props_longView | null;
  srcAuthor: string | null;
  srcTitle: string | null;
  voteCreate: page_page_props_voteCreate | null;
}

export interface page_page_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: page_page_comments_topReplies_count;
}

export interface page_page_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface page_page_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface page_page_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: page_page_comments_topReplies[] | null;
  poll: page_page_comments_poll | null;
  count: page_page_comments_count;
}

export interface page_page_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  contentAuthorId: string | null;
}

export interface page_page {
  __typename: "Page";
  id: string;
  title: string;
  template: string;
  props: page_page_props;
  comments: page_page_comments[] | null;
  link: page_page_link | null;
}

export interface page {
  page: page_page | null;
}

export interface pageVariables {
  id?: string | null;
  title?: string | null;
  symbolName?: string | null;
  symbolId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: comments
// ====================================================

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

export interface comments_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

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
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: comments_comments_topReplies[] | null;
  poll: comments_comments_poll | null;
  count: comments_comments_count;
}

export interface comments {
  comments: comments_comments[];
}

export interface commentsVariables {
  pageId: string;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: commentsBySymbol
// ====================================================

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

export interface commentsBySymbol_commentsBySymbol_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface commentsBySymbol_commentsBySymbol_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface commentsBySymbol_commentsBySymbol {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: commentsBySymbol_commentsBySymbol_topReplies[] | null;
  poll: commentsBySymbol_commentsBySymbol_poll | null;
  count: commentsBySymbol_commentsBySymbol_count;
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
// GraphQL query operation: latestPages
// ====================================================

export interface latestPages_latestPages_props_tickers_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_tickers_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_tickers_topReplies_count;
}

export interface latestPages_latestPages_props_tickers_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_tickers_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_tickers {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_tickers_topReplies[] | null;
  poll: latestPages_latestPages_props_tickers_poll | null;
  count: latestPages_latestPages_props_tickers_count;
}

export interface latestPages_latestPages_props_topics_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_topics_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_topics_topReplies_count;
}

export interface latestPages_latestPages_props_topics_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_topics_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_topics {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_topics_topReplies[] | null;
  poll: latestPages_latestPages_props_topics_poll | null;
  count: latestPages_latestPages_props_topics_count;
}

export interface latestPages_latestPages_props_links_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_links_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_links_topReplies_count;
}

export interface latestPages_latestPages_props_links_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_links_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_links {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_links_topReplies[] | null;
  poll: latestPages_latestPages_props_links_poll | null;
  count: latestPages_latestPages_props_links_count;
}

export interface latestPages_latestPages_props_pros_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_pros_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_pros_topReplies_count;
}

export interface latestPages_latestPages_props_pros_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_pros_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_pros {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_pros_topReplies[] | null;
  poll: latestPages_latestPages_props_pros_poll | null;
  count: latestPages_latestPages_props_pros_count;
}

export interface latestPages_latestPages_props_cons_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_cons_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_cons_topReplies_count;
}

export interface latestPages_latestPages_props_cons_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_cons_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_cons {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_cons_topReplies[] | null;
  poll: latestPages_latestPages_props_cons_poll | null;
  count: latestPages_latestPages_props_cons_count;
}

export interface latestPages_latestPages_props_act_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_act_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_act_topReplies_count;
}

export interface latestPages_latestPages_props_act_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_act_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_act {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_act_topReplies[] | null;
  poll: latestPages_latestPages_props_act_poll | null;
  count: latestPages_latestPages_props_act_count;
}

export interface latestPages_latestPages_props_intro_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_intro_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_intro_topReplies_count;
}

export interface latestPages_latestPages_props_intro_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_intro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_intro {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_intro_topReplies[] | null;
  poll: latestPages_latestPages_props_intro_poll | null;
  count: latestPages_latestPages_props_intro_count;
}

export interface latestPages_latestPages_props_shortView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_shortView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_shortView_topReplies_count;
}

export interface latestPages_latestPages_props_shortView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_shortView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_shortView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_shortView_topReplies[] | null;
  poll: latestPages_latestPages_props_shortView_poll | null;
  count: latestPages_latestPages_props_shortView_count;
}

export interface latestPages_latestPages_props_longView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_longView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_longView_topReplies_count;
}

export interface latestPages_latestPages_props_longView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_longView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_longView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_longView_topReplies[] | null;
  poll: latestPages_latestPages_props_longView_poll | null;
  count: latestPages_latestPages_props_longView_count;
}

export interface latestPages_latestPages_props_voteCreate_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_voteCreate_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_props_voteCreate_topReplies_count;
}

export interface latestPages_latestPages_props_voteCreate_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_props_voteCreate_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_props_voteCreate {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_props_voteCreate_topReplies[] | null;
  poll: latestPages_latestPages_props_voteCreate_poll | null;
  count: latestPages_latestPages_props_voteCreate_count;
}

export interface latestPages_latestPages_props {
  __typename: "PageProps";
  selfSymbol: string | null;
  tickers: latestPages_latestPages_props_tickers | null;
  topics: latestPages_latestPages_props_topics | null;
  links: latestPages_latestPages_props_links | null;
  pros: latestPages_latestPages_props_pros | null;
  cons: latestPages_latestPages_props_cons | null;
  act: latestPages_latestPages_props_act | null;
  wiki: string | null;
  intro: latestPages_latestPages_props_intro | null;
  shortView: latestPages_latestPages_props_shortView | null;
  longView: latestPages_latestPages_props_longView | null;
  srcAuthor: string | null;
  srcTitle: string | null;
  voteCreate: latestPages_latestPages_props_voteCreate | null;
}

export interface latestPages_latestPages_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: latestPages_latestPages_comments_topReplies_count;
}

export interface latestPages_latestPages_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface latestPages_latestPages_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface latestPages_latestPages_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: latestPages_latestPages_comments_topReplies[] | null;
  poll: latestPages_latestPages_comments_poll | null;
  count: latestPages_latestPages_comments_count;
}

export interface latestPages_latestPages_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  contentAuthorId: string | null;
}

export interface latestPages_latestPages {
  __typename: "Page";
  id: string;
  title: string;
  template: string;
  props: latestPages_latestPages_props;
  comments: latestPages_latestPages_comments[] | null;
  link: latestPages_latestPages_link | null;
}

export interface latestPages {
  latestPages: latestPages_latestPages[];
}

export interface latestPagesVariables {
  afterId?: string | null;
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
// GraphQL query operation: searchPage
// ====================================================

export interface searchPage_searchPage_props_tickers_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_tickers_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_tickers_topReplies_count;
}

export interface searchPage_searchPage_props_tickers_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_tickers_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_tickers {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_tickers_topReplies[] | null;
  poll: searchPage_searchPage_props_tickers_poll | null;
  count: searchPage_searchPage_props_tickers_count;
}

export interface searchPage_searchPage_props_topics_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_topics_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_topics_topReplies_count;
}

export interface searchPage_searchPage_props_topics_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_topics_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_topics {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_topics_topReplies[] | null;
  poll: searchPage_searchPage_props_topics_poll | null;
  count: searchPage_searchPage_props_topics_count;
}

export interface searchPage_searchPage_props_links_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_links_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_links_topReplies_count;
}

export interface searchPage_searchPage_props_links_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_links_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_links {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_links_topReplies[] | null;
  poll: searchPage_searchPage_props_links_poll | null;
  count: searchPage_searchPage_props_links_count;
}

export interface searchPage_searchPage_props_pros_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_pros_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_pros_topReplies_count;
}

export interface searchPage_searchPage_props_pros_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_pros_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_pros {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_pros_topReplies[] | null;
  poll: searchPage_searchPage_props_pros_poll | null;
  count: searchPage_searchPage_props_pros_count;
}

export interface searchPage_searchPage_props_cons_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_cons_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_cons_topReplies_count;
}

export interface searchPage_searchPage_props_cons_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_cons_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_cons {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_cons_topReplies[] | null;
  poll: searchPage_searchPage_props_cons_poll | null;
  count: searchPage_searchPage_props_cons_count;
}

export interface searchPage_searchPage_props_act_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_act_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_act_topReplies_count;
}

export interface searchPage_searchPage_props_act_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_act_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_act {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_act_topReplies[] | null;
  poll: searchPage_searchPage_props_act_poll | null;
  count: searchPage_searchPage_props_act_count;
}

export interface searchPage_searchPage_props_intro_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_intro_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_intro_topReplies_count;
}

export interface searchPage_searchPage_props_intro_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_intro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_intro {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_intro_topReplies[] | null;
  poll: searchPage_searchPage_props_intro_poll | null;
  count: searchPage_searchPage_props_intro_count;
}

export interface searchPage_searchPage_props_shortView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_shortView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_shortView_topReplies_count;
}

export interface searchPage_searchPage_props_shortView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_shortView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_shortView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_shortView_topReplies[] | null;
  poll: searchPage_searchPage_props_shortView_poll | null;
  count: searchPage_searchPage_props_shortView_count;
}

export interface searchPage_searchPage_props_longView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_longView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_longView_topReplies_count;
}

export interface searchPage_searchPage_props_longView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_longView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_longView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_longView_topReplies[] | null;
  poll: searchPage_searchPage_props_longView_poll | null;
  count: searchPage_searchPage_props_longView_count;
}

export interface searchPage_searchPage_props_voteCreate_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_voteCreate_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_props_voteCreate_topReplies_count;
}

export interface searchPage_searchPage_props_voteCreate_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_props_voteCreate_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_props_voteCreate {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_props_voteCreate_topReplies[] | null;
  poll: searchPage_searchPage_props_voteCreate_poll | null;
  count: searchPage_searchPage_props_voteCreate_count;
}

export interface searchPage_searchPage_props {
  __typename: "PageProps";
  selfSymbol: string | null;
  tickers: searchPage_searchPage_props_tickers | null;
  topics: searchPage_searchPage_props_topics | null;
  links: searchPage_searchPage_props_links | null;
  pros: searchPage_searchPage_props_pros | null;
  cons: searchPage_searchPage_props_cons | null;
  act: searchPage_searchPage_props_act | null;
  wiki: string | null;
  intro: searchPage_searchPage_props_intro | null;
  shortView: searchPage_searchPage_props_shortView | null;
  longView: searchPage_searchPage_props_longView | null;
  srcAuthor: string | null;
  srcTitle: string | null;
  voteCreate: searchPage_searchPage_props_voteCreate | null;
}

export interface searchPage_searchPage_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: searchPage_searchPage_comments_topReplies_count;
}

export interface searchPage_searchPage_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface searchPage_searchPage_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface searchPage_searchPage_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: searchPage_searchPage_comments_topReplies[] | null;
  poll: searchPage_searchPage_comments_poll | null;
  count: searchPage_searchPage_comments_count;
}

export interface searchPage_searchPage_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  contentAuthorId: string | null;
}

export interface searchPage_searchPage {
  __typename: "Page";
  id: string;
  title: string;
  template: string;
  props: searchPage_searchPage_props;
  comments: searchPage_searchPage_comments[] | null;
  link: searchPage_searchPage_link | null;
}

export interface searchPage {
  searchPage: searchPage_searchPage | null;
}

export interface searchPageVariables {
  url: string;
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
// GraphQL mutation operation: createComment
// ====================================================

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

export interface createComment_createComment_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

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
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: createComment_createComment_topReplies[] | null;
  poll: createComment_createComment_poll | null;
  count: createComment_createComment_count;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  pageId: string;
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

export interface poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
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

export interface comment_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

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
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: comment_topReplies[] | null;
  poll: comment_poll | null;
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
// GraphQL fragment: pageFragment
// ====================================================

export interface pageFragment_props_tickers_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_tickers_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_tickers_topReplies_count;
}

export interface pageFragment_props_tickers_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_tickers_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_tickers {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_tickers_topReplies[] | null;
  poll: pageFragment_props_tickers_poll | null;
  count: pageFragment_props_tickers_count;
}

export interface pageFragment_props_topics_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_topics_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_topics_topReplies_count;
}

export interface pageFragment_props_topics_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_topics_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_topics {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_topics_topReplies[] | null;
  poll: pageFragment_props_topics_poll | null;
  count: pageFragment_props_topics_count;
}

export interface pageFragment_props_links_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_links_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_links_topReplies_count;
}

export interface pageFragment_props_links_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_links_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_links {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_links_topReplies[] | null;
  poll: pageFragment_props_links_poll | null;
  count: pageFragment_props_links_count;
}

export interface pageFragment_props_pros_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_pros_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_pros_topReplies_count;
}

export interface pageFragment_props_pros_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_pros_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_pros {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_pros_topReplies[] | null;
  poll: pageFragment_props_pros_poll | null;
  count: pageFragment_props_pros_count;
}

export interface pageFragment_props_cons_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_cons_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_cons_topReplies_count;
}

export interface pageFragment_props_cons_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_cons_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_cons {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_cons_topReplies[] | null;
  poll: pageFragment_props_cons_poll | null;
  count: pageFragment_props_cons_count;
}

export interface pageFragment_props_act_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_act_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_act_topReplies_count;
}

export interface pageFragment_props_act_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_act_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_act {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_act_topReplies[] | null;
  poll: pageFragment_props_act_poll | null;
  count: pageFragment_props_act_count;
}

export interface pageFragment_props_intro_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_intro_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_intro_topReplies_count;
}

export interface pageFragment_props_intro_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_intro_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_intro {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_intro_topReplies[] | null;
  poll: pageFragment_props_intro_poll | null;
  count: pageFragment_props_intro_count;
}

export interface pageFragment_props_shortView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_shortView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_shortView_topReplies_count;
}

export interface pageFragment_props_shortView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_shortView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_shortView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_shortView_topReplies[] | null;
  poll: pageFragment_props_shortView_poll | null;
  count: pageFragment_props_shortView_count;
}

export interface pageFragment_props_longView_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_longView_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_longView_topReplies_count;
}

export interface pageFragment_props_longView_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_longView_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_longView {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_longView_topReplies[] | null;
  poll: pageFragment_props_longView_poll | null;
  count: pageFragment_props_longView_count;
}

export interface pageFragment_props_voteCreate_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_voteCreate_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_props_voteCreate_topReplies_count;
}

export interface pageFragment_props_voteCreate_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_props_voteCreate_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_props_voteCreate {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_props_voteCreate_topReplies[] | null;
  poll: pageFragment_props_voteCreate_poll | null;
  count: pageFragment_props_voteCreate_count;
}

export interface pageFragment_props {
  __typename: "PageProps";
  selfSymbol: string | null;
  tickers: pageFragment_props_tickers | null;
  topics: pageFragment_props_topics | null;
  links: pageFragment_props_links | null;
  pros: pageFragment_props_pros | null;
  cons: pageFragment_props_cons | null;
  act: pageFragment_props_act | null;
  wiki: string | null;
  intro: pageFragment_props_intro | null;
  shortView: pageFragment_props_shortView | null;
  longView: pageFragment_props_longView | null;
  srcAuthor: string | null;
  srcTitle: string | null;
  voteCreate: pageFragment_props_voteCreate | null;
}

export interface pageFragment_comments_topReplies_count {
  __typename: "ReplyCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_comments_topReplies {
  __typename: "Reply";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string;
  updatedAt: any;
  count: pageFragment_comments_topReplies_count;
}

export interface pageFragment_comments_poll {
  __typename: "Poll";
  id: string;
  commentId: string;
  choices: string[];
  nVotes: number[];
  createdAt: any;
}

export interface pageFragment_comments_count {
  __typename: "CommentCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
}

export interface pageFragment_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  isTop: boolean | null;
  text: string | null;
  createdAt: any;
  topReplies: pageFragment_comments_topReplies[] | null;
  poll: pageFragment_comments_poll | null;
  count: pageFragment_comments_count;
}

export interface pageFragment_link {
  __typename: "Link";
  id: string;
  url: string;
  domain: string;
  contentType: string;
  contentId: string | null;
  contentAuthorId: string | null;
}

export interface pageFragment {
  __typename: "Page";
  id: string;
  title: string;
  template: string;
  props: pageFragment_props;
  comments: pageFragment_comments[] | null;
  link: pageFragment_link | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum LikeChoice {
  DOWN = "DOWN",
  NEUTRAL = "NEUTRAL",
  UP = "UP",
}

export interface CommentInput {
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
