import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header';
import Landing from './components/landing/landing';
import User from './components/user/user';
import Lists from './components/lists/lists';
import Quiz from  './components/quiz/quiz';
import Modal from  './components/display/modal';
import Loading from  './components/display/loading';
import NoMatch from  './components/display/nomatch';

export function App(props) {

  const modal = props.display.modal ? <Modal fn={()=>{}}/> : '' ;
  const loading = props.display.loading ? <Loading fn={()=>{}}/> : '' ;

  return (
    <BrowserRouter>
      <div className="App">
        <main className="main">
          <Switch>
            <Route exact path ='/'        component={Landing}/>
            <Route path =      '/users'   component={User}/>
            <Route exact path ='/lists'   component={Lists}/>
            <Route exact path ='/quizzes' component={Quiz}/>
            <Route                        component={NoMatch}/>
          </Switch>
        </main>
        <Route path = '*'                 component={Header}/>
      {modal}
      {loading}
    </div>
    </BrowserRouter>
  );
}

// remove after testing; this component does not need all these props!
export const mapStateToProps = state => ({
  activity: state.activity, 
  badges: state.badges,
  display: state.display,
  general: state.general,
  questions: state.questions,
  quiz: state.quiz,
  quizList: state.quizList,
  user: state.user,
})

export default connect(mapStateToProps)(App);
