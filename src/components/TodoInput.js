import React from 'react'
import { useState } from 'react'

function TodoInput(props) {
  const [inputText,setInputText] = useState('');
  const handleEnterPress = (e)=>{
    if(e.keyCode === 13 ){
      props.addList(inputText)
      setInputText("")
    }
  }
  return (
    <div>
      <div className="input-container"></div>
      <input type="text" className="input-box-todo" placeholder="ENTER  TO  DO" value={inputText}
      onChange={e=>
        setInputText(e.target.value)
      }
      onKeyDown={handleEnterPress}
      />
      <button className='add-btn'
      onClick={()=>{
        props.addList(inputText)
        setInputText("")
      }}>+</button>
    </div>
  )
}

export default TodoInput