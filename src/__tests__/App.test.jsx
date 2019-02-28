/* eslint no-undef: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Test</div>;

// Dummytest to check that tests should generally work
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
