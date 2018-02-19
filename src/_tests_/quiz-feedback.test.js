import React from 'react';
import { shallow, mount } from 'enzyme';
import { Feedback, mapStateToProps } from '../components/quiz/feedback';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Feedback component', () => {
  const renderedComponent = shallow(<Feedback 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Feedback should render', () => {
    renderedComponent
  });
});