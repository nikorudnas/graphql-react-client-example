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
      content
    }
  }
`;

// Todolist component. Pure
export const TodoList = () => (
  <Query query={ALLTODOS}>
    {({ loading, error, data }) => (
      <div>
        {data.allTodos &&
          data.allTodos.map(item => (
            <div key={item._id} style={{ margin: 10 }}>
              <TodoItem item={item} />
            </div>
          ))}
        {loading && <LoaderHandler />}
        {error && <ErrorHandler message={error.toString()} />}
      </div>
    )}
  </Query>
);

export default TodoList;
