import React from 'react';
import { shallow, mount } from 'enzyme';
import { Profile, mapStateToProps } from '../components/user/profile';
import { initialDisplay, initialUser } from '../reducers/initialState';

describe('Profile component', () => {
  const renderedComponent = shallow(<Profile 
    display={initialDisplay} 
    user={initialUser} 
    handleSubmit={jest.fn()}
    initialValues={{}}
    history={['']}

  />);

  it('Smoke test - Profile should render', () => {
    renderedComponent
  });
});