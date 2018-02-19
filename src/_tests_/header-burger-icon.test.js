import React from 'react';
import { shallow, mount } from 'enzyme';
import { BurgerIcon, mapStateToProps } from '../components/header/burger-icon';
import { initialDisplay, initialUser} from '../reducers/initialState';

describe('BurgerIcon component', () => {
  const spy = jest.fn();
  const renderedComponent = shallow(<BurgerIcon 
    display={initialDisplay} 
    user={initialUser} 
    dispatch={spy}
  />);

  it('Smoke test - BurgerIcon should render', () => {
    renderedComponent
  });

  it('should click button', () => {
    expect(renderedComponent.find('.burgerIcon').simulate('click'));
    expect(spy.mock.calls.length).toBe(1);
  })

  it('Should map state to props', () => {
    const state = {
      display: initialDisplay, 
      user: initialUser, 
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});