// Import modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// Logout component
class Logout extends Component {
  // Clear localstorage & client cache and send user to Login -page
  logout = () => {
    localStorage.clear();
    const { history, client } = this.props;
    history.push('/login');
    client.resetStore();
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="secondary"
          onClick={() => this.logout()}
        >
          Logout
        </Button>
      </div>
    );
  }
}

// Define proptypes
Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

// Export withApollo and router, to access client cache and redirect user
export default withApollo(withRouter(Logout));
