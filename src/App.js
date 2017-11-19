import React from 'react';
import { connect } from 'react-redux';

import Header from './components/header';
import Landing from './components/landing';
import About from './components/about';
import Login from './components/login';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import QuizList from './components/quizlist';
import Quiz from  './components/quiz';
import Modal from  './components/modal';

export function App(props) {

  const modal = props.mode.modal === 'open' ? <Modal /> : '' ;

  let mode = <Landing />;
  switch(props.mode.view) {
    case 'about':
      mode = <About />;
      break;
    case 'login':
      mode = <Login />;
      break;
    case 'profile':
      mode = <Profile />;
      break;
    case 'dashboard':
      mode = <Dashboard />;
      break;
    case 'quizlist':
      mode = <QuizList />;
      break;
    case 'question':
      mode = <Quiz />;
      break;
    case  'results':
      mode = <Quiz />;
      break;
    case 'accuracy': // question asks question, accuracy layers on user' choice, layers on correct answer
      mode = <Quiz />;
      break;
    case 'key':
      mode = <Quiz />;
      break;
    default:
      mode = <Landing />;
  }
  
  return (
    <div className="App">
      {modal}
      <Header />
      <main className="main">
      {mode}
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(App);
