import React from 'react';
import { shallow, mount } from 'enzyme';
import { ListItem, mapStateToProps } from '../components/lists/listItem';
import { initialDisplay, initialQuizList } from '../reducers/initialState';

describe('ListItem component', () => {
  const renderedComponent = shallow(<ListItem 
    quizList={initialQuizList} 
    user={initialUser} 
  />);

  it('Smoke test - ListItem should render', () => {
    renderedComponent
  });
});