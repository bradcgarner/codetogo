import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login, mapStateToProps } from '../components/user/login';
import { initialDisplay, initialUser } from '../reducers/initialState';

describe('Login component', () => {
  const renderedComponent = shallow(<Login 
    display={initialDisplay} 
    user={initialUser} 
    handleSubmit={jest.fn()}
    initialValues={{}}
    history={['']}

  />);

  it('Smoke test - Login should render', () => {
    renderedComponent
  });
});