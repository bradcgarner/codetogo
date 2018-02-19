import React from 'react';
import { shallow, mount } from 'enzyme';
import { NoMatch } from '../components/display/nomatch';

describe('NoMatch component', () => {
  const renderedComponent = shallow(<NoMatch/>);

  it('Smoke test - NoMatch should render', () => {
    renderedComponent
  });
});