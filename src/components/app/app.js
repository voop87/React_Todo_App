import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoNewItem from '../todo-new-item';
import Todolist from '../todo-list';
import TodoFilter from '../todo-filter';

import './app.css';

export default class App extends Component {
  nextId = Date.now();

  state = {
    todoData: []
  };

  componentDidMount() {
    if (localStorage.getItem('todos')) {
      this.setState(({todoData}) => {
        const storageData = JSON.parse(localStorage.getItem('todos'));
  
        return {
          todoData: storageData
        }
      });
    }
  };

  toggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};

      const newArr = [
        ...todoData.slice(0, idx),
        newItem, 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      }
    });
  };

  createTask(label) {
    return {
      label,
      done: false,
      id: this.nextId++
    };
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newTask
      ];
      return {
        todoData: newArr
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      };
    });
  };

  checkAllDone = () => {
    this.setState(({todoData}) => {
      const newArr = todoData.map((el) => {
        const newEl = {...el, done: true};
        return newEl;
      });

      return {
        todoData: newArr
      }
    });
  };

  clearCompleted = () => {
    this.setState(({todoData}) => {
      const newArr = todoData.filter((el) => !el.done);

      return {
        todoData: newArr
      }
    });
  };

  clearClasses = () => {
    const listItems = document.querySelectorAll('.todo-item');
    listItems.forEach((el) => {
      el.classList.remove('d-none');
    });
    const filters = document.querySelectorAll('.filter__input');
    filters.forEach((el) => {
      el.classList.remove('active');
    });
  };

  filterAllClick = () => {
    this.clearClasses();
    const filterAll = document.getElementById('all');
    filterAll.classList.add('active');
  };

  filterTodoClick = () => {
    this.clearClasses();
    const listItems = document.querySelectorAll('.todo-item.done');
    listItems.forEach((el) => {
      el.classList.add('d-none');
    });
    const filterTodo = document.getElementById('todo');
    filterTodo.classList.add('active');
  };

  filterCompletedClick = () => {
    this.clearClasses();
    const listItems = document.querySelectorAll('.todo-item');
    listItems.forEach((el) => {
      if (!el.classList.contains('done')) {
        el.classList.add('d-none');
      }
    });
    const filterCompleted = document.getElementById('completed');
    filterCompleted.classList.add('active');
  };

  componentDidUpdate() {
    console.log(this.state.todoData);
    localStorage.setItem('todos', JSON.stringify(this.state.todoData));
  }

  render() {
    const toDoCount = this.state.todoData.length - this.state.todoData.filter((el) => el.done).length;

    return (
      <div className='app-container'>
        <AppHeader />
        <TodoNewItem onAdded={this.addTask}/>
        <Todolist
          todos={this.state.todoData}
          onDeleted={this.deleteTask}
          onToggleDone={this.toggleDone}/>
        <TodoFilter 
          tasksLeft={toDoCount}
          onCheckAllDone={this.checkAllDone}
          hasDoneTask={toDoCount !== this.state.todoData.length}
          onClearCompleted={this.clearCompleted}
          onFilterAllClick={this.filterAllClick}
          onFilterTodoClick={this.filterTodoClick}
          onFilterCompletedClick={this.filterCompletedClick}/>
      </div>
    );
  };
};