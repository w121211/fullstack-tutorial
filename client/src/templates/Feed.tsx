import React from 'react'
import { RouteComponentProps } from "@reach/router"
import { Modal, Alert, Typography, Tag, Layout, Menu, Button, List, Skeleton, Descriptions, Collapse, Divider } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export function Iframe(props: RouteComponentProps) {
  return (
    <Modal
      // title="Basic Modal"
      visible={true}
    // onOk={this.handleOk}
    // onCancel={this.handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export function Feed(props: RouteComponentProps) {
  return (
    <Layout>
      <Layout.Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, maxWidth: 800 }}>

        <Typography>
          <Title>Leo vel fringilla est ullamcorper eget nulla facilisi</Title>
          <Paragraph>
            In the process of internal desktop applications development ...
          </Paragraph>

          <Paragraph>
            <Tag>event-aaa-bbb</Tag>
            <Tag>$ABC</Tag>
            <Tag>$OPQ</Tag>
          </Paragraph>

          <Paragraph>
            <Button shape="circle" icon={<UpOutlined />} />
            <Button shape="circle" icon={<DownOutlined />} />
          </Paragraph>
        </Typography>

        <List
          header={<h3>Comments</h3>}
          dataSource={[1, 2, 3]}
          renderItem={item => (
            <List.Item>
              <p>#1 <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              {/* <Button type="primary" shape="circle" icon={<UpCircleOutlined />} /> */}
              <div>
                <Button shape="circle" icon={<UpOutlined />} />
                <Button shape="circle" icon={<DownOutlined />} />
              </div>
            </List.Item>
          )}
        />
        <Button>Load more</Button>

      </Layout.Content>
    </Layout>
  )
}