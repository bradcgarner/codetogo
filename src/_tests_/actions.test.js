import * as actionsMode from '../actions/mode';
import * as actionsUser from '../actions/users';
import * as actionsQuiz from '../actions/quiz';

describe('ACTIONS', () => {
  it('Should be landing', () => {
      const action = actionsMode.gotoLanding();
      expect(action.type).toEqual('GOTO_LANDING');
      expect(action.view).toEqual('landing');
  });

  it('Should be about', () => {
    const action = actionsMode.gotoAbout();
    expect(action.type).toEqual('GOTO_ABOUT');
    expect(action.view).toEqual('about');
  });

  it('Should be login', () => {
    const action = actionsMode.gotoLogin();
    expect(action.type).toEqual('GOTO_LOGIN');
    expect(action.view).toEqual('login');
  });

  it('Should be profile', () => {
    const action = actionsMode.gotoProfile();
    expect(action.type).toEqual('GOTO_PROFILE');
    expect(action.view).toEqual('profile');
  });

  it('Should be dashboard', () => {
    const action = actionsMode.gotoDashboard();
    expect(action.type).toEqual('GOTO_DASHBOARD');
    expect(action.view).toEqual('dashboard');
  });

  it('Should be quizlist', () => {
    const action = actionsMode.gotoQuizlist();
    expect(action.type).toEqual('GOTO_QUIZLIST');
    expect(action.view).toEqual('quizlist');
  });

  it('Should be question', () => {
    const action = actionsMode.gotoQuestion();
    expect(action.type).toEqual('GOTO_QUESTION');
    expect(action.view).toEqual('question');
  });

  it('Should be results', () => {
    const action = actionsMode.gotoResults();
    expect(action.type).toEqual('GOTO_RESULTS');
    expect(action.view).toEqual('results');
  });

  it('Should be accuracy', () => {
    const action = actionsMode.gotoAccuracy();
    expect(action.type).toEqual('GOTO_ACCURACY');
    expect(action.view).toEqual('accuracy');
  });

  it('Should be answer', () => {
    const action = actionsMode.gotoAnswer();
    expect(action.type).toEqual('GOTO_ANSWER');
    expect(action.view).toEqual('answer');
  });

  it('Should be open modal', () => {
    const action = actionsMode.showModal('message');
    expect(action.type).toEqual('SHOW_MODAL');
    expect(action.modal).toEqual('open');
    expect(action.message).toEqual('message');
  });

  it('Should close modal', () => {
    const action = actionsMode.closeModal();
    expect(action.type).toEqual('CLOSE_MODAL');
    expect(action.modal).toEqual('close');
  });

  it('Should toggle burger', () => {
    const action = actionsMode.toggleBurger(true);
    expect(action.type).toEqual('TOGGLE_BURGER');
    expect(action.burger).toEqual(false);
  });
  
});