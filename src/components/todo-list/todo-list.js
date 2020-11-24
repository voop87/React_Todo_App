import React from 'react';
import TodolistItem from '../todo-list-item';
import './todo-list.css';

const Todolist = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    return (
      <TodolistItem
        key={item.id}
        id={item.id}
        label={item.label}
        done={item.done}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
      /> 
    );
  });

  return (
    <ul className='todo-list'>
      { elements }
    </ul>
  );
};

export default Todolist;