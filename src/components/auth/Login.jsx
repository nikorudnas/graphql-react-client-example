// Import modules
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './Login.css';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import logger from '../utils/logger';
import { hasToken } from '../utils/token';

// Login mutation
// Send: email, password
// Recieve: JWT
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Login component
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    // On mount, check if token exists in localstorage. Else redirect user to login page

    const { history } = this.props;
    hasToken(history);
  }

  // Handle input changes
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // Handle login -button submit
  async handleSubmit(e, login) {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      // If login was succesful, add token to localstorage
      localStorage.setItem('token', data.login.token);
      const { history } = this.props;
      // Redirect user to Home -page
      history.push('/');
    } catch (error) {
      logger(error);
    }
  }

  render() {
    const { email, password, inputError } = this.state;
    return (
      <Mutation mutation={LOGIN}>
        {(login, { loading, error }) => (
          <div className="Login-Container">
            <form onSubmit={async e => this.handleSubmit(e, login)}>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoFocus
                error={inputError}
                required
                value={email}
                onChange={this.handleChange('email')}
              />
              <br />
              <TextField
                label="Password"
                type="password"
                name="password"
                error={inputError}
                required
                value={password}
                onChange={this.handleChange('password')}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                value="submit"
                type="submit"
              >
                Log in
              </Button>
              <br />
              <br />

              <Link to="/signup" href="/signup">
                Create new user
              </Link>
            </form>
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
      </Mutation>
    );
  }
}

// Define proptypes
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
