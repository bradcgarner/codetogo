import React from 'react';
import { shallow, mount } from 'enzyme';
import { ListItem, mapStateToProps } from '../components/lists/listItem';
import { initialQuiz, initialQuizList, initialUser } from '../reducers/initialState';

describe('ListItem component', () => {
  const renderedComponent = shallow(<ListItem 
    quiz={initialQuiz} // passed as prop, not mapStateToProps
    quizList={initialQuizList} 
    user={initialUser} 
    history={['']}
  />);

  it('Smoke test - ListItem should render', () => {
    renderedComponent
  });
});