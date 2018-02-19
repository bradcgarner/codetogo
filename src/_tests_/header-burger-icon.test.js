import React from 'react';
import { shallow, mount } from 'enzyme';
import { BurgerIcon } from '../components/header/burger-icon';

describe('BurgerIcon component', () => {
  const renderedComponent = shallow(<BurgerIcon />);

  it('Smoke test - BurgerIcon should render', () => {
    renderedComponent
  });
});