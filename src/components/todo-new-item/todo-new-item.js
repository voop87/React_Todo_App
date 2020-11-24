import React, { Component } from 'react';

import './todo-new-item.css';

export default class TodoNewItem extends Component {

  render() {
    return (
      <div className='container'>
        <form
          className='new-item-form'
          action='#'
          onSubmit={(evt) => {
            evt.preventDefault();
            const newTaskText = document.querySelector('.new-item-input').value;
            this.props.onAdded(newTaskText)
            document.querySelector('.new-item-input').value = '';
            }}>
          <input className='new-item-input' type='text' placeholder='Enter your taskname here'/>
          <button 
            className='new-item-btn visually-hidden' 
            type='submit'
            aria-label='Add new task'></button>
        </form>
      </div>
    );
  };
};