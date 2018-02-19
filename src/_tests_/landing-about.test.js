import React from 'react';
import { shallow, mount } from 'enzyme';
import About from '../components/landing/about';

describe('About component', () => {
  const renderedComponent = shallow(<About />);

  it('Smoke test - About should render', () => {
    renderedComponent
  });
});