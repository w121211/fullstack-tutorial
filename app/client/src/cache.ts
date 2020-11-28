import { InMemoryCache, Reference } from '@apollo/client'

// const cache = new InMemoryCache({
//   dataIdFromObject: (o: any) => {
//     switch (o.__typename) {
//       case 'Like': {
//         if (o.feedId) return `Like:Feed:${o.feedId}`
//         else if (o.commentId) return `Like:Comment:${o.commentId}`
//         else if (o.postId) return `Like:Post:${o.postId}`
//         else if (o.pollId) return `Like:Poll:${o.pollId}`
//         else return null
//       }
//       default:
//         return defaultDataIdFromObject(o)
//     }
//   },
// })

// cache.writeData({
//   data: {
//     // me: null,
//     // isLoggedIn: !!localStorage.getItem('token'),
//     // isLoggedIn: false,
//     cartItems: [],
//     isClicked: false,
//     // myPostLikes: [],
//     myLikes: [
//       {
//         __typename: 'Like',
//         id: 'id-id-id',
//         feedId: '1234',
//         postId: null,
//         pollId: null,
//         commentId: null,
//         choice: 1,
//         updatedAt: '12-12-2012',
//       },
//       {
//         __typename: 'Like',
//         id: 'id-id-id2',
//         feedId: null,
//         postId: null,
//         pollId: null,
//         commentId: '1234',
//         choice: 1,
//         updatedAt: '12-12-2012',
//       },
//     ],
//   },
// })

// TODO:
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        cartItems() {
          return cartItemsVar();
        },
        latestPages: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      }
    }
  }
})

export const isLoggedInVar =
  cache.makeVar<boolean>(!!localStorage.getItem('token'))

export const cartItemsVar = cache.makeVar<string[]>([])