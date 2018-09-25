import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateTodo from './content/CreateTodo';
import TodoItems from './content/TodoList';
import Logout from './auth/Logout';

class TodoContainer extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    return (
      <div className="Home" style={{ textAlign: 'center', flex: 1 }}>
        <Logout />
        <h1>List of Todos:</h1>
        <CreateTodo />
        <TodoItems />
      </div>
    );
  }
}

TodoContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TodoContainer);
