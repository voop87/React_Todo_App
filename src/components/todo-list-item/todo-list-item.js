import React, { Component } from 'react';

import './todo-list-item.css';


export default class TodolistItem extends Component {

  render() {
    const { id, label, done, onDeleted, onToggleDone } = this.props;

    let classNames = 'todo-item';
    if (done) {
      classNames += ' done';
    }
    
    return (
      <li className={classNames}>
        <div className='container'>
          <input className='todo-item__check visually-hidden' type='checkbox' id={ id }/>
          <label 
            className='todo-item__check-label'
            htmlFor={ id }
            onClick={ onToggleDone }>
            <i className='fa fa-check'></i>
            { label }
          </label>
          <button
            className='todo-item__del-btn'
            type='button'
            onClick={ onDeleted }>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </li>
    );
  };
}