import React from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }
  onChangeHandler = evt => {
    const { value } =evt.target
    this.setState({ ...this.state, todoNameInput: value})
  }
  resetForm = () => this.setState({...this.state, todoNameInput: "" })
  
  setAxiosResponseError = err => this.setState({...this.state, error: err.response.data.message })
  
  PostNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput})
    .then( res => {
      this.setState({...this.state, todos: this.state.todos.concat() })
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  onFormsubmit = (evt) => {
    evt.preventDefault()
    this.PostNewTodo
  }

  fetchAllTodos =() => {
    axios.get(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
  }
  toggleCompleted = id => () => {
    axios.patch(URL)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })})
    })
    .catch(this.setAxiosResponseError)
  }
  componentDidMount() {
    this.fetchAllTodos
  }

  render() {
    return (
      <div>
       <div id="error">Error: {this.state.error}</div>
        <h2>Todos:</h2>
        {
          this.state.todos.map(td => {
            return <div OnClick={this.toggleCompleted(td.id)}key ={td.id}>{td.name} {td.completed ? "" : '✔️'} </div>
          })
        }
      <div>
        <form id="todoForm" onSubmit={this.onFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onChangeHandler}></input>
          <input type='submit'></input>

        </form>
      </div>
      </div>
    )
  }
}
