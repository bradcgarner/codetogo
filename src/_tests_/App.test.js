import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

import { App, mapStateToProps } from '../App';

describe('App component', () => {
  const renderedComponent = shallow(<App 
    display={initialDisplay} 
    quiz={initialQuiz} 
    questions={initialQuestions} 
    user={initialUser} 
    activity={initialActivity} 
    badges={initialBadges} 
    general={initialGeneral}
  />);

  it('renders without crashing', () => {
    renderedComponent
  });
  
  it.skip('contains an App div', () => {
    // expect().contains is not a function
    expect(renderedComponent).contains(<div className="App"></div>);
  });
})

