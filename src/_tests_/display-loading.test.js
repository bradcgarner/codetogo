import React from 'react';
import { shallow, mount } from 'enzyme';
import Loading from '../components/display/loading';

describe('Loading component', () => {
  const spy = jest.fn();
  const renderedComponent = shallow(<Loading fn={spy}/>);

  it('Smoke test - Loading should render', () => {
    renderedComponent
  });

  it('simulate click', () => {
    expect(renderedComponent.find('.loadingBackground').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});