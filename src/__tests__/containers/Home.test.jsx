import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from '../../enzyme';
import { Home } from '../../components/Home';

const setup = propOverrides => {
  const history = { push: jest.fn() };
  const props = Object.assign(
    {
      history,
    },
    propOverrides,
  );

  const shallowObj = shallow(<Home {...props} />);

  return {
    props,
    shallowObj,
  };
};

describe('Home component', () => {
  const { shallowObj } = setup({});

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* This needs some more tempering
  it('matches the snapshot', () => {
    const tree = renderer.create(shallowObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  */

  it('renders TodoList with classes/elements', () => {
    expect(shallowObj.find('.Home')).toHaveLength(1);
  });
});
