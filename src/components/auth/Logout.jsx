import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class Logout extends Component {
  logout = () => {
    localStorage.clear();
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ margin: 10 }}
          variant="raised"
          color="secondary"
          onClick={() => this.logout()}
        >
          Logout
        </Button>
      </div>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Logout);
