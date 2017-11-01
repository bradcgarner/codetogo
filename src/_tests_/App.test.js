import React from 'react';
import ReactDOM from 'react-dom';
import { shalow, mount, render } from 'enzyme';

import App from '../App';


it.skip('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  expect(shallow(<App />).contains(<div className="App"></div>)).toBe(true);
});
