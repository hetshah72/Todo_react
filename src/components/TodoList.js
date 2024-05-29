import React from 'react'

function TodoList(props) {
  return (
    <div>
      <li className="list-item">
        <p className ={`${props.completed ? 'completed':''}`} onClick={e => {props.toggleComplete(props.index)}}>
        {props.item}
        </p>
        <span className='icons'>
        <i class="fa-solid fa-pen-to-square icon-delete" onClick={e=>{
            props.editItem(props.index)
        }}>
        </i>
        <i className="fa-solid fa-trash-can icon-delete"
        onClick={e=>{
            props.deleteItem(props.index)
        }}>
        </i>
        </span>
      </li>
    </div>
  )
}

export default TodoList