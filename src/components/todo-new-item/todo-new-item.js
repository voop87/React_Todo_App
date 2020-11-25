import React, { Component } from 'react';

import './todo-new-item.css';

export default class TodoNewItem extends Component {
  state = {
    label: ''
  };

  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value
    })
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <div className='container'>
        <form
          className='new-item-form'
          action='#'
          onSubmit={this.onSubmit}>
          <input
            className='new-item-input'
            type='text'
            placeholder='Enter your taskname here'
            onChange={this.onLabelChange}
            value={this.state.label}/>
          <button 
            className='new-item-btn visually-hidden' 
            type='submit'
            aria-label='Add new task'></button>
        </form>
      </div>
    );
  };
};