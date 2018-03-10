import { combineReducers } from 'redux';
import { reducer as activity } from './activity';
import { reducer as badges } from './badges';
import { reducer as display } from './display';
import { reducer as general } from './general';
import { reducer as questions } from './questions';
import { reducer as quiz } from './quiz';
import { reducer as quizList } from './quizList';
import { reducer as user } from './user';
import { reducer as scoringObject } from './scoring-object';
import { reducer as form } from 'redux-form';

export default combineReducers ({
  activity,
  badges,
  display,
  general,
  questions,
  quiz, 
  quizList,
  scoringObject,
  user,
  form,
});

// for testing
export {activity, badges, display, general, questions, quiz, quizList, scoringObject, user, form}