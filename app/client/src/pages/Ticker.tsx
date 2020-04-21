import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form'

// import { LAUNCH_TILE_DATA } from './launches';
// import { Loading, Header } from '../components';
// import { ActionButton } from '../containers';
// import * as LaunchDetailsTypes from './__generated__/LaunchDetails';

type FormData = {
  id: string
  body: string
}

// interface CreateBetFormProps {
//   createComment: (a: { variables: CreateCommentTypes.CreateCommentVariables }) => void
//   disabled: boolean
// }

// const CreateBetForm: React.FC<CreateCommentFormProps> = ({ createComment, disabled }) => {
//   const { register, handleSubmit, setValue, errors } = useForm<FormData>()
//   const onSubmit = handleSubmit(({ id, body }) => {
//     console.log('submit...')
//     console.log({ id, body })
//     createComment({
//       variables: { data: { body } }
//     })
//   })
//   return (
//     <form onSubmit={onSubmit}>
//       <label htmlFor="body">body</label>
//       <input name="body" placeholder="body..." defaultValue="this is a body" ref={register} />
//       <button type="submit" disabled={disabled}>Submit</button>
//     </form>
//   )
// }


interface Props extends RouteComponentProps {
  id?: any
}

// const Event: React.FC<Props> = ({ id }) => {
//   const {
//     data,
//     loading,
//     error
//   } = useQuery<
//     FeedDetailTypes.FeedDetail,
//     FeedDetailTypes.FeedDetailVariables
//   >(
//     GET_FEED,
//     { variables: { id } }
//   )

//   if (loading) return <Loading />
//   if (error) return <p>ERROR: {error.message}</p>
//   if (!data) return <p>Not found</p>


//   return (
//     <>
//       {/* <Header> */}
//       <FeedDetail {...data.feed} />
//       {/* </Header> */}
//     </>
//   )
// }

export default function Ticker() {
  return (
    <>
      <h1>Commodo viverra maecenas, $ASO</h1>
      <p />
      <a type="primary">Track</a>

      {/* <Chart /> */}

      <h3>Price Estimate</h3>

      {/* <Form name="predict">
        <Form.Item label="Action">
          <Radio.Group onChange={(e) => { console.log(e.target.value) }}>
            <Radio value={1}>Buy</Radio>
            <Radio value={2}>Hold</Radio>
            <Radio value={3}>Sell</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Target price | Buy Price">
          <Input placeholder="123.45" />
        </Form.Item>
        <Form.Item label="Stop-loss price | Sell Price">
          <Input placeholder="70.00" />
        </Form.Item>
      </Form> */}

      <h4>Group Estimate [Accuracy: 61%]</h4>
      <p>Buy: 123.45</p>
      <p>Sell: 146.78</p>

      <h4>@Tsubane Estimate [Accuracy: 63%]</h4>
      <p>Buy: 123.45</p>
      <p>Sell: 146.78</p>

      <hr />


      {/* <Card size="small">
        <a>
          <Typography.Text strong>Ant Design, a design language for background applications, is refined by Ant UED Team</Typography.Text>
        </a>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <br />
        <Typography.Text type="secondary">17:32 Source.com | 12 Comments</Typography.Text>
      </Card>
      <p />
      <Card size="small">
        <Typography.Text strong>[Post] Ant Design, a design language for background applications, is refined by Ant UED Team</Typography.Text>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <p>Fringilla phasellus faucibus scelerisque eleifend donec pretium ...</p>
        <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
      </Card>
      <p />
      <Card size="small">
        <a>
          <Typography.Text strong>[Post] Ant Design, a design language for background applications, is refined by Ant UED Team</Typography.Text>
        </a>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <p>Fringilla phasellus faucibus scelerisque eleifend donec pretium. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Lectus nulla at volutpat diam ut venenatis. Vitae tempus quam pellentesque nec nam aliquam sem et. Tristique magna sit amet purus gravida quis blandit turpis cursus. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Et netus et malesuada fames ac turpis egestas integer eget. Sagittis vitae et leo duis ut diam quam. Natoque penatibus et magnis dis parturient. Pretium vulputate sapien nec sagittis aliquam malesuada. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Aliquet enim tortor at auctor urna nunc id cursus metus. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.</p>
        <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
        <Divider />
        <Typography.Text underline>Comments [打開後才顯示]</Typography.Text>
        <ul>
          <li>Dictum non consectetur a erat nam at lectus urna.<br /><a>upvote</a></li>
          <li>Dolor purus non enim praesent elementum facilisis leo.<br /><a>upvote</a></li>
          <li>Vel pretium lectus quam id leo in vitae turpis <a>edit</a><br />30 ups</li>
        </ul>
        <a>23 more</a>
        <Input
          placeholder="Your comment"
          style={{ width: 200 }}
        />
        <Button>SUBMIT</Button>
      </Card>
      <p />
      <Button>loading more</Button> */}
    </>
  )
}