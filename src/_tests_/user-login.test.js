import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login, mapStateToProps } from '../components/user/login';
import { initialUser } from '../reducers/initialState';

describe('Login component', () => {
  const spy = jest.fn();
  const renderedComponent = shallow(<Login 
    user={initialUser} 
    handleSubmit={spy}
    initialValues={{}}
    history={['']}
    // dispatch={spy}
    // reset={spy}
  />);

  it('Smoke test - Login should render', () => {
    renderedComponent
  });

  // change dispatch to an async mock...
  it('submit button should be clicked', () => {
    expect(renderedComponent.find('.loginButton').simulate('click'));
    console.log('@@@@@@@@@@@@', spy.mock.calls)
    expect(spy.mock.calls.length).toBe(1); // handleSubmit only (nested dispatch and reset are never called, since handleSubmit is a spy and replaces this.handleSubmitButton())
  });

  it('Should map state to props', () => {
    const state = {
      user: initialUser, 
      initialValues: {username: initialUser.username},
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});