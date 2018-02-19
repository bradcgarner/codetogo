import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, mapStateToProps } from '../components/display/modal';
import { initialDisplay } from '../reducers/initialState';

describe('Modal component', () => {
  const spy = jest.fn();
  const renderedComponent = shallow(<Modal 
    display={initialDisplay} 
    dispatch={spy}
    fn={spy}
  />);

  it('Smoke test - Modal should render', () => {
    renderedComponent
  });;

  it('Smoke test - Modal should render with default modal message', () => {
    expect(shallow(<Modal 
      display={{modalMessage: 'testing'}} 
      dispatch={spy}
    />));
  });

  it('should close modal', () => {
    expect(renderedComponent.find('.modalBackground').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  });
  
  it('should close modal', () => {
    expect(renderedComponent.find('.modalExitButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(2);
    // expect(spy.mock.calls[1]).toEqual([{ type: 'CLOSE_MODAL', message: undefined }]);
    // console.log('spy.mock.calls',spy.mock.calls)
  });

  it('Should map state to props', () => {
    const state = {display: initialDisplay};
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });

});