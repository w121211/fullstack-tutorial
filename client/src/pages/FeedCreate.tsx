import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ApolloClient from 'apollo-client'
import { useApolloClient, useMutation } from '@apollo/react-hooks'

// import { FeedForm, Loading } from '../components'
import { FeedForm } from '../components'
// import * as LoginTypes from './__generated__/login'
// import * as UpsertFeed from './__generated__/UpsertFeed'

// export const LOGIN_USER = gql`
//   mutation login($email: String!) {
//     login(email: $email)
//   }
// `

// export default function Login() {
//   const client: ApolloClient<any> = useApolloClient()
//   const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
//     LOGIN_USER,
//     {
//       onCompleted({ login }) {
//         localStorage.setItem('token', login as string)
//         client.writeData({ data: { isLoggedIn: true } })
//       }
//     }
//   )

//   if (loading) return <Loading />
//   if (error) return <p>An error occurred</p>

//   return <LoginForm login={login} />
// }

// export default function FeedCreate() {
//   return <FeedForm />
// }

export const UPSERT_FEED = gql`
  mutation UpsertFeed($id: ID, $data: FeedInput!) {
    upsertFeed(id: $id, data: $data) {
      id
    }
  }
`

interface Props extends RouteComponentProps { }

const FeedCreate: React.FC<Props> = () => {
  // const client: ApolloClient<any> = useApolloClient()
  // const [upsert, { loading, error }] = useMutation(
  const [upsert] = useMutation(
    UPSERT_FEED,
    {
      onCompleted(data) {
        console.log(data)
        // localStorage.setItem('token', login as string)
        // client.writeData({ data: { isLoggedIn: true } })
      }
    }
  )

  return <FeedForm upsert={upsert} />
}

export default FeedCreate
