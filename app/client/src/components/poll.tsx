import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { MutationResult } from '@apollo/react-common'
import { Button, Tooltip, Form, Radio, Spin, Input, Typography } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

/**
 * 投票狀態分為：
 *   - 投票進行中，user沒投票 -> PollVoteForm
 *   - 投票進行中，user已投票 -> PollCount
 *   - 投票已結束，user有投票&邀請判定 -> PollJudgeForm
 *   - (投票已結束，user有投票&已判定 -> PollJudgeCount?)
 *   - 投票已結束，判定中，user有投票 -> PollCount
 *   - 投票已結束，判定中，user未投票 -> user需付費看PollCount
 *   - 投票已判定，user有投票 -> PollVerdict
 *   - 投票已判定，user未投票 -> user需付費看PollVerdict
 */

interface FormProps {
  pollId: string
  choices: React.ReactNode
}

const PollVoteForm: React.FC<FormProps> = ({ pollId, choices }) => {
  const [createPollVote, { loading }] = useMutation<QT.createPollVote, QT.createPollVoteVariables>(
    queries.CREATE_POLL_VOTE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPollVotes>({
        query: queries.MY_POLL_VOTES,
      })
      if (data?.createPollVote && res?.myPollVotes) {
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPollVotes>({
          query: queries.MY_POLL_VOTES,
          data: {
            myPollVotes: res?.myPollVotes.concat([data?.createPollVote]),
            // myPostLikes: res?.myPostLikes.concat([fake]),
          },
        })
      }
    },
  })
  const [form] = Form.useForm()

  function onFinish(values: any) {
    console.log(values)
    createPollVote({
      variables: {
        pollId,
        data: { choice: values.choice }
      }
    })
  }

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      size="small"
    >
      <Form.Item
        name="choice"
        rules={[{ required: true, message: '需點選一個選項' }]}
      >
        {choices}
      </Form.Item>

      <Form.Item>
        {loading
          ? <Spin />
          : <Button htmlType="submit" >送出</Button>}
      </Form.Item>

      {/* 
      TODO: shouldUpdate 會被大量呼叫 -> 慢 
      <Form.Item shouldUpdate>
        {() => {
          console.log("touched")
          if (form.isFieldTouched("choice"))
            return <Button type="primary" htmlType="submit">送出</Button>
          else if (loading)
            return <Spin />
          return null
        }}
      </Form.Item> 
      */}

    </Form>
  )
}

const PollJudgeForm: React.FC<FormProps> = ({ pollId, choices }) => {
  const [createPostVote, { loading }] = useMutation<QT.createPollVote, QT.createPollVoteVariables>(
    queries.CREATE_POLL_VOTE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPollVotes>({
        query: queries.MY_POLL_VOTES,
      })
      if (data?.createPollVote && res?.myPollVotes) {
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPollVotes>({
          query: queries.MY_POLL_VOTES,
          data: {
            myPollVotes: res?.myPollVotes.concat([data?.createPollVote]),
            // myPostLikes: res?.myPostLikes.concat([fake]),
          },
        })
      }
    },
  })
  const [form] = Form.useForm()
  const [checkNick, setCheckNick] = useState(false);
  // useEffect(() => {
  //   form.validateFields(['nickname']);
  // }, [checkNick])

  function onFinish(values: any) {
    console.log(values)
    createPostVote({
      variables: {
        pollId,
        data: { choice: values.choice }
      }
    })
  }

  return (
    <Form
      layout="inline"
      size="small"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="choice"
        rules={[{ required: true, message: '需點選一個選項' }]}
      >
        {choices}
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: '需要評斷理由' },
          { min: 10, message: '需10字以上' }
        ]}
        name="comment"
      >
        <Input placeholder="理由（例如參考來源的網址）" />
      </Form.Item>

      <Form.Item>
        {loading
          ? <Spin />
          : <Button htmlType="submit" >送出</Button>}
      </Form.Item>

    </Form>
  )
}

interface PostPollProps {
  me?: QT.me_me
  toLogin?: () => void
  pollId: string
  poll: QT.post_post_poll
  count: QT.post_post_count_poll
  showDetail: boolean
  setShowDetail: (a: boolean) => void
}

export const PostPoll: React.FC<PostPollProps> = ({ me, toLogin, poll, count, showDetail, setShowDetail }) => {
  // const poll = _postContent.poll
  // const meJudgement = {
  //   __typename: "PollJudge",
  //   id: "1234",
  //   postId: "2234",
  //   choice: null
  // }
  const meJudgment = undefined

  // const [collapsed, setCollapsed] = useState<boolean>(true)
  const [showResult, setShowResult] = useState<boolean>(false)
  const myVotes = useQuery<QT.myPollVotes>(
    queries.MY_POLL_VOTES, {
    fetchPolicy: "cache-only"
  })
  // const { data } = useQuery<QT.myPostVotes>(
  //   queries.MY_POST_VOTES, {
  //   fetchPolicy: "cache-only"
  // })
  const meVote = myVotes.data?.myPollVotes.find((x) => x.pollId === poll.id)

  function choice(i: number, text: string, count: number) {
    if (!me) return <Radio key={i} value={i} onClick={toLogin}>{text}</Radio>
    if (meVote && meVote.choice === i) return <Radio key={i} value={i} checked onClick={() => { setShowDetail(true) }}><b>{text} [{count}]</b></Radio>
    if (meVote && meVote.choice !== i) return <Radio key={i} onClick={() => { setShowDetail(true) }}>{text} [{count}]</Radio>
    // if (showResult) return <Radio key={i} value={i}>{text} [{count}]</Radio>
    return <Radio key={i} value={i} onClick={() => { setShowDetail(true) }}>{text}</Radio>
  }
  const choices = (
    <Radio.Group>
      {poll.choices.map((x, i) => choice(i, x, 0))}
    </Radio.Group>
  )
  const judgeChoices = (
    <Radio.Group>
      {poll.choices.map((c, i) => <Radio key={i} value={i}>{c}</Radio>)}
      <Radio key={poll.choices.length} value={-1}>無法判定</Radio>
    </Radio.Group>
  )

  let main
  if (poll.status === QT.PollStatus.CLOSE_FAIL) {
    main = <>
      {/* 投票已結束，因{count.verdict?.failedMsg}原因判定為無效投票 */}
      投票已結束，經...判定為無效投票
      <Typography.Text type="secondary">你已經投票</Typography.Text>
      {choices}
    </>

  } else if (poll.status === QT.PollStatus.CLOSE_SUCCESS && meVote && count.verdictChoice) {
    main = <>
      投票已結束，你的選擇為：{poll.choices[meVote.choice]}，判定結果為：{poll.choices[count.verdictChoice]}
      {/* 你預測成功，贏過71%的預測者，獲得獎勵： */}
      {choices}
    </>

  } else if (poll.status === QT.PollStatus.CLOSE_SUCCESS && showResult && count.verdictChoice) {
    main = <>
      投票已結束，判定結果為：{poll.choices[count.verdictChoice]}<br />
      <Typography.Text type="secondary">你已經投票</Typography.Text>
      {choices}
    </>

  } else if (poll.status === QT.PollStatus.CLOSE_SUCCESS) {
    main = <>
      投票已結束
      <Tooltip title="耗費10點karma">
        <Button size="small" type="link" onClick={() => { setShowResult(true) }}>查看結果</Button>
      </Tooltip>
      <br />
      {choices}
    </>

  } else if (poll.status === QT.PollStatus.JUDGE && meJudgment) {
    main = (
      <>
        投票已結束，你被邀請加入評審團，請評斷實際的結果：
        <PollJudgeForm pollId={poll.id} choices={judgeChoices} />
      </>
    )

  } else if (poll.status === QT.PollStatus.JUDGE) {
    main = <>
      <br />
      {choices}
      <Typography.Text type="secondary">
        投票已結束，判定結果中
      </Typography.Text>
      {meVote || showResult ? null : (
        <Tooltip title="耗費10點karma">
          <Button size="small" type="link" onClick={() => { setShowResult(true) }}>查看投票數</Button>
        </Tooltip>
      )}

    </>

  } else if (poll.status === QT.PollStatus.OPEN && meVote) {
    main = <>
      <br />
      {choices}
      <Typography.Text type="secondary">你已經投票</Typography.Text>
      <Button size="small" type="link" onClick={() => { setShowResult(true) }}>查看投票數</Button>
    </>

  } else if (poll.status === QT.PollStatus.OPEN && me) {
    main = <PollVoteForm pollId={poll.id} choices={choices} />

  } else if (poll.status === QT.PollStatus.OPEN) {
    main = choices

  } else {
    throw new Error("不應該有漏掉的case")
  }

  // if (!showDetail) return main
  return (
    <>
      {/* 
      半年期預測
      <ul>
        <li>結果判定：2020/8/1</li>
        <li>投票期間：2020/1/1 - 2020/2/1（5個月）</li>
        <li>判定方式：隨選一組投票人決定</li>
        <li>當前預測價值：???</li>
      </ul> */}
      {main}
      {
        showDetail &&
        <Typography.Text type="secondary">
          <ul>
            <li>結果判定：2020/8/1</li>
            <li>投票期間：2020/1/1 - 2020/2/1（5個月）</li>
            <li>判定方式：隨選一組投票人決定</li>
            <li>當前預測價值：???</li>
          </ul>
        </Typography.Text>
      }
    </>
  )
}