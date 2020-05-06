import React, { useState, Fragment } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Link, Router, RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

function CreateMergeCommitForm(symbolId: string, action: QT.CommitAction) {
  const [createCommit, { data, loading, error }] = useMutation<QT.createCommit, QT.createCommitVariables>(
    queries.CREATE_COMMIT
  )
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      // title: page?.title,
      choice: 1,
      content: "some content goes here",
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  // if (data?.createPost.id) return <Link to={`/post/${data.createPost.id}`}>Post Created</Link>

  const onSubmit = (data: any) => {
    createCommit({
      variables: {
        data: {
          // symbolId?: string,
          action: QT.CommitAction.MERGE,
          content: "string"
        }
      }
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="parent">parent</label>
          <input
            name="parent"
            placeholder="parent merge to..."
            ref={register}
          />
        </div>

        <button type="submit">Submit</button>

      </form>
    </>
  )

}

interface CommitFormProps {
  commit?: QT.commitDetail
}

export const CommitForm: React.FC<CommitFormProps> = ({ commit }) => {
  const [updateCommit, { data, loading, error }] = useMutation<QT.updateCommit, QT.updateCommitVariables>(
    queries.UPDATE_COMMIT
  )
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      // title: page?.title,
      choice: 1,
      content: "some content goes here",
    }
  })
  // if (commit === undefined) return <CreateCommitForm />
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  // if (data?.createPost.id) return <Link to={`/post/${data.createPost.id}`}>Post Created</Link>

  // const onSubmit = (data: any) => {
  //   updateCommitReview({
  //     variables: {
  //       id: review.id,
  //       data: {
  //         choice: data.choice
  //       }
  //     }
  //   })
  // }

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="choice">choice</label>
          <input
            name="choice"
            placeholder="choice..."
            ref={register}
          />
        </div>

        <button type="submit">Submit</button>

      </form> */}
    </>
  )
}
