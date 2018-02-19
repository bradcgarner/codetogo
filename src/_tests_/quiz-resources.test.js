import React from 'react';
import { shallow, mount } from 'enzyme';
import Resources from '../components/quiz/resources';

describe('Resources component', () => {
  const renderedComponent = shallow(<Resources 
    resources={[{desc: '', url: ''}, {desc: '', url: ''} ]} 
  />);

  it('Smoke test - Resources should render', () => {
    renderedComponent
  });
});