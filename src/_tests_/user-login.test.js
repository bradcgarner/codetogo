import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login, mapStateToProps } from '../components/user/login';
import { initialUser } from '../reducers/initialState';

describe('Login component', () => {
  const renderedComponent = shallow(<Login 
    user={initialUser} 
    handleSubmit={jest.fn()}
    initialValues={{}}
    history={['']}

  />);

  it('Smoke test - Login should render', () => {
    renderedComponent
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