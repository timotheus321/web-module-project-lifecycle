import React from 'react';

export default class Form extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.todoName} onChange={this.props.handleChanges} />
        <button type="submit">Add Todo</button>
        <button type="button" onClick={this.props.filterCompleted}>Clear Completed</button>
      </form>
    );
  }
}
