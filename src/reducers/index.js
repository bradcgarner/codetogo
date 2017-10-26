import { combineReducers } from 'redux';
import { reducer as user } from './users';
import { reducer as quiz } from './quiz';
import { reducer as mode } from './mode';
import { reducer as form } from 'redux-form';

export default combineReducers ({
  user,
  quiz, 
  mode,
  form
})