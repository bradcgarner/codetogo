import React from 'react';
import { shallow, mount } from 'enzyme';
import Reason from '../components/quiz/reason';

describe('Reason component', () => {
  const renderedComponent = shallow(<Reason 
    reason={''} 
  />);

  it('Smoke test - Reason should render', () => {
    renderedComponent
  });
});