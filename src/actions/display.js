// display is not data; it is display status of screen (modal, loading, etc.)

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = message => ({
  type: SHOW_MODAL,
  message, 
  loading: false,  
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = message => ({
  type: CLOSE_MODAL,
  message,   
});

export const SHOW_LOADING = 'SHOW_LOADING';
export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const CLOSE_LOADING = 'CLOSE_LOADING';
export const closeLoading = () => ({
  type: CLOSE_LOADING,
});

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const toggleSettings = () => ({
  type: TOGGLE_SETTINGS,
});

export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';
export const toggleAbout = () => ({
  type: TOGGLE_ABOUT,
});

export const TOGGLE_SPACED_REP_GRAPHIC = 'TOGGLE_SPACED_REP_GRAPHIC';
export const toggleSpacedRepGraphic = () => ({
  type: TOGGLE_SPACED_REP_GRAPHIC,
});

export const TOGGLE_RESULTS_MODAL = 'TOGGLE_RESULTS_MODAL';
export const toggleResultsModal = () => ({
  type: TOGGLE_RESULTS_MODAL,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@
