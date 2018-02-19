import React from 'react';
import { shallow, mount } from 'enzyme';
import { Loading } from '../components/display/loading';

describe('Loading component', () => {
  const renderedComponent = shallow(<Loading/>);

  it('Smoke test - Loading should render', () => {
    renderedComponent
  });
});