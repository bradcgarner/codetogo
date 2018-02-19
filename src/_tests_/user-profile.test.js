import React from 'react';
import { shallow, mount } from 'enzyme';
import { Profile, mapStateToProps } from '../components/user/profile';
import { initialUser } from '../reducers/initialState';

describe('Profile component', () => {
  const renderedComponent = shallow(<Profile 
    user={initialUser} 
    handleSubmit={jest.fn()}
    initialValues={{}}
    history={['']}

  />);

  it('Smoke test - Profile should render', () => {
    renderedComponent
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