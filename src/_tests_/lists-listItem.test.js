import React from 'react';
import { shallow, mount } from 'enzyme';
import { ListItem, mapStateToProps } from '../components/lists/listItem';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('ListItem component', () => {
  const renderedComponent = shallow(<ListItem 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - ListItem should render', () => {
    renderedComponent
  });
});