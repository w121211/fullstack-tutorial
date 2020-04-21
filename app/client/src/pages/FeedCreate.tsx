import gql from 'graphql-tag'
import React, { useState, useEffect, MouseEvent } from 'react'
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


interface Props extends RouteComponentProps { }

const FeedCreate: React.FC<Props> = () => {
  // const client: ApolloClient<any> = useApolloClient()
  // const [upsert, { loading, error }] = useMutation(
  // const [upsert] = useMutation(
  //   UPSERT_FEED,
  //   {
  //     onCompleted(data) {
  //       console.log(data)
  //       // localStorage.setItem('token', login as string)
  //       // client.writeData({ data: { isLoggedIn: true } })
  //     }
  //   }
  // )

  // return <FeedForm upsert={upsert} />
  const [isClicked, setIsClicked] = useState<boolean>(false)

  var isAnotherClicked = false

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // setIsClicked(!isClicked)
    isAnotherClicked = !isAnotherClicked
  }

  useEffect(() => {
    // console.log(`isClicked changed: ${isClicked}`)
  }, [isClicked])

  return isAnotherClicked ?
    <a onClick={onClick}>clicked</a> :
    <a onClick={onClick}>not click</a>
  //   return isClicked ?
  //     <a onClick={onClick}>clicked</a> :
  //     <a onClick={onClick}>not click</a>
}

export default FeedCreate
