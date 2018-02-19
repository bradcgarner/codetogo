import React from 'react';
import { shallow, mount } from 'enzyme';
import { SpacedRepGraphic, mapStateToProps } from '../components/quiz/space-rep-graphic';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('SpacedRepGraphic component', () => {
  const renderedComponent = shallow(<SpacedRepGraphic 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - SpacedRepGraphic should render', () => {
    renderedComponent
  });
});