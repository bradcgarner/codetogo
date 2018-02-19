import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header, mapStateToProps } from '../components/header/header';
import { initialQuiz, initialUser } from '../reducers/initialState';

describe('Header component', () => {
  const renderedComponent = shallow(<Header 
    quiz={initialQuiz} 
    user={initialUser} 
    match={{url: ''}}
    history={['']}
    dispatch={jest.fn()}
  />);

  it('Smoke test - Header should render', () => {
    renderedComponent
  });

  it('Should map state to props', () => {
    const state = {
      quiz: initialQuiz, 
      user: initialUser, 
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});