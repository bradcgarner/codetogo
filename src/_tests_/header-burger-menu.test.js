import React from 'react';
import { shallow, mount } from 'enzyme';
import { BurgerMenu, mapStateToProps } from '../components/header/burger-menu';
import { initialDisplay, initialQuiz, initialUser } from '../reducers/initialState';

describe('BurgerMenu component', () => {
  const renderedComponent = shallow(<BurgerMenu 
    display={initialDisplay} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - BurgerMenu should render', () => {
    renderedComponent
  });
});