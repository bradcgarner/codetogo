import React from 'react';
import { shallow, mount } from 'enzyme';
import { SettingsModal, mapStateToProps } from '../components/header/settings-modal';
import { initialQuiz, initialUser } from '../reducers/initialState';

describe('SettingsModal component', () => {
  const renderedComponent = shallow(<SettingsModal 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - SettingsModal should render', () => {
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