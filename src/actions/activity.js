// activity is breadcrumbs of user's activity

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import 'whatwg-fetch';

// this expects an array of all activity, used at login
export const LOAD_ACTIVITY = 'LOAD_ACTIVITY';
export const loadActivity = activity => ({
  type: LOAD_ACTIVITY,
  activity,    
});

// this expects an object of 1 activity item, used intermittently
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const addActivity = activity => ({
  type: ADD_ACTIVITY,
  activity,    
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes; only once at load
export const  postActivity = () => dispatch => { 
  
  return fetch(`${REACT_APP_BASE_URL}/api/activity/`)
    .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
    })
    .then(activity => {
      return dispatch(addActivity(activity));
    })
    .catch(error => {
      dispatch(actionsDisplay.showModal(error));        
    });
};