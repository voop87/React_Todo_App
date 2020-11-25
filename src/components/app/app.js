import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoNewItem from '../todo-new-item';
import Todolist from '../todo-list';
import TodoFilter from '../todo-filter';

import './app.css';

export default class App extends Component {
  nextId = Date.now();

  state = {
    todoData: [],
    filter: 'all'
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

  filterTasks = (items, filterName) => {
    switch (filterName) {
      case 'all':
        return items;
      case 'todo': 
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  changeActiveFilter = (filter) => {
    this.setState({filter})
  };

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todoData));
  }

  render() {
    const toDoCount = this.state.todoData.length - this.state.todoData.filter((el) => el.done).length;
    const visibleItems = this.filterTasks(this.state.todoData, this.state.filter);
    
    return (
      <div className='app-container'>
        <AppHeader />
        <TodoNewItem onAdded={this.addTask}/>
        <Todolist
          todos={visibleItems}
          onDeleted={this.deleteTask}
          onToggleDone={this.toggleDone}/>
        <TodoFilter 
          tasksLeft={toDoCount}
          onCheckAllDone={this.checkAllDone}
          hasDoneTask={toDoCount !== this.state.todoData.length}
          onClearCompleted={this.clearCompleted}
          filter={this.state.filter}
          onChangeFilter={this.changeActiveFilter}
          />
      </div>
    );
  };
};