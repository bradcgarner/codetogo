import React from 'react';
import { shallow, mount } from 'enzyme';
import { BurgerIcon } from '../components/header/burger';

describe('BurgerIcon component', () => {
  const renderedComponent = shallow(<Burger />);

  it('Smoke test - BurgerIcon should render', () => {
    renderedComponent
  });
});