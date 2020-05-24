import React, { useState, Fragment } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Link, Router, RouteComponentProps } from '@reach/router'
import { Button, Form, Input } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

// function CreateMergeCommitForm(symbolId: string, action: QT.CommitAction) {
//   const [createCommit, { data, loading, error }] = useMutation<QT.createCommit, QT.createCommitVariables>(
//     queries.CREATE_COMMIT
//   )
//   const { register, handleSubmit, setValue, errors } = useForm({
//     defaultValues: {
//       // title: page?.title,
//       choice: 1,
//       content: "some content goes here",
//     }
//   })

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>ERROR: {error.message}</p>
//   // if (data?.createPost.id) return <Link to={`/post/${data.createPost.id}`}>Post Created</Link>

//   const onSubmit = (data: any) => {
//     createCommit({
//       variables: {
//         data: {
//           // symbolId?: string,
//           action: QT.CommitAction.MERGE,
//           content: "string"
//         }
//       }
//     })
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="parent">parent</label>
//           <input
//             name="parent"
//             placeholder="parent merge to..."
//             ref={register}
//           />
//         </div>

//         <button type="submit">Submit</button>

//       </form>
//     </>
//   )

// }

interface CommitFormProps {
  commit?: QT.commitDetail
}


// export const CommitForm: React.FC<CommitFormProps> = ({ commit }) => {

//   const { register, handleSubmit, setValue, errors } = useForm({
//     defaultValues: {
//       // title: page?.title,
//       choice: 1,
//       content: "some content goes here",
//     }
//   })
//   // if (commit === undefined) return <CreateCommitForm />
//   if (loading) return <p>Loading...</p>
//   if (error) return <p>ERROR: {error.message}</p>
//   // if (data?.createPost.id) return <Link to={`/post/${data.createPost.id}`}>Post Created</Link>

//   // const onSubmit = (data: any) => {
//   //   updateCommitReview({
//   //     variables: {
//   //       id: review.id,
//   //       data: {
//   //         choice: data.choice
//   //       }
//   //     }
//   //   })
//   // }

//   return (
//     <>
//       {/* <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="choice">choice</label>
//           <input
//             name="choice"
//             placeholder="choice..."
//             ref={register}
//           />
//         </div>

//         <button type="submit">Submit</button>

//       </form> */}
//     </>
//   )
// }


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function CommitForm() {
  const [form] = Form.useForm()
  const [createCommit, { data, loading, error }] = useMutation<QT.createCommit, QT.createCommitVariables>(
    queries.CREATE_COMMIT
  )

  const onFinish = (values: any) => {
    console.log('Success:', values)
    createCommit({
      variables: {
        data: {
          // symbolId?: string | null;
          action: QT.CommitAction.CREATE,
          content: JSON.stringify({})
        }
      }
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  )
}


interface CommitCreateProps extends RouteComponentProps { }

export const CommitCreate: React.FC<CommitCreateProps> = () => {
  const getMe = useQuery<QT.me>(queries.ME)
  const [showResult, setShowResult] = useState(false)
  const [showCreateReview, setShowCreateReview] = useState(false)

  return <CommitForm />
}