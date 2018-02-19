import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, mapStateToProps } from '../components/display/modal';
import { initialDisplay } from '../reducers/initialState';

describe('Modal component', () => {
  const renderedComponent = shallow(<Modal 
    display={initialDisplay} 
  />);

  it('Smoke test - Modal should render', () => {
    renderedComponent
  });
});