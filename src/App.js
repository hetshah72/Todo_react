import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';
import './App.css';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ id: null, description: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const addList = (inputText) => {
    let id = new Date().getTime();
    if (inputText !== '') {
      setListTodo([...listTodo, { id: id, description: inputText, completed : false }]);
      setListTodo((prevTodos)=>{
        let updatedTodos = [...listTodo, { id: id, description: inputText,completed :false }];
        window.localStorage.setItem('todos',JSON.stringify(updatedTodos));
        return updatedTodos
      });
    }
    setCurrentTodo('')
  };

  useEffect(()=>{
    let Todosformlocalstorage = JSON.parse(window.localStorage.getItem('todos'));
    if(Todosformlocalstorage){
      setListTodo(Todosformlocalstorage);
    }
    else{
      setListTodo([]);
    }
  },[]);
  const deleteListItem = (key) => { 
    setListTodo((prevTodos)=>{
      let updatedTodos = listTodo.filter((_, index) => index !== key);
      window.localStorage.setItem('todos',JSON.stringify(updatedTodos));
      return updatedTodos;
    })
  };

  const editListItem = (key) => {
    const todoToEdit = listTodo.find((_, index) => index === key);
    setCurrentTodo({ id: key, description: todoToEdit.description });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodos = listTodo.map((todo, index) =>
      index === currentTodo.id ? { ...todo, description: currentTodo.description } : todo
    );
    setListTodo(updatedTodos);
    window.localStorage.setItem('todos',JSON.stringify(updatedTodos));
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setCurrentTodo({
      ...currentTodo,
      description: event.target.value,
    });
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  const toggleComplete = (key) => {
    const updatedTodos = listTodo.map((todo, index) =>
      index === key ? { ...todo, completed: !todo.completed } : todo
    );
    setListTodo(updatedTodos);
    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTodos = listTodo.filter(todo => 
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        <input 
          type="text" 
          className="search-box" 
          placeholder="Search todos" 
          value={searchQuery}
          onChange={handleSearchChange}
        >
        </input>
        {filteredTodos.map((listItem, i) => (
          <TodoList
            key={i}
            index={i}
            item={listItem.description}
            completed={listItem.completed}
            deleteItem={deleteListItem}
            editItem={editListItem}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
      {isEditing && (
        <EditTodo
          currentTodo={currentTodo}
          handleSave={handleSave}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;