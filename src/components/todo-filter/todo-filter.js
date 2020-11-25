import React, { Component } from 'react';

import './todo-filter.css';

export default class TodoFilter extends Component {
  filters = [
    { id: 'all', label: 'All'},
    { id: 'todo', label: 'ToDo'},
    { id: 'completed', label: 'Completed'}
  ];

  render() {
    const { tasksLeft, onCheckAllDone, onClearCompleted,
      hasDoneTask, filter, onChangeFilter } = this.props;
    
    let classNames = 'filter__btn';
    if (!hasDoneTask) {
      classNames += ' d-none';
    }

    const filterItems = this.filters.map(({id, label}) => {
      const isActive = filter === id;
      const activeClass = isActive ? 'active' : '';
      return (
        <li className='filter__item' key={id}>
          <input className='filter__input visually-hidden' type='radio' name='filter' id={id}/>
          <label
            className={`filter__label ${activeClass}`}
            htmlFor={id}
            onClick={() => {onChangeFilter(id)}}>{label}</label>
        </li>
      );
    });

    return (
      <div className='filter'>
        <div className='container'>
          <button 
            className='filter__btn'
            id='check-all-btn'
            type='button'
            onClick={onCheckAllDone}>{tasksLeft} tasks left</button>
          <ul className='filter__list'>
            {filterItems}
          </ul>
          <button
            className={classNames}
            id='clear-completed-btn'
            type='button'
            onClick={onClearCompleted}>Clear completed</button>
        </div>
      </div>
    );
  };
};