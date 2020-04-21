import gql from 'graphql-tag';
import { Resolvers } from 'apollo-client'
import { ApolloCache } from 'apollo-cache';
import * as queries from './queries'
import * as QT from './queryTypes'


type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any

interface ResolverMap {
  [field: string]: ResolverFn
}

interface AppResolvers extends Resolvers {
  Comment: ResolverMap
  // Launch: ResolverMap
  // Mutation: ResolverMap
}

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
  # extend type Launch {
  #   isInCart: Boolean!
  # }
  # extend type Feed {
  #   isClicked: Boolean!
  # }
  extend type Post {
    meLike: PostLike
  }
  extend type Comment {
    meLike: CommentLike
  }
`

export const resolvers: AppResolvers = {
  // Post: {
  //   meLike: (parent, args, { cache }): LikeTypes.like | null => {
  //     // const qres = cache.readQuery({ query: queries.GET_FEEDS })
  //     // cache.writeQuery({
  //     //   query: queries.GET_FEEDS,
  //     //   variables: { after: null },
  //     //   data: {
  //     //     feeds: [...qres.feeds],
  //     //   }
  //     // })
  //     // console.log(queryResult)
  //     // const queryResult = cache.readQuery<MyLikesTypes.MyLikes>({ query: queries.MY_LIKES });
  //     // console.log(queryResult)
  //     console.log(`Like:Comment:${parent.id}`)
  //     return cache.readFragment<LikeTypes.like>({
  //       id: "Like:Feed:1234",
  //       // id: `Like:Comment:${parent.id}`,
  //       fragment: queries.LIKE,
  //     })
  //   },
  // },
  Comment: {
    meLike: (parent, args, { cache }): QT.commentLike | null => {
      console.log(parent)
      // const qres = cache.readQuery({ query: queries.GET_FEEDS })
      // cache.writeQuery({
      //   query: queries.GET_FEEDS,
      //   variables: { after: null },
      //   data: {
      //     feeds: [...qres.feeds],
      //   }
      // })
      // console.log(queryResult)
      // const queryResult = cache.readQuery<MyLikesTypes.MyLikes>({ query: queries.MY_LIKES });
      // console.log(queryResult)
      // console.log(`Like:Comment:${parent.id}`)
      return cache.readFragment<QT.commentLike>({
        id: parent.id,
        fragment: queries.COMMENT_LIKE,
      })
    },
  },
  // Feed: {
  //   isClicked: (parent, args, { cache }): boolean => {
  //     const queryResult = cache.readQuery({ query: GET_CLICK })
  //     return queryResult
  //   },
  // },
  // Launch: {
  //   isInCart: (launch: LaunchTileTypes.LaunchTile, _, { cache }): boolean => {
  //     const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({ query: GET_CART_ITEMS });
  //     if (queryResult) {
  //       return queryResult.cartItems.includes(launch.id)
  //     }
  //     return false;
  //   }
  // },
  // Mutation: {
  //   addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
  //     const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({ query: GET_CART_ITEMS });
  //     if (queryResult) {
  //       const { cartItems } = queryResult;
  //       const data = {
  //         cartItems: cartItems.includes(id)
  //           ? cartItems.filter((i) => i !== id)
  //           : [...cartItems, id],
  //       };
  //       cache.writeQuery({ query: GET_CART_ITEMS, data });
  //       return data.cartItems;
  //     }
  //     return [];
  //   },
  // },
};
