import React from 'react';
import { shallow, mount } from 'enzyme';
import Results from '../components/quiz/results';

describe('Results component', () => {
  const renderedComponent = shallow(<Results 
    resources={[{desc: '', url: ''}, {desc: '', url: ''} ]}
    reason={''}
  />);

  it('Smoke test - Results should render', () => {
    renderedComponent
  });
});