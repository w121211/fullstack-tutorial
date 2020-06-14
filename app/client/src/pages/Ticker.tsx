import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Button, Card, Radio, Space, List, Typography, Result, Divider } from 'antd'
import { Pane } from '../components/layout'
import { LineChart } from '../components/charts'

interface Props extends RouteComponentProps {
  id?: any
}
// export default function Ticker() {
export const Ticker: React.FC<Props> = ({ id }) => {
  const demo = (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography>
          <Typography.Title level={2}>
            <Space size="large">
              <i>$XXXX</i>
              {/* <i>{getSymbol.data.symbol.name}</i> */}
              <Button type="primary">追蹤</Button>
            </Space>
          </Typography.Title>
          <Typography.Paragraph>
            Orci dapibus ultrices in iaculis nunc sed augue. In eu mi bibendum neque egestas congue.<br />
            EPS 盈利率 營收 利潤
          </Typography.Paragraph>
        </Typography>

        <LineChart />

        {/* <Divider>Focus</Divider> */}

        <div>
          <Button type="text"><b>熱門</b></Button>
          <Button type="link">最新</Button>
        </div>

        <Card>
          <Typography.Paragraph>
            <Space>
              <Typography.Text strong>$XXXX-30日走勢預測</Typography.Text>
              <i><Typography.Text type="secondary">$AADR</Typography.Text></i>
              <i><Typography.Text type="secondary">預測</Typography.Text></i>
            </Space>
            <Radio.Group>
              <Radio value={1}>大跌（-10%以上）</Radio>
              <Radio value={2}>小跌（-10% ~ -3%）</Radio>
              <Radio value={3}>平盤（-3% ~ 3%）</Radio>
              <Radio value={4}>小漲（+3 ~ +10%)</Radio>
              <Radio value={5}>大漲（+10%以上）</Radio>
            </Radio.Group>
            <Button type="link">7日期預測</Button>
            <Button shape="round">投票</Button>
          </Typography.Paragraph>
        </Card>


        <Card>
          <Typography.Paragraph>
            <Typography.Text strong>$XXXX進場點</Typography.Text><br />
            社群： Buy: 123.45 Sell: 146.78<br />
            機器：Buy: 123.45 Sell: 146.78
          </Typography.Paragraph>
        </Card>

        <Card>
          <Typography.Paragraph>
            <Typography.Text strong>$XXXX還會持續上漲？</Typography.Text><br />
          </Typography.Paragraph>
        </Card>

        <Card>
          <Typography.Paragraph>
            <Typography.Text strong>該買哪個好？$XXXX, $XXXY, $XXXXZ?</Typography.Text><br />
          </Typography.Paragraph>
        </Card>

      </Space>
    </>
  )

  const demoRight =
    <Space direction="vertical" style={{ width: "100%" }}>
      <div />
      <Card>
        <List
          size="small"
          // header={<b>關聯</b>}
          dataSource={["#COVID-19#", "#英國脫歐#", "$AAAA", "$BBBB", "#電動車", "#電池"]}
          renderItem={e => <List.Item>{e}</List.Item>}
        />
      </Card>
      {/* <Card>
        <List
          size="small"
          // header={<b>關聯</b>}
          dataSource={["預測$XXXX未來走勢", "$XXXX還會持續上漲？", "該買哪個好？$XXXX, $XXXY, $XXXXZ?"]}
          renderItem={e => <List.Item>{e}</List.Item>}
        />
      </Card> */}
    </Space>

  return (
    <Pane left={demo} right={demoRight} />
  )
}