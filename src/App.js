import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header';
import Landing from './components/landing/landing';
import User from './components/user/user';
import Lists from './components/lists/lists';
import Quiz from  './components/quiz/quiz';
import Modal from  './components/display/modal';
import NoMatch from  './components/display/nomatch';

// REFACTOR: instead of this long switch, 
// create an object Component[props.mode.view]
// with all components keyed to view

export function App(props) {

  const modal = props.display.modal ? <Modal /> : '' ;

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
    </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display
})

export default connect(mapStateToProps)(App);
