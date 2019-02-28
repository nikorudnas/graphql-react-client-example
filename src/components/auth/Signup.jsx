// Import modules
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './Signup.css';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import logger from '../utils/logger';
import { hasToken } from '../utils/token';

// Signup mutation
// Send: email, password
// Recieve: JWT
const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

// Signup component
class Signup extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    inputPasswordError: false,
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

  // Handle signup -button submit
  async handleSubmit(e, login) {
    e.preventDefault();

    const { email, password, password2 } = this.state;

    // Compare if the pw and retyped-pw matches
    if (password === password2) {
      try {
        const { data } = await login({
          variables: {
            email,
            password,
          },
        });

        // If signup was successful, add token to localstorage as for 'log in' and redirect user to Home -page
        localStorage.setItem('token', data.signup.token);
        this.setState({ inputPasswordError: false });
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        logger(error);
      }
    } else {
      this.setState({ inputPasswordError: true });
    }
  }

  render() {
    const { email, password, password2, inputPasswordError } = this.state;
    return (
      <Mutation mutation={SIGNUP}>
        {(signup, { loading, error }) => (
          <div className="Signup-Container">
            <form onSubmit={async e => this.handleSubmit(e, signup)}>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoFocus
                required
                value={email}
                onChange={this.handleChange('email')}
              />
              <br />
              <br />
              <TextField
                label="Password"
                type="password"
                name="password"
                inputProps={{ minLength: 6 }}
                error={inputPasswordError}
                required
                value={password}
                onChange={this.handleChange('password')}
              />
              <br />
              <br />
              <TextField
                label="Repeat the password"
                type="password"
                name="password2"
                inputProps={{ minLength: 6 }}
                error={inputPasswordError}
                required
                value={password2}
                onChange={this.handleChange('password2')}
              />
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="submit"
              >
                Create new user
              </Button>
              <br />
              <br />

              <Link to="/login" href="/login">
                Log in
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
Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Signup);
