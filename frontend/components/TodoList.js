import React from 'react';
import Todo from './Todo';

 class TodoList extends React.Component {
  render() {
    return (
      <div>
      <div id="todos"></div>
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc, td) => {
            if (this.state.displayCompleted || !td.completed) return acc.concat(
              <Todo
                key ={td.id}
                toggleCompleted={this.props.toggleCompleted}
                todo={td}
              />
            )
              return acc
          }, [])
            
            
          
        }
      </div>
    );
  }
}
export default TodoList;