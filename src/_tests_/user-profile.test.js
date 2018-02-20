import React from 'react';
import { shallow, mount } from 'enzyme';
import { Profile, mapStateToProps } from '../components/user/profile';
import { initialUser } from '../reducers/initialState';

describe('Profile component', () => {
  const spy = jest.fn();
  const renderedComponentNoUser = shallow(<Profile 
    user={initialUser} 
    handleSubmit={spy}
    initialValues={{}}
    history={['']}
    dispatch={spy}
  />);
  const renderedComponentWithUser = shallow(<Profile 
    user={{...initialUser, id: 3}} 
    handleSubmit={spy}
    initialValues={{}}
    history={['']}
    dispatch={spy}
  />);

  it('Smoke test - Profile should render', () => {
    renderedComponentNoUser
  });

  it('submit button should be clicked with user', () => {
    expect(renderedComponentWithUser.find('.submit').simulate('click'));
    expect(spy.mock.calls.length).toBe(2); // handleSubmit + dispatch
  });

  it('submit button should be clicked No user', () => {
    expect(renderedComponentNoUser.find('.submit').simulate('click'));
    console.log('@@@@@@@@@@@@', spy.mock.calls[0][0], spy.mock.calls[1][0])
    expect(spy.mock.calls.length).toBe(2); // handleSubmit + dispatch
  });

  it('Should map state to props', () => {
    const state = {
      user: initialUser, 
      initialValues: initialUser
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});