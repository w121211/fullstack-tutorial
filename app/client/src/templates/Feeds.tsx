import React from 'react'
import { RouteComponentProps } from "@reach/router"
import { Comment, Input, Card, Divider, Row, Col, Typography, Tag, Layout, Menu, Button, List, Skeleton, Descriptions, Collapse } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

export function Feeds(props: RouteComponentProps) {
  return (
    <Layout>
      <Layout.Header style={{ zIndex: 1, width: '100%' }}>
        <div style={{ float: 'left', marginRight: 30 }}>
          HOME
        </div>
        <div style={{ float: 'left' }}>
          <Input.Search
            placeholder="ticker or company name"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <div style={{ float: 'right' }}>
          Karma 47 | Votes 5/10 |
          <Button type="primary">LOG IN</Button>
          <Button >SIGN UP</Button>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="1">Me</Menu.Item>
        </Menu>


      </Layout.Header>

      {/* <Layout.Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, maxWidth: 800 }}> */}
      <Layout.Content className="site-layout" style={{ maxWidth: 800 }}>
        <Row>
          <Col span={17} offset={1}>
            <p>
              <Button type="primary" size="large">Post Feed</Button>
            </p>
            <p>
              Feeds | <a>Invited reviews (3+)</a>
            </p>
            <Card size="small">
              <a>
                <Typography.Text strong>
                  Ant Design, a design language for background applications, is refined by Ant UED Team
                </Typography.Text>
              </a>
              <br />
              <Tag>event-aaa-bbb</Tag>
              <Tag>$ABC</Tag>
              <Tag>$OPQ</Tag>
              <br />
              <Typography.Text type="secondary">17:32 Source.com | 12 Comments</Typography.Text>
            </Card>
            <p />
            <Card size="small">
              <a>
                <Typography.Text strong>
                  Ant Design, a design language for background applications, is refined by Ant UED Team
                </Typography.Text>
              </a>
              <Tag>event-aaa-bbb</Tag>
              <Tag>$ABC</Tag>
              <Tag>$OPQ</Tag>
              <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
              <Button shape="circle" icon={<UpOutlined />} />
              <Button shape="circle" icon={<DownOutlined />} />
              <Divider />
              <Typography.Text underline>Comments [打開後才顯示]</Typography.Text>
              <ul>
                <li>Dictum non consectetur a erat nam at lectus urna.
                    <br />
                  <a>upvote</a>
                </li>
                <li>Dolor purus non enim praesent elementum facilisis leo.
                    <br />
                  <a>upvote</a>
                </li>
                <li>Vel pretium lectus quam id leo in vitae turpis <a>edit</a>
                  <br />
                    30 ups
                  </li>
              </ul>
              <a>23 more</a>
              <Input
                placeholder="Your comment"
                style={{ width: 200 }}
              />
              <Button>SUBMIT</Button>

            </Card>
            <p />
            <Card size="small">
              <a>
                <Typography.Title level={4}>
                  Trending / Signals [像寶箱一樣需要開啟]
                  </Typography.Title>
              </a>
            </Card>
            <p />
            <Card size="small">
              <a>
                <Typography.Title level={4}>
                  Ant Design, a design language for background applications, is refined by Ant UED Team
                  </Typography.Title>
              </a>
              <Tag>event-aaa-bbb</Tag>
              <Tag>$ABC</Tag>
              <Tag>$OPQ</Tag>
              <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
            </Card>
            <p />

            <Divider>Below have been reached</Divider>

            <Card size="small">
              <a>
                <Typography.Title level={4}>
                  Ant Design, a design language for background applications, is refined by Ant UED Team
                  </Typography.Title>
              </a>
              <Tag>event-aaa-bbb</Tag>
              <Tag>$ABC</Tag>
              <Tag>$OPQ</Tag>
              <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
            </Card>
            <p />
            <Button>loading more</Button>
          </Col>
          <Col span={5} offset={1}>
            <p />
            <List
              header={<Typography.Title level={4}>Followed Events</Typography.Title>}
              dataSource={[1, 2, 3, 4]}
              renderItem={item => (
                <List.Item>
                  <a>short-event-name (+1.82%)</a>
                  {/* <Typography.Text>remove</Typography.Text> */}
                </List.Item>
              )}
            />
            {/* <Divider /> */}

            <List
              header={<Typography.Title level={4}>Followed Tickers</Typography.Title>}
              dataSource={[1, 2, 3, 4]}
              renderItem={item => (
                <List.Item>
                  {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
                  <a>$OSD (-3.21%)</a>
                </List.Item>
              )}
            />

          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  )
}