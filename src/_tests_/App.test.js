import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { initialActivity, initialBadges, initialDisplay, initialGeneral, initialQuestions, initialQuiz, initialQuizList, initialUser } from '../reducers/initialState';

import { App, mapStateToProps } from '../App';

describe('App component', () => {
  const renderedComponent = shallow(<App 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    quizList={initialQuizList}
    user={initialUser} 
  />);

  it('renders without crashing', () => {
    renderedComponent
  });
  
  it.skip('contains an App div', () => {
    // expect().contains is not a function
    expect(renderedComponent).contains(<div className="App"></div>);
  });
})

