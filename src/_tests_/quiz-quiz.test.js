import React from 'react';
import { shallow, mount } from 'enzyme';
import { Quiz, mapStateToProps } from '../components/quiz/quiz';
import {initialDisplay, initialQuiz, initialQuestions, initialUser} from '../reducers/initialState';

describe('Quiz component', () => {
  const renderedComponent = shallow(<Quiz
    display={initialDisplay}
    quiz={initialQuiz}
    questions={initialQuestions}
    user={initialUser}
    handleSubmit={()=>{}}
  />);

  it('Smoke test - Quiz should render', () => {
    renderedComponent;
  });
  // it('Should render a messages icon, opportunities icon, search bar, profile icon and settings icon when there is a user', () => {
  //   const wrapper = shallow(<NavBarTop user={user} />);
  //   expect(wrapper.find('.inboxButton i').prop('className')).toEqual('fa fa-envelope-o');
  //   expect(wrapper.find('.opportunitiesButton i').prop('className')).toEqual('fa fa-briefcase');
  //   expect(wrapper.find('.searchBar i').prop('className')).toEqual('fa fa-search');
  //   expect(wrapper.find('.editProfileButton i').prop('className')).toEqual('fa fa-user-circle-o');
  //   expect(wrapper.find('.settingsButton i').prop('className')).toEqual('fa fa-bars');
  // });
  // it('Should only render the search bar when there is no user', () => {
  //   const user = {
  //     id: null
  //   };
  //   const wrapper = shallow(<NavBarTop user={user} />);
  //   expect(wrapper.find('.inboxButton').exists()).toEqual(false);
  //   expect(wrapper.find('.opportunitiesButton').exists()).toEqual(false);
  //   expect(wrapper.find('.searchBar').exists()).toEqual(true);
  //   expect(wrapper.find('.searchBar i').prop('className')).toEqual('fa fa-search');
  //   expect(wrapper.find('.editProfileButton').exists()).toEqual(false);
  //   expect(wrapper.find('.settingsButton').exists()).toEqual(false);
  // })
  // it('Should map state to props', () => {
  //   const initialState = {
  //     user: {
  //         id: 1
  //     },
  //     display: {
  //       view: 'landingPage'
  //     },
  //   };
  //   const expectedProps = {
  //     user: {
  //       id: 1
  //     },
  //     display: 'landingPage'
  //   };
  //   const mockState = mapStateToProps(initialState);
  //   expect(mockState).toEqual(expectedProps);
  // });
  // it('Should dispatch actions when clicking the opportunity button', () => {
  //   const spy = jest.fn(() => {return Promise.resolve()});
  //   const historySpy = jest.fn();
  //   const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
  //     <NavBarTop
  //       display='homePage'
  //       dispatch={spy}
  //       user={{ authToken: 12345 }}
  //       match={{ url: '/' }}
  //       history={{ push: historySpy }}
  //       user={{id: 1}}
  //     />
  //   </MemoryRouter>);
  //   expect(wrapper.find('.opportunitiesButton i').simulate('click'));
  //   expect(spy.mock.calls.length).toEqual(1);
  // });
  // it('Should dispatch actions when clicking the edit profile button', () => {
  //   const spy = jest.fn(() => {return Promise.resolve()});
  //   const historySpy = jest.fn();
  //   const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
  //     <NavBarTop
  //       display='homePage'
  //       dispatch={spy}
  //       user={{ authToken: 12345 }}
  //       match={{ url: '/' }}
  //       history={{ push: historySpy }}
  //       user={{id: 1}}
  //     />
  //   </MemoryRouter>);
  //   expect(wrapper.find('.editProfileButton i').simulate('click'));
  //   expect(spy.mock.calls.length).toEqual(1);
  // });
});