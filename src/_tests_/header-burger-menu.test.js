import React from 'react';
import { shallow, mount } from 'enzyme';
import { BurgerMenu, mapStateToProps } from '../components/header/burger-menu';
import { initialDisplay, initialQuiz, initialUser } from '../reducers/initialState';

describe('BurgerMenu component', () => {

  let calls = 1;
  const spy = jest.fn();

  const renderedComponent = shallow(<BurgerMenu 
    display={initialDisplay} 
    quiz={initialQuiz} 
    user={initialUser} 
    match={{url: '/'}}
    dispatch={spy}
    history={[]}
  />);

  const renderedComponentWithUser = shallow(<BurgerMenu 
    display={initialDisplay} 
    quiz={initialQuiz} 
    user={{...initialUser, id: 3}} 
    match={{url: '/'}}
    dispatch={spy}
    history={[]}
  />);

  it('Smoke test - BurgerMenu should render', () => {
    renderedComponent
  });

  it('Should map state to props', () => {
    const state = {
      display: initialDisplay,
      quiz:initialQuiz,
      user:initialUser,
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });

  it('should click login button', () => {
    expect(renderedComponentWithUser.find('.loginButton').simulate('click'));
    expect(spy.mock.calls.length).toBe(calls);
    calls++;
  });

  // this uses Link
  it.skip('should click about button', () => {
    expect(renderedComponent.find('.profileButton').simulate('click'));
    expect(spy.mock.calls.length).toBe(calls);
    calls++;  
  });

  // this uses Link
  it.skip('should click about button', () => {
    expect(renderedComponent.find('.quizListButton').simulate('click'));
    expect(spy.mock.calls.length).toBe(calls);
    calls++;  
  });

  it('should click about button', () => {
    expect(renderedComponent.find('.aboutButton').simulate('click'));
    expect(spy.mock.calls.length).toBe(calls);
    calls++;  
  });

  it('should click about button', () => {
    expect(renderedComponent.find('.settingsButton').simulate('click'));
    expect(spy.mock.calls.length).toBe(calls);
    calls++;
  });

  it('Should map state to props', () => {
    const state = {
      display: initialDisplay, 
      quiz: initialQuiz, 
      user: initialUser, 
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});