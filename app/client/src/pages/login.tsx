import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

// import { LoginForm } from '../components';
import ApolloClient from 'apollo-client';
// import * as Types from './__generated__/login';
import { LOGIN } from '../store/queries'

export default function Login() {
  const client: ApolloClient<any> = useApolloClient()
  // const [login, { loading, error }] = useMutation<Types.login, Types.loginVariables>(
  const [login, { loading, error }] = useMutation<any, any>(
    LOGIN,
    {
      onCompleted(data) {
        // localStorage.setItem('token', data.token as string)
        localStorage.setItem('token', data.login as string)
        client.writeData({ data: { isLoggedIn: true } })

        // TODO: 在這裡fetch me
      }
    }
  );

  if (loading) return <p>loading</p>
  if (error) return <p>An error occurred</p>

  // return <LoginForm login={login} />;
  return null
}
