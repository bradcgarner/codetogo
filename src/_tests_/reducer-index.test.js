import * as actions from '../actions/quiz';
import {activity, badges, display, general, questions, quiz, quizList, user, form} from '../reducers/index';

describe('reducer - index', () => {

  it('combine reducer test - activity', () => {
    expect(typeof activity).toEqual('function');
  });

  it('combine reducer test - badges', () => {
    expect(typeof badges).toEqual('function');
  });

  it('combine reducer test - display', () => {
    expect(typeof display).toEqual('function');
  });

  it('combine reducer test - general', () => {
    expect(typeof general).toEqual('function');
  });

  it('combine reducer test - questions', () => {
    expect(typeof questions).toEqual('function');
  });

  it('combine reducer test - quiz', () => {
    expect(typeof quiz).toEqual('function');
  });

  it('combine reducer test - quizList', () => {
    expect(typeof quizList).toEqual('function');
  });

  it('combine reducer test - user', () => {
    expect(typeof user).toEqual('function');
  });

  it('combine reducer test - form', () => {
    expect(typeof form).toEqual('function');
  });

});