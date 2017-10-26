import React from 'react';
import { connect } from 'react-redux';

export function About(props) {
  
    return (
      <div className="about">
          
          <br />{'ama afk = quiz app to learn code && feeble attempt at a clever name'}
<br />
<br />{'const learnToCode = ( multiple-choice, mobile-first ) ({'}
<br />&emsp;{'    protected: {'}
<br />&emsp;&emsp;{'      answers: "concealed",'}
<br />&emsp;&emsp;{'      scoring: "real-time"'}
<br />&emsp;{'    },'}
<br />&emsp;{'    scalable: "absolutely"'}
<br />{'})'}
<br />
<br /><h2>{'    Technology Used'}</h2>
<br />{'client {'}
<br />&emsp;{'    html5,'}
<br />&emsp;{'    scss,'}
<br />&emsp;{'    react,'}
<br />&emsp;{'    redux,'}
<br />&emsp;{'    redux-forms,'}
<br />&emsp;{'    redux-thunk,'}
<br />&emsp;{'    enzyme,'}
<br />{'}'}
<br />
<br />{'server {'}
<br />&emsp;{'    node,'}
<br />&emsp;{'    express,'}
<br />&emsp;{'    mongoose,'}
<br />&emsp;{'    auth: [ jwt, passport ],'}
<br />&emsp;{'    testing: [ mocha, chai ]'}
<br />{'}'}
<br />    
<br />{'learning {'}
<br />&emsp;{'    react-redux,'}
<br />&emsp;{'    redux-forms,'}
<br />&emsp;{'    authentication-thru-browser'}
<br />{'}'}
<br />    
<br />{'lacking {'}
<br />&emsp;{'    testing'}
<br />{'}'}
<br />
<br />{'stretchGoals {'}
<br />&emsp;{'    form-validation,'}
<br />&emsp;{'    UX,'}
<br />&emsp;{'    statusBar,'}
<br />&emsp;{'    statusIcon,'}
<br />&emsp;{'    recentActivity,'}
<br />&emsp;{'    badges,'}
<br />&emsp;{'    UX,'}
<br />&emsp;{'    Add-real-quizzes,'}
<br />&emsp;{'    Allow comments,'}
<br />{'}'}

      </div>
    );
}

const mapStateToProps = state => ({
  mode: state.mode
})

export default connect(mapStateToProps)(About);