import React from 'react'

export const EditTodo = ({ currentTodo, handleSave, handleChange, handleClose }) => {
  return (
    <div className="popup">
    <div className="popup-inner">
      <h2>Edit Todo</h2>
      <textarea
        value={currentTodo.description}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClose}>Cancel</button>
    </div>
  </div>
  )
}
export default EditTodo