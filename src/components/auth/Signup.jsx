// Author: Niko Rudnäs
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

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  async handleSubmit(e, login) {
    e.preventDefault();

    const { email, password, password2 } = this.state;

    if (password === password2) {
      try {
        const { data } = await login({
          variables: {
            email,
            password,
          },
        });

        localStorage.setItem('token', data.signup.token);
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Passwords does not match!');
    }
  }

  render() {
    const {
      email,
      password,
      password2,
      inputEmailError,
      inputPasswordError,
    } = this.state;
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
                error={inputEmailError}
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
                variant="raised"
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
            {error && <ErrorHandler message={error.toString()} />}
          </div>
        )}
      </Mutation>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Signup);
