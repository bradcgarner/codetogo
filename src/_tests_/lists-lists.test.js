import React from 'react';
import { shallow, mount } from 'enzyme';
import { Lists, mapStateToProps } from '../components/lists/lists';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Lists component', () => {
  const renderedComponent = shallow(<Lists 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Lists should render', () => {
    renderedComponent
  });
});