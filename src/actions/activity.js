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
export const  postActivity = (activity, authToken) => dispatch => { 
  
  const url = `${REACT_APP_BASE_URL}/api/activity`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
  };
  const init = { 
    method: 'PUT',
    body: JSON.stringify(activity),
    headers
  };
  // console.log('url', url, 'init', init);

  return fetch(url, init)
    .then(activityAdded => {
        if (!activityAdded.ok) {
          return Promise.reject(activityAdded.statusText);
        }
        return activityAdded.json();
    })
    .then(activity => {
      return dispatch(addActivity(activity));
    })
    .catch(err => {
      const error = typeof err === 'string' ? err :
        typeof err === 'object' && err.message ? err.message :
        'something went wrong';
      dispatch(actionsDisplay.showModal(error));        
    });
};