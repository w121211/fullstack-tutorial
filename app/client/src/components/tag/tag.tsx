import React, { useState, useEffect, useRef } from 'react'
import { Tag, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import classes from './tag.module.scss'

interface props {
  content: string[]
  newTag?: boolean
}

const Tags: React.FC<props> = ({ content, newTag = true }) => {

  const [state, setState] = useState(
    {
      tags: content,
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
    }
  )

  const inputRef = useRef<Input>(null)

  // useEffect(() => {
  //   if (state.inputVisible) {
  //     inputRef.current.focus();
  //   }
  // }, [isEditing]);

  const showInput = () => {
    // if (!inputRef.current) return
    setState({ ...state, inputVisible: true });
    if (inputRef.current) {

      inputRef.current.focus()
    }

  };

  const handleInputChange = (e: any) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      ...state,
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  return (
    <>
      {state.tags.map((tag, index) => {

        return (
          // <Input
          //   ref={inputRef}
          //   key={tag}
          //   size="small"
          //   className="tag-input"
          //   value={state.editInputValue}
          //   onChange={handleEditInputChange}
          //   onBlur={handleEditInputConfirm}
          //   onPressEnter={handleEditInputConfirm}
          // />

          // })}
          <Tag className={classes.tag} key={index}>{tag}</Tag>
        )
      })}
      {state.inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={state.inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {newTag && !state.inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}

    </>
  )
}


export default Tags
