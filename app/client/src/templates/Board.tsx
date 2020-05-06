import React from 'react'
import { RouteComponentProps } from "@reach/router"
import { Input, Card, Divider, Row, Col, Typography, Tag, Button, List, Space, Form } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// }

export function Board(props: RouteComponentProps) {
  return (
    <Row justify="center">
      <Col span={10}>
        {/* <p>
              <Button type="primary" size="large">Post Feed</Button>
            </p> */}
        <br />
        <p>
          Feeds |
              <a>Invited reviews (3+)</a>  |
              <a>@auto-cnbc</a> |
              <a>@auto-reuters</a> |
            </p>

        <Space direction="vertical">
          <Card size="small">
            <p>
              <b>Ant Design, a design language for background applications, is refined by Ant UED Team</b>
            &nbsp;&nbsp;&nbsp;Ant Design, a design language for background applications, is refined by Ant UED Team
            &nbsp;&nbsp;&nbsp;
            <br /><a>!event-aaa-bbb</a>, <a>$ABC</a>, <a>$OPQ</a>
            </p>
            <UpOutlined />
            <DownOutlined />
          </Card>
          <Card size="small">
            <a>
              <Typography.Text strong>
                Ant Design, a design language for background applications, is refined by Ant UED Team
                </Typography.Text>
            </a>&nbsp;
              <Tag>event-aaa-bbb</Tag>
            <Tag>$ABC</Tag>
            <Tag>$OPQ</Tag>

            {/* <Typography.Text type="secondary">17:32 Source.com</Typography.Text> */}
            <br />
            <Button shape="circle" icon={<UpOutlined />} />
            <Button shape="circle" icon={<DownOutlined />} />
            {/* <Typography.Text underline>Comments [打開後才顯示]</Typography.Text> */}
            <List
              size="small"
              // className="demo-loadmore-list"
              // loading={initLoading}
              itemLayout="horizontal"
              // loadMore={loadMore}
              dataSource={[1, 2, 3, 4]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">123 liked</a>,
                    <a key="list-loadmore-more">dislike</a>
                  ]}
                >
                  {/* <div style={{ marginLeft: -20 }}>#1</div> */}
                  <div>
                    Ant Design, a design language for background applications, is refined by Ant UED Team
                    {/* <a>like</a> <a>dislike</a> */}
                  </div>
                </List.Item>
              )}
            />
            <Typography.Paragraph>
              * Ant Design, a design language for background applications, is refined by Ant UED Team
              <span style={{ float: "right" }}><a>like</a> <a>dislike</a> #1</span>
              <br />
              * Ant Design, a design , is refined by Ant UED Team
              <span style={{ float: "right" }}><a>like</a> <a>dislike</a> #1</span>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <span style={{ float: "right" }}><a>like</a> <a>dislike</a> #1</span>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <span style={{ float: "right" }}><a>like</a> <a>dislike</a> #1</span>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <br /><a><b>#1</b></a> <a>like</a> <a>dislike</a>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <br /><a><b>#1</b></a> <a>like</a> <a>dislike</a>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <br /><a><b>#1</b></a> <a>like</a> <a>dislike</a>
              <br />
              Ant Design, a design language for background applications, is refined by Ant UED Team
              <br /><a><b>#1</b></a> <a>like</a> <a>dislike</a>



              {/* <div style={{ align: "right" }}><a>like</a> <a>dislike</a></div> */}

              <br />
              <a><b>#1</b></a> Ant Design, a design language for background applications, is refined by Ant UED Team
              <br />
              <a>like</a> <a>dislike</a>
              <br />
              <a><b>#1</b></a> Ant Design, a design language for background applications, is refined by Ant UED Team
              <br />
              <a>like</a> <a>dislike</a>
              <br />
            </Typography.Paragraph>
            <p>Ant Design, a design language for background applications, is refined by Ant UED Team</p>
            <p>Ant Design, a design language for background applications, is refined by Ant UED Team</p>

            {/* <a>23 more</a> */}


            <Form
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              size="small"
              layout="inline"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                // label="Username"
                // wrapperCol={{ span: 24 }}
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="comment ..." />
              </Form.Item>

              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
                  </Button>
              </Form.Item>

            </Form>
          </Card>
        </Space>
        <br />
        <Card size="small">
          <Typography.Text strong>
            Ant Design, a design language for background applications, is refined by Ant UED Team
            &nbsp;
                <Tag>event-aaa-bbb</Tag>
            <Tag>$ABC</Tag>
            <Tag>$OPQ</Tag>
          </Typography.Text>
        </Card>
        <br />
        <Card size="small">
          <Typography.Text strong>
            Ant Design, a design language for background applications, is refined by Ant UED Team
            &nbsp;
                <Tag>event-aaa-bbb</Tag>
            <Tag>$ABC</Tag>
            <Tag>$OPQ</Tag>
          </Typography.Text>
        </Card>
        <br />


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
          </a>&nbsp;
              <Tag>event-aaa-bbb</Tag>
          <Tag>$ABC</Tag>
          <Tag>$OPQ</Tag>

          {/* <Typography.Text type="secondary">17:32 Source.com</Typography.Text> */}
          <br />
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
      <Col offset={1} span={4}>
        <p />
        <Button>Post</Button>
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
  )
}