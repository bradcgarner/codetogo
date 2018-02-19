// display is not data; it is display status of screen (modal, loading, etc.)

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import 'whatwg-fetch';

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = message => ({
  type: SHOW_MODAL,
  message, 
  loading: false,  
})

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = message => ({
  type: CLOSE_MODAL,
  message,   
})

export const SHOW_LOADING = 'SHOW_LOADING';
export const showLoading = () => ({
  type: SHOW_LOADING,
})

export const CLOSE_LOADING = 'CLOSE_LOADING';
export const closeLoading = () => ({
  type: CLOSE_LOADING,
})

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@
