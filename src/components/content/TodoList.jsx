// Import modules
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import TodoItem from './TodoItem';

// allTodos query
// Send: JWT
// Recieve: array of todos
const ALLTODOS = gql`
  query allTodos {
    allTodos {
      _id
      title
      description
      completed
    }
  }
`;

// Styles
const styles = {
  todo_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  todo_item: {
    margin: 10,
    width: 300,
  },
  hr: {
    maxWidth: 800,
  },
};

// Sort the uncompleted todos so that most recent are first
function sortUncompletedTodos(todos) {
  const sortedUncompletedTodos = [];
  todos.forEach(todo => {
    if (!todo.completed) {
      sortedUncompletedTodos.unshift(todo);
    }
  });
  return sortedUncompletedTodos;
}

// Sort the completed todos so that most recent are first
function sortCompletedTodos(todos) {
  const sortedCompletedTodos = [];
  todos.forEach(todo => {
    if (todo.completed) {
      sortedCompletedTodos.unshift(todo);
    }
  });
  return sortedCompletedTodos;
}

// Todolist component. Pure
// Map the todos and return own containers for uncompleted and completed
export const TodoList = () => (
  <Query query={ALLTODOS}>
    {({ loading, error, data }) => (
      <div className="Todos-Container">
        <h2>UNCOMPLETED: </h2>
        <div style={styles.todo_container}>
          {data.allTodos &&
            sortUncompletedTodos(data.allTodos).map(item => (
              <div key={item._id} style={styles.todo_item}>
                <TodoItem item={item} />
              </div>
            ))}
        </div>
        <br />
        <div style={{ margin: 10 }}>
          <hr style={styles.hr} />
        </div>
        <h2>COMPLETED: </h2>
        <div style={styles.todo_container}>
          {data.allTodos &&
            sortCompletedTodos(data.allTodos).map(item => (
              <div key={item._id} style={styles.todo_item}>
                <TodoItem item={item} />
              </div>
            ))}
        </div>
        {loading && <LoaderHandler />}
        {error && (
          <ErrorHandler
            message={
              error.graphQLErrors[0].message
                ? error.graphQLErrors[0].message
                : error.toString()
            }
          />
        )}
      </div>
    )}
  </Query>
);

export default TodoList;
