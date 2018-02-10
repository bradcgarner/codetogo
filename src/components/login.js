import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/user';
import * as actionsDisplay from '../actions/display';

export class Login extends React.Component {
  
  handleSubmitButton(values) {
    console.log('values submitted at login', values);
    this.props.dispatch(actionsUser.login(values));
    this.props.reset();   
  }
  
  handleCreateAccountButton() {
    // this.props.dispatch(actionsDisplay.changeMode('profile', this.props.quiz));
  }

  render() {

    const pwType = 'password' // allow to toggle this later
    return (
      <div className="login">
        <form className="login" onSubmit={this.props.handleSubmit(values =>
          this.handleSubmitButton(values)
        )}>
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
          <div className="loginButtons">
            <button type="submit" className="loginButton clearfix">Login</button>
            <button className="createAccountButton" onClick={e=>this.handleCreateAccountButton()}>Create Account</button>
          </div>
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const initialForm = {};
  initialForm.username = state.user.username;
  return {
    user: state.user,
    quiz: state.quiz,
    mode: state.mode,
    initialValues: initialForm,  
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'login'}) // in the state we'll have state.form.login
)(Login);