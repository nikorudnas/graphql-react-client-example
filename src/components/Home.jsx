// Import modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateTodo from './content/CreateTodo';
import TodoItems from './content/TodoList';
import Logout from './auth/Logout';
import { tokenExists } from './utils/token';

// Styles
const styles = {
  home: {
    textAlign: 'center',
    flex: 1,
  },
};

// Home container for components
export class Home extends Component {
  // On mount, check if token exists in localstorage. Else redirect user to login page
  componentDidMount() {
    const { history } = this.props;
    tokenExists(history);
  }

  render() {
    return (
      <div className="Home" style={styles.home}>
        <Logout />
        <h1>List of Todos:</h1>
        <CreateTodo />
        <TodoItems />
      </div>
    );
  }
}

// Define proptypes
Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Home);
