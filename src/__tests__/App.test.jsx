import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
// import renderer from 'react-test-renderer';
// import { shallow } from '../enzyme';
import App from '../App';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

describe('Renders router', () => {
  /* Not quite working yet
  it('matches the snapshot', () => {
    const tree = renderer.create(shallowObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  */

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
