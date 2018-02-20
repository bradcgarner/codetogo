import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actionsUser from '../../actions/user';

export class Profile extends React.Component {
  // Component function: allows user to create and edit profile
  // User profile is basic: does not include quizzes, badges, etc.

  handleSubmitButton(values) { // add form validation first
    // console.log('values submitted at profile', values);
    if (this.props.user.id) {
      // console.log('update, not create');
      const user = {...values, id: this.props.user.id};
      this.props.dispatch(actionsUser.updateUser(user, this.props.user.authToken))
      .then(()=>{
        this.props.history.push('/lists/dashboard'); // go to quizmenu if nothing on dashboard
      });
    } else {
      // console.log('create');      
      this.props.dispatch(actionsUser.createUser(values))
      .then(()=>{
        this.props.history.push('/users/login'); // make this log in automatically, then push to quizmenu
      });
    }
  }
  render() {
    const pwType = 'password'    
    const buttonText = this.props.user.id ? 'Save Changes' : 'Create Account';
      return (
        <div className="profile">
          <form id='profile' className="profileForm userForm" onSubmit={this.props.handleSubmit(values => 
            this.handleSubmitButton(values)
          )}>

            <Field 
              className="profileInput"
              name="firstName"
              id="firstName"
              component="input"
              type="text" 
              placeholder="first name"
              required />
            <label className="inputLabel center" htmlFor="firstname">First Name</label>
            
            <Field 
              className="profileInput"
              name="lastName" 
              id="lastName"
              component="input"
              type="text" 
              placeholder="last name" 
              required />
            <label className="inputLabel center" htmlFor="lastname">Last Name</label>

            <Field
              className="profileInput"
              name="username" 
              id="username"
              component="input"
              type="text" 
              placeholder="username" 
              required />
            <label className="inputLabel center" htmlFor="username">Username</label>
            
            <Field 
              className="profileInput"
              name="password" 
              id="password"
              component="input"
              type={pwType} 
              placeholder="password" 
              required />
            <label className="inputLabel center" htmlFor="password">Password</label>
            
            <Field 
              className="profileInput"
              name="password2" 
              id="password2"
              component="input"
              type={pwType} 
              placeholder="re-type password" 
              required />
            <label className="inputLabel center" htmlFor="password2">Re-Type Password</label>
            
            <div className="loginButtons">
              <button type="submit" className="createAccountButton submit">{buttonText}</button>
              <Link to='/users/login'>
                <button className="createAccountButton create">Oops! I Have An Account</button>
              </Link>
            </div>

         </form> 
        </div>
      );
  }
}

export const mapStateToProps = state => {
  const initialForm = {...state.user}
  return {
    user: state.user,
    initialValues: initialForm
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'profile'})
)(Profile);