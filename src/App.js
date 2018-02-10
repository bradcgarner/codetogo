import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header';
import Landing from './components/landing/landing';
import User from './components/user/user';
import Lists from './components/lists/lists';
import Quiz from  './components/quiz/quiz';
import Modal from  './components/display/modal';

// REFACTOR: instead of this long switch, 
// create an object Component[props.mode.view]
// with all components keyed to view

export function App(props) {

  const modal = props.display.modal ? <Modal /> : '' ;

  return (

    <BrowserRouter>
      <div className="App">
      {/* <Header history={this.props.history} /> */}
        <Switch>
          <main className="main">
            <Route path =       '/*'     component={Header}/>
            <Route exact path = '/home'  component={Landing}/>
            <Route path =       '/user'  component={User}/>
            <Route path =       '/lists' component={Lists}/>
            <Route path =       '/quiz'  component={Quiz}/>
            <Redirect from = '*' to = '/home'/>
          </main>
        </Switch>
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
