import React from 'react'
import { List, Typography } from "antd"
// import { unit } from '../styles'
// import { cardClassName, getBackgroundImage } from './launch-tile'
// import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails'
import { FeedDetail_feed } from '../pages/__generated__/FeedDetail'

type Props = Partial<FeedDetail_feed>

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

const FeedTile: React.FC<Props> = ({ id, header, body }) => (
  <List
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    bordered
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Typography.Text mark>[ITEM]</Typography.Text> {item}
      </List.Item>
    )}
  />
)

// type LaunchDetailProps = Partial<LaunchDetails_launch>

// const LaunchDetail: React.FC<LaunchDetailProps> = ({ id, site, rocket }) => (
//   <Card
//     style={{
//       backgroundImage: getBackgroundImage(id as string),
//     }}
//   >
//     <h3>
//       {rocket && rocket.name} ({rocket && rocket.type})
//     </h3>
//     <h5>{site}</h5>
//   </Card>
// )

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

// const Card = styled('div')(cardClassName, {
//   height: 365,
//   marginBottom: unit * 4,
// })

export default FeedTile
