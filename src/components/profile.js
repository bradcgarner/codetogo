import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/users';
const deepAssign = require('deep-assign');

export class Profile extends React.Component {

  handleSubmitButton(values) { // add form validation first
    console.log('values submitted at profile', values);
    if (this.props.user.id) {
      console.log('update, not create');
      const user = Object.assign({},values,{id: this.props.user.id})
      this.props.dispatch(actionsUser.updateUserProfile(user, this.props.user.authToken));
    } else {
      console.log('create');      
      const newValues = deepAssign(values);
      newValues.quizzes = [];
      newValues.recent = [];
      newValues.badges = [];
      this.props.dispatch(actionsUser.createUser(newValues));
    }
  }
  render() {
    const pwType = 'password'    
    const buttonText = this.props.user.id ? 'Save Changes' : 'Create Account';
      return (
        <div className="profile">
          <form id='profile' className="profileForm" onSubmit={this.props.handleSubmit(values => 
            this.handleSubmitButton(values)
          )}>

          <Field 
            className="profileInput"
            name="firstName"
            id="firstName"
            component="input"
            type="text" 
            placeholder="first name"
            required
          />

          <label className="inputLabel center" htmlFor="firstname">First Name</label>
          <Field 
            className="profileInput"
            name="lastName" 
            id="lastName"
            component="input"
            type="text" 
            placeholder="last name" 
            required
          />
          <label className="inputLabel center" htmlFor="lastname">Last Name</label>

          <Field
            className="profileInput"
            name="username" 
            id="username"
            component="input"
            type="text" 
            placeholder="username" 
            required
          />
          <label className="inputLabel center" htmlFor="username">Username</label>
          
          <Field 
            className="profileInput"
            name="password" 
            id="password"
            component="input"
            type={pwType} 
            placeholder="password" 
            required
          />
          <label className="inputLabel center" htmlFor="password">Password</label>
          
          <Field 
            className="profileInput"
            name="password2" 
            id="password2"
            component="input"
            type={pwType} 
            placeholder="re-type password" 
            required
          />
          <label className="inputLabel center" htmlFor="password2">Re-Type Password</label>
          
          <button className="createAccountButton" type="submit">{buttonText}</button>
         </form> 
        </div>
      );
  }
}

const mapStateToProps = state => {
  // const initialForm = deepAssign({}, state.user);
  // delete initialForm.recent;
  // delete initialForm.quizzes;
  // delete initialForm.badges;
  // delete initialForm.authToken;
  // delete initialForm.id;
  return {
    user: state.user,
    quiz: state.quiz,
    mode: state.mode,
    // initialValues: initialForm
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'profile'})
)(Profile);