import React from 'react';
import { shallow, mount } from 'enzyme';
import User from '../components/user/user';

describe('User component', () => {
  const renderedComponent = shallow(<User />);

  it('Smoke test - User should render', () => {
    renderedComponent
  });
});