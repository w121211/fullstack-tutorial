import React from 'react'
import { Alert, Typography, Tag, Layout, Menu, Button, List, Skeleton, Descriptions, Collapse } from 'antd'

function Tile() {
  const data = [
    { loading: true, title: "aaa" },
    { loading: false, title: "aaa" },
    { loading: false, title: "aaa" },
  ]
  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: 'center',
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: '32px',
  //       }}
  //     >
  //       <Button onClick={this.onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;
  // const loadMore = (<Button>loading more</Button>)

  return (
    <List
      bordered
      header={<Typography.Title>Feeds</Typography.Title>}
      // footer={<div>Footer</div>}
      // className="demo-loadmore-list"
      // loading={initLoading}
      loading={false}
      itemLayout="vertical"
      dataSource={data}
      renderItem={x => (
        <List.Item>
          <a>
            <Typography.Title level={4}>
              Ant Design, a design language for background applications, is refined by Ant UED Team
            </Typography.Title>
          </a>
          <Tag>event-aaa-bbb</Tag>
          <Tag>$ABC</Tag>
          <Tag>$OPQ</Tag>
          {/* <div> */}
          <Typography.Text type="secondary">17:32 Source.com</Typography.Text>

          {/* </div> */}
        </List.Item>
      )}
    />
  )
}

export default function PageContainer(props: any) {
  return (
    <Layout>
      <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" style={{ float: 'left' }}>LOGO</div>
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Layout.Header>

      <Layout.Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, maxWidth: 800 }}>

        <div style={{ padding: '30px 0px' }}>
          <Descriptions title="Status">
            <Descriptions.Item label="Tasks">1/10</Descriptions.Item>
            <Descriptions.Item label="Credit">298 (+12.2%)</Descriptions.Item>
            <Descriptions.Item label="Lv">1</Descriptions.Item>
            <Descriptions.Item label="Exp">120/2000</Descriptions.Item>
          </Descriptions>
        </div>

        <div style={{ padding: 12, minHeight: 380 }}>
          <List
            bordered
            header={<Typography.Title>Reviews</Typography.Title>}
            // footer={<div>Footer</div>}
            // className="demo-loadmore-list"
            // loading={initLoading}
            loading={false}
            itemLayout="vertical"
            dataSource={["aaa", "bbb", "ccc"]}
            renderItem={x => (
              <List.Item>
                <a>
                  <Typography.Title level={4}>
                    Ant Design, a design language for background applications, is refined by Ant UED Team
                  </Typography.Title>
                </a>
                <Tag>event-aaa-bbb</Tag>
                <Tag>$ABC</Tag>
                <Tag>$OPQ</Tag>
                <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
              </List.Item>
            )}
          />
        </div>

        <div style={{ padding: 12, minHeight: 380 }}>
          <List
            bordered
            header={<Typography.Title>Feeds</Typography.Title>}
            // footer={<div>Footer</div>}
            // className="demo-loadmore-list"
            // loading={initLoading}
            loading={false}
            itemLayout="vertical"
            dataSource={["aaa", "bbb", "ccc"]}
            renderItem={x => (
              <List.Item>
                <a>
                  <Typography.Title level={4}>
                    Ant Design, a design language for background applications, is refined by Ant UED Team
                    </Typography.Title>
                </a>
                <Tag>event-aaa-bbb</Tag>
                <Tag>$ABC</Tag>
                <Tag>$OPQ</Tag>
                {/* <div> */}
                <Typography.Text type="secondary">17:32 Source.com</Typography.Text>

                {/* </div> */}
              </List.Item>
            )}
          />
        </div>

        <div>
          <Button>loading more</Button>
        </div>

      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>Footer</Layout.Footer>
    </Layout>
  )
}