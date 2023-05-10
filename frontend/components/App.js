import axios from 'axios';
import React from 'react';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    todoName: '',
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const response = await axios.get(URL);
      const todos = Array.isArray(response.data) ? response.data : [];
      this.setState({ todos });
    } catch (error) {
      console.error(error);
      this.setState({ todos: [] });
    }
  };
  

  addTodo = async () => {
    try {
      const response = await axios.post(URL, { name: this.state.todoName });
      this.setState(prevState => ({ todos: [...prevState.todos, response.data], todoName: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  handleChanges = e => {
    this.setState({ todoName: e.target.value });
  };

  toggleCompleted = async todoId => {
    try {
      const response = await axios.patch(`${URL}/${todoId}`);
      if (response.status === 200) {
        this.setState(prevState => ({
          todos: prevState.todos.map(todo => (todo.id === todoId ? response.data : todo)),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  filterCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    return (
      <div>
        <Form
          addTodo={this.addTodo}
          handleChanges={this.handleChanges}
          todoName={this.state.todoName}
          filterCompleted={this.filterCompleted}
        />
        <TodoList todos={this.state.todos} toggleCompleted={this.toggleCompleted} />
      </div>
    );
  }
}
