import React from 'react';
import { shallow, mount } from 'enzyme';
import { Lists, mapStateToProps } from '../components/lists/lists';
import { initialGeneral, initialQuizList, initialUser } from '../reducers/initialState';

describe('Lists component', () => {
  const renderedComponent = shallow(<Lists 
    general={initialGeneral}
    quizList={initialQuizList}
    user={initialUser} 
    history={['']}
  />);

  it('Smoke test - Lists should render', () => {
    renderedComponent
  });
});