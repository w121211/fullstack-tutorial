import React, { useState } from 'react'
import { Input, Button } from 'antd'

import classes from './myTextAreaSmall.module.scss'

const { TextArea } = Input

const MyTextArea = () => {
  const [commentValue, setValue] = useState('')

  const [buttonDisable, setButtonState] = useState(true)

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let texts = event.target.value
    setValue(texts)
    buttonStateHandler(texts)
  }
  const buttonStateHandler = (value: string) => {
    if (value == '') {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }

  const onClickHandler = (e: any) => {
    e.stopPropagation()
  }

  //   const { value } = commentValue

  return (
    <div className={classes.Wrapper} onClick={onClickHandler}>
      <TextArea
        className={classes.TextArea}
        placeholder="留言..."
        autoSize
        onChange={onChangeHandler}

      />
      <Button type="text" disabled={buttonDisable}>
        送出
      </Button>
    </div>
  )
}

export default MyTextArea
