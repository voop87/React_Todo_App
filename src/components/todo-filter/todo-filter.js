import React from 'react';

import './todo-filter.css';

const TodoFilter = ({ tasksLeft, onCheckAllDone, onClearCompleted,
                      hasDoneTask, onFilterAllClick, onFilterTodoClick,
                      onFilterCompletedClick }) => {
  let classNames = 'filter__btn';
  if (!hasDoneTask) {
    classNames += ' d-none';
  }

  return (
    <div className='filter'>
      <div className='container'>
        <button 
          className='filter__btn'
          id='check-all-btn'
          type='button'
          onClick={onCheckAllDone}>{tasksLeft} tasks left</button>
        <ul className='filter__list'>
          <li className='filter__item'>
            <input className='filter__input active visually-hidden' type='radio' name='filter' id='all'/>
            <label
              className='filter__label'
              htmlFor='all'
              onClick={onFilterAllClick}>All</label>
          </li>
          <li className='filter__item'>
            <input className='filter__input visually-hidden' type='radio' name='filter' id='todo'/>
            <label
              className='filter__label'
              htmlFor='todo'
              onClick={onFilterTodoClick}>ToDo</label>
          </li>
          <li className='filter__item'>
            <input className='filter__input visually-hidden' type='radio' name='filter' id='completed'/>
            <label
              className='filter__label'
              htmlFor='completed'
              onClick={onFilterCompletedClick}>Completed</label>
          </li>
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

export default TodoFilter;