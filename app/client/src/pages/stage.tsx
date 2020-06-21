import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Button, Card, Descriptions, Radio, Space, List, Typography, Result, Divider } from 'antd'
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
              <i>Stage</i>
              {/* <i>{getSymbol.data.symbol.name}</i> */}
            </Space>
          </Typography.Title>

          <Button type="primary">Bet</Button>

          {/* <Typography.Paragraph>
            公司：西南航空、新加坡航空（[]up []down）、漢莎航空、國泰航空、全日空、維珍航空、更多...<br />
            相關行業：#飛機製造、#觀光、＃<br />
            相關事件：#全球境管#（[]up []down）、#COVID-19#、新增（＿＿＿）
          </Typography.Paragraph> */}
        </Typography>

        {/* <Divider>Focus</Divider> */}

        <div>
          <Button type="text"><b>熱門</b></Button>
          <Button type="link">最新</Button>
        </div>

        <Card>
          美聯儲會用一切力量拉抬股市，本次疫情危機已結束，美股轉為熊市 []同意 []不同意<br />
          判定式：美股1年期間皆為熊市<br />
          <br />
          來源：<br />
          <Card>某篇文章、某個影片</Card>
        </Card>

        <Card>
          某篇文章、某個影片<br />
          重點（社群整理）：<br />
          1. <br />
          2. <br />
          3. <br />
          <br />
          討論 / comments222.252.62.63
        </Card>

        <Card>
          COVID-19若2次爆發，會重挫全球經濟嗎？
        </Card>

        <Card>
          航空業的復甦時間？（載客量回到歷年水準） []2020年6-9月 []2020年9-12月 []2021年1-3月 []2021年4-6月<br />
          <br />
          <br />
          回覆：
          <Card>選[2021年4-6月] 我認為....</Card>
          <Card>選[2021年1-3月] 這個問題....</Card>
        </Card>

        <Card>
          美股會反轉嗎？ []會 []不會
        </Card>

        <Card>
          [新]iPhone12將有助蘋果($AAPL)股價持續攀升 []同意 []不同意 <br />
          時間：<br />
          判定方式：投票人小組<br />
          成立條件：1. iPhone12首季銷量比iPhone11S成長 2. 蘋果股價在iPhone12銷售後上升 3. 至少有3家以上報導<br />

          [無法判斷] - [看不懂問題、問題無法驗證、問題缺少選項、問題的價值不夠]
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

export const StagePage: React.FC<Props> = ({ name = "#event#" }) => {
  // if (name === undefined) return <Event name="404" />
  return <Event name={name} />
}