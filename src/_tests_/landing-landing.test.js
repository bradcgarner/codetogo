import React from 'react';
import { shallow, mount } from 'enzyme';
import Landing from '../components/landing/landing';

describe('Landing component', () => {
  const renderedComponent = shallow(<Landing />);

  it('Smoke test - Landing should render', () => {
    renderedComponent
  });
});