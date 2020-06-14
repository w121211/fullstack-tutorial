import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Button, Card, Radio, Space, List, Typography, Result, Divider } from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Pane } from '../components/layout'
import { LineChart } from '../components/charts'

interface EventProps {
  name: string
}

const _eventContent = {
  status: "ALIVE",  // ALIVE, END
  cat: "", // NEWS, COMPANY, SIGNAL
  start: Date.now(),
  end: null,
  // title: "Some event name?",
  tags: ["#tag1", "tag2"],
  events: ["a-event", "b-event"],
  shotedAt: Date.now(),
}

const Event: React.FC<EventProps> = ({ name }) => {
  // const header = <h1>{getSymbol.data?.symbol.name}</h1>
  // const status = <p>{getSymbol.data?.symbol.status}</p>
  // const chart = null

  const morePosts = null
  const commits = null
  const createCommit = null
  const parentEvent = null
  const tickers = ["$$風電"]
  const tags = []
  const synonyms = []  // resolve


  const demo = (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography>
          <Typography.Title level={2}>
            <Space size="large">
              <i>#QE-2020#</i>
              {/* <i>{getSymbol.data.symbol.name}</i> */}
              <Button type="primary">追蹤</Button>
            </Space>
          </Typography.Title>
          <Typography.Paragraph>
            Orci dapibus ultrices in iaculis nunc sed augue. In eu mi bibendum neque egestas congue.<br />
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
              <Typography.Text strong>全球大放錢，未來該如何投資</Typography.Text>
              <i><Typography.Text type="secondary">#預測</Typography.Text></i>
              <i><Typography.Text type="secondary">#想法</Typography.Text></i>
            </Space>
          </Typography.Paragraph>

          <Typography.Paragraph>
            預測: 1年期間走勢, 2020/1/1-2021/1/1
            <ul>
              <li>未來情勢判斷：主要國際貨幣利率持續低靡，即便疫情重創經濟，但在資金行情下會持續推高金融商品價格，例如股市、房市<Button type="link">[社群判定]</Button></li>
              <li>股市多頭，漲幅將超過債市、匯市<Button type="link">[robo判定]</Button></li>
              <li>美股漲幅優於歐股、日股<Button type="link">[robo判定]</Button>
                <Radio.Group>
                  <Radio value={1}>同意</Radio>
                  <Radio value={2}>反對</Radio>
                  <Button size="small" shape="round">投票</Button>
                </Radio.Group>
              </li>
            </ul>
          </Typography.Paragraph>

          <Typography.Paragraph>
            總之這裏就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，
          </Typography.Paragraph>
        </Card>

        <Card>
          <Typography.Paragraph>
            <Space>
              <Typography.Text strong>全球大放錢，未來該如何投資</Typography.Text>
              <i><Typography.Text type="secondary">#預測</Typography.Text></i>
              <i><Typography.Text type="secondary">#想法</Typography.Text></i>
            </Space>
          </Typography.Paragraph>

          <Typography.Paragraph>
            預期: 半年期，電動車類股
            <ul>
              <li>漲幅優於電動車綜合：$AAA、$BBB<Button type="link">[社群判定]</Button></li>
              <li>看多<Button type="link">[robo判定]</Button>
                <Radio.Group>
                  <Radio value={1}>同意</Radio>
                  <Radio value={2}>反對</Radio>
                  <Button size="small" shape="round">投票</Button>
                </Radio.Group>
              </li>
            </ul>
          </Typography.Paragraph>

          <Typography.Paragraph>
            總之這裏就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，總之就是論述上面的判斷，
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
          dataSource={["#COVID-19#", "#聯準會", "#歐洲央行", "#日本央行", "#外匯", "$^USD", "$^GOLD"]}
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


interface Props extends RouteComponentProps {
  name?: string
}

export const EventPage: React.FC<Props> = ({ name = "#event#" }) => {
  // if (name === undefined) return <Event name="404" />
  return <Event name={name} />
}