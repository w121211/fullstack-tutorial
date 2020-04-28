import React, { useState, Fragment } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Link, Router, RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'


interface LinkPostProps {
  page?: QT.fetchPage_fetchPage
}

export const LinkPostForm: React.FC<LinkPostProps> = ({ page }) => {
  const [createPost, { data, loading, error }] = useMutation<QT.createPost, QT.createPostVariables>(
    queries.CREATE_POST
  )
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      // title: page?.title,
      title: "some tiltle goes here",
      content: "some content goes here",
    }
  })
  const onSubmit = (data: any) => {
    createPost({
      variables: {
        data: {
          cat: QT.PostCat.LINK,
          title: data.title,
          // content: data.content,
          symbols: [],
        }
      }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (data?.createPost.id) return <Link to={`/post/${data.createPost.id}`}>Post Created</Link>

  return (
    <>
      <h1>Page fetched, create a new link-post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">title</label>
          <input
            name="title"
            placeholder="title..."
            ref={register}
          />
        </div>

        <div>
          <label htmlFor="content">content</label>
          <input
            name="content"
            placeholder="body..."
            ref={register}
          />
        </div>

        <button type="submit">
          Submit
      </button>

      </form>
    </>
  )
}

function FetchPageForm() {
  const [fetchPage, { data, loading, error }] = useLazyQuery<QT.fetchPage, QT.fetchPageVariables>(
    queries.FETCH_PAGE,
  )
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      link: "http://some.url"
    }
  })
  const onSubmit = (data: any) => {
    console.log(data)
    fetchPage({ variables: { link: data.link } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  // if (data?.fetchPage.post) return <Link to={`/post/${data.fetchPage.post.id}`}>Post Existed (Redirect)</Link>
  if (data?.fetchPage) return <LinkPostForm page={data.fetchPage} />

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="link">link</label>
        <input
          name="link"
          placeholder="http://"
          ref={register}
        />
      </div>

      <button type="submit">
        Submit
    </button>

    </form>
  )
}

function PostForm({ cat }: { cat: QT.PostCat }) {
  switch (cat) {
    case QT.PostCat.LINK:
      // return <LinkPostForm />
      return <h1>LINK</h1>
    case QT.PostCat.POST:
      // return <LinkPostForm />
      return <h1>POST</h1>
  }
  return null
}

interface PostCreateEntryProps extends RouteComponentProps { }
// export function PostCreateEntry() {
export const PostCreateEntry: React.FC<PostCreateEntryProps> = () => {
  const [cat, setCat] = useState<QT.PostCat>(QT.PostCat.LINK)
  return (
    <>
      <button onClick={() => { setCat(QT.PostCat.LINK) }}>LINK</button>
      <button onClick={() => { setCat(QT.PostCat.POST) }}>POST</button>
      <PostForm cat={cat} />
      {/* <LinkPostForm /> */}
      <FetchPageForm />
    </>
  )
}

export function PostCreate() {
  return <FetchPageForm />
  // return (
  //   <Router primary={false} component={Fragment}>
  //     <PostForm path="post/new" />
  //     {/* <FetchPostForm path="post/new/fetch" /> */}
  //     <LinkPostForm path="post/new/link" />
  //   </Router>
  // )
}
