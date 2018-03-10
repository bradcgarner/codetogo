// badges are earned by user; this is a list of the user's badges

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import 'whatwg-fetch';

// this expects an array of all badges, used at login
export const LOAD_BADGES = 'LOAD_BADGES';
export const loadBadges = badges => ({
  type: LOAD_BADGES,
  badges,    
});

// this expects an object of 1 badge, used intermittently
export const ADD_BADGE = 'ADD_BADGE';
export const addbadge = badge => ({
  type: ADD_BADGE,
  badge,    
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes; only once at load
export const postBadge = (badge, authToken) => dispatch => { 

  const url = `${REACT_APP_BASE_URL}/api/badges`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
  };
  const init = { 
    method: 'PUT',
    body: JSON.stringify(badge),
    headers
  };

  return fetch(url, init)
    .then(badgeAdded => {
        if (!badgeAdded.ok) {
          return Promise.reject(badgeAdded.statusText);
        }
        return badgeAdded.json();
    })
    .then(badge => {
      // check data type here first, needs to be array
      return dispatch(addbadge(badge));
    })
    .catch(err => {
      const error = typeof err === 'string' ? err :
        typeof err === 'object' && err.message ? err.message :
        'something went wrong';
      dispatch(actionsDisplay.showModal(error));        
    });
};