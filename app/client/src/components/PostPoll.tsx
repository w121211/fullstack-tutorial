import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { MutationResult } from '@apollo/react-common'
import { Button, Tooltip, Form, Radio, Spin, Input } from 'antd'
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
  postId: string
  choices: React.ReactNode
}

const PollVoteForm: React.FC<FormProps> = ({ postId, choices }) => {
  const [createPostVote, { loading }] = useMutation<QT.createPostVote, QT.createPostVoteVariables>(
    queries.CREATE_POST_VOTE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPostVotes>({
        query: queries.MY_POST_VOTES,
      })
      if (data?.createPostVote && res?.myPostVotes) {
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPostVotes>({
          query: queries.MY_POST_VOTES,
          data: {
            myPostVotes: res?.myPostVotes.concat([data?.createPostVote]),
            // myPostLikes: res?.myPostLikes.concat([fake]),
          },
        })
      }
    },
  })
  const [form] = Form.useForm()

  function onFinish(values: any) {
    console.log(values)
    createPostVote({
      variables: {
        postId,
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

const PollJudgeForm: React.FC<FormProps> = ({ postId, choices }) => {
  const [createPostVote, { loading }] = useMutation<QT.createPostVote, QT.createPostVoteVariables>(
    queries.CREATE_POST_VOTE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPostVotes>({
        query: queries.MY_POST_VOTES,
      })
      if (data?.createPostVote && res?.myPostVotes) {
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPostVotes>({
          query: queries.MY_POST_VOTES,
          data: {
            myPostVotes: res?.myPostVotes.concat([data?.createPostVote]),
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
        postId,
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


enum PollState {
  OPEN,
  JUDGE,
  CLOSE,
}

const _postContent = {
  text: `if it is a link-post, then here can be some thought,
  or it can be a post-post, and http://aaa.com, #tag, $AAA, !event will auto recognize
  if it is a commit-post/poll-post, here is words describe the commit/poll
  here should allow author to add some [image]s, put this feature on the list
  `,
  poll: {
    // state: PollState.OPEN,
    // state: PollState.CLOSE,
    state: PollState.JUDGE,
    start: "2000-01-01",  // 不准變更
    end: "2000-01-10", // 不准變更
    choices: ["choice a", "choice b", "choice c"], // 不准變更
    // _start: "2000-01-01",
    // _end: "2000-01-10",
    // _result: {},
    minVotes: 100, // 最低門檻
    judgeMinVotes: 10,
    judgeNDays: 5, // in days
  },
  link: {
    urL: "http://url.com",
    text: 'this is a header',
    domain: "some domain",
    publishedAt: "2001-01-01 03:50",
  },
}

const _pollCount = {
  // [choice1, choice2, ...]
  nVotes: [10, 29, 38],
  reports: [
    {
      createdAt: new Date(2000, 1, 1)
    },
  ],
  verdict: {
    startedAt: new Date(2000, 1, 1),
    endedAt: new Date(2000, 1, 2),  // null for not ended
    valid: true,  // null for not judged
    // [choice1, choice2, ..., nAbandoned]
    nVotes: [10, 29, 38, 1],
    choice: 2,
    failedMsg: "",
  }
}


interface PostPollProps {
  me?: QT.me_me
  toLogin: () => void
  postId: string
  // poll: QT.post_post_contentPoll
  // count: QT.post_post_count
}

export const PostPoll: React.FC<PostPollProps> = ({ postId, me, toLogin }) => {
  const poll = _postContent.poll
  const count = _pollCount
  const meJudge = {
    __typename: "PollJudge",
    id: "1234",
    postId: "2234",
    choice: null
  }


  const [showMeta, setShowMeta] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)
  const { data } = useQuery<QT.myPostVotes>(
    queries.MY_POST_VOTES, {
    fetchPolicy: "cache-only"
  })
  const meVote = data?.myPostVotes.find((x) => x.postId === postId)

  function choice(i: number, text: string, count: number) {
    if (!me) return <Radio key={i} value={i} onClick={toLogin}>{text}</Radio>
    if (meVote && meVote.choice === i) return <Radio key={i} value={i} checked><b>{text} [{count}]</b></Radio>
    if (meVote && meVote.choice !== i) return <Radio key={i}>{text} [{count}]</Radio>
    if (showResult) return <Radio key={i} value={i}>{text} [{count}]</Radio>
    return <Radio key={i} value={i}>{text}</Radio>
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
  const meVoteMsg = meVote ? "你已經投票" : null

  let main
  if (poll.state === PollState.CLOSE && !count.verdict.valid) {
    main = <>
      投票已結束，因{count.verdict.failedMsg}原因判定為無效投票
      {meVoteMsg}
      {choices}
    </>

  } else if (poll.state === PollState.CLOSE && meVote) {
    main = <>
      投票已結束，你的選擇為：{poll.choices[meVote.choice]}，判定結果為：{poll.choices[count.verdict.choice]}
      {/* 你預測成功，贏過71%的預測者，獲得獎勵： */}
      {choices}
    </>

  } else if (poll.state === PollState.CLOSE && showResult) {
    main = <>
      投票已結束，判定結果為：{poll.choices[count.verdict.choice]}<br />
      {meVoteMsg}
      {choices}
    </>

  } else if (poll.state === PollState.CLOSE) {
    main = <>
      投票已結束
      <Tooltip title="耗費10點karma">
        <Button size="small" type="link" onClick={() => { setShowResult(true) }}>查看結果</Button>
      </Tooltip>
      <br />
      {choices}
    </>

  } else if (poll.state === PollState.JUDGE && meJudge) {
    main = (
      <>
        投票已結束，你被邀請加入評審團，請評斷實際的結果：
        <PollJudgeForm postId={postId} choices={judgeChoices} />
      </>
    )

  } else if (poll.state === PollState.JUDGE) {
    main = <>投票已結束，判定結果中{choices}</>

  } else if (poll.state === PollState.OPEN && meVote) {
    main = choices

  } else if (poll.state === PollState.OPEN && me) {
    main = (
      <PollVoteForm
        postId={postId}
        choices={choices}
      />
    )

  } else if (poll.state === PollState.OPEN) {
    main = <>
      {meVoteMsg}
      {choices}
    </>

  } else { throw new Error("不應該有漏掉的case") }

  return (
    <>
      {main}
      {showMeta ? (
        <ul>
          <li>半年期預測</li>
          <li>投票期間：2020/1/1 - 2020/2/1（1個月）</li>
          <li>結果判定：2020/8/1</li>
          <li>判定方式：隨選一組投票人決定</li>
          <li>當前預測價值：???</li>
        </ul>
      ) : <Button type="link" onClick={() => { setShowMeta(true) }}>詳細</Button>}
    </>
  )
}