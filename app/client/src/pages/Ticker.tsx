import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Button, Card, Descriptions, Radio, Space, List, Typography, Result, Divider, Row, Col } from 'antd'
import { Pane } from '../components/layout'
import { LineChart } from '../components/charts'
import blur from '../assets/download.jpeg'

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
            OOO XXX 有限公司, Nasdaq<br />
            #Saas類股 #新產品＃
          </Typography.Paragraph>
        </Typography>

        <Descriptions title="基本面" size="small">
          <Descriptions.Item label="EPS">1.2</Descriptions.Item>
          <Descriptions.Item label="本益比">32</Descriptions.Item>
          <Descriptions.Item label="資本負債比">32</Descriptions.Item>
          <Descriptions.Item label="現金資本比">32</Descriptions.Item>
          <Descriptions.Item label="產業">#Saas #網路基礎設備</Descriptions.Item>
          <Descriptions.Item label="總體面">#COVID-19# ##</Descriptions.Item>
          <Descriptions.Item label="消息面">#新產品發布# ##</Descriptions.Item>
          <Descriptions.Item label="比較">與類股相比、與大盤相比</Descriptions.Item>
        </Descriptions>

        <Card>
          事件：#新產品發布#
          感受：優於預期、符合預期、低於預期
          關聯類股：
          機會：首發備貨量將拉抬供應鏈、`
          風險：股價可能反應過度後回落、提前反應 ＊有沒有辦法延伸某些point？例如針對一個point做提問然後獲得更多回答？
        </Card>

        <Card>
          事件：#新產品發布# [重要 不重要]
          感受：優於預期、符合預期、低於預期
          5W1H：哪些股票、將如何影響、將如何發展
          關聯類股：
          機會：首發備貨量將拉抬供應鏈、
          風險：股價可能反應過度後回落、提前反應 ＊有沒有辦法延伸某些point？例如針對一個point做提問然後獲得更多回答？
        </Card>

        <Typography.Title level={4}>擂台</Typography.Title>
        <Card>新產品將進一步推升＄AAA股價</Card>
        <Card>後疫情時代，實體服務業將持續萎縮</Card>

        <Typography.Title level={4}>事件</Typography.Title>
        <Card>OO產品發表 5W1H（想知道）</Card>
        <Card>南北韓衝突</Card>
        <Card>OOO積欠工資</Card>
        <Card>發放消費券</Card>

        {/* <LineChart /> */}

        <div>
          風向標 / 股價預測 <Button size="small">解鎖</Button>
          <br />
          <img src={blur} alt="" />
        </div>

        <Row>
          <Col span={12}>
            <Card>
              <Typography.Title level={4}>機會</Typography.Title>
              <Typography.Paragraph>
                <Typography.Text strong>機會</Typography.Text><br />
                產品有競爭力（?+）<br />
                有成長潛力（?+）<br />
                產品市佔率高（?+）<br />
                <Button type="link">...更多</Button>
              </Typography.Paragraph>
              <Typography.Paragraph>
                <Typography.Text strong>風險</Typography.Text><br />
                尚未實現獲利（?+）<br />
                <Button type="link">...更多</Button>
              </Typography.Paragraph>
              <Button size="small">解鎖</Button>
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              <Typography.Title level={4}>技術面</Typography.Title>
              <Typography.Paragraph>
                型態：上升通道 (?+) <br />
                <small>前次型態：下降通道</small>
              </Typography.Paragraph>
              <Typography.Paragraph>
                可能發展
                <br />1. 壓力點$123附近反彈 (?+)
                <br />2. 突破壓力點$123 (?+)
                <br />
              </Typography.Paragraph>
              <Typography.Paragraph>
                壓力：$123<br />
                支撐：$107
              </Typography.Paragraph>
              <Button size="small">解鎖</Button>
              <Button type="link" size="small">新型態</Button>
            </Card>

          </Col>
        </Row>

        <Card>
          [預測] Buy Hold Sell
          [貢獻] 你熟悉$AAA嗎？ Yes No
        </Card>


        {/* <Divider>Focus</Divider> */}

        <div>
          <Button type="text"><b>熱門</b></Button>
          <Button type="link">最新</Button>
          #新產品發表#
        </div>

        <Card>
          ＯＯＯ產品上市對股價影響？
        </Card>

        <Card>
          Reply:可以投資$AAA了嗎？
        </Card>

        <Card>
          買哪隻好？
          可以投資了嗎？
        </Card>

        <Card>
          技術分析$AAA
        </Card>



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