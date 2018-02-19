import React from 'react';
import { shallow, mount } from 'enzyme';
import { SettingsModal, mapStateToProps } from '../components/header/settings-modal';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('SettingsModal component', () => {
  const renderedComponent = shallow(<SettingsModal 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - SettingsModal should render', () => {
    renderedComponent
  });
});