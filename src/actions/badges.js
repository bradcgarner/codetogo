// badges are earned by user; this is a list of the user's badges

import { REACT_APP_BASE_URL } from '../config';
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
export const logbadge = () => dispatch => { 
  return fetch(`${REACT_APP_BASE_URL}/api/badges/`)
    .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
    })
    .then(badges => {
      return dispatch(addbadge(badge));
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));        
    });
};