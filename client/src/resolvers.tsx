import gql from 'graphql-tag';
import { Resolvers } from 'apollo-client'
import { ApolloCache } from 'apollo-cache';
import { GET_CART_ITEMS } from './pages/cart';
import { MY_LIKES_MAP } from './store/query'
import * as LaunchTileTypes from './pages/__generated__/LaunchTile';
import * as GetCartItemTypes from './pages/__generated__/GetCartItems';
import * as MyLikesType from './store/__generated__/MyLikes'

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
  Launch: ResolverMap
  Mutation: ResolverMap
}

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }
  
  extend type Feed {
    isClicked: Boolean!
  }

  extend type Comment {
    meLike: Int
  }
`


export const resolvers: AppResolvers = {
  Comment: {
    meLike: (parent, args, { cache }): number => {

      // const queryResult = cache.readQuery({ query: GET_CLICK })
      // const id = getCacheKey({ __typename: 'MyLike', id: variables.id })
      const fragment = gql`
          fragment completeTodo on TodoItem {
            completed
          }
        `;
      // const todo = cache.readFragment<MyLikesType, >({ fragment, id });
      // cache.readFragment()
      // return queryResult
      return 0
    },
  },
  // Feed: {
  //   isClicked: (parent, args, { cache }): boolean => {
  //     const queryResult = cache.readQuery({ query: GET_CLICK })
  //     return queryResult
  //   },
  // },
  Launch: {
    isInCart: (launch: LaunchTileTypes.LaunchTile, _, { cache }): boolean => {
      const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({ query: GET_CART_ITEMS });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id)
      }
      return false;
    }
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
      const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({ query: GET_CART_ITEMS });
      if (queryResult) {
        const { cartItems } = queryResult;
        const data = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter((i) => i !== id)
            : [...cartItems, id],
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
      return [];
    },
  },
};
