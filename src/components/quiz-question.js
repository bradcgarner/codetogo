import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
// import Resources from './quiz-question-resources';
// import Comments  from './quiz-question-comments';
// import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';
// const deepAssign = require('deep-assign');

export class Question extends React.Component {

  formatChoiceObject(choice, currentIndex){
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    return {
      userId: this.props.user.id, // user must be logged in
      quizId: this.props.quiz.id,
      attempt: this.props.quiz.attempt,
      questionId: this.props.quiz.questions[currentIndex].id,
      choices: formattedChoices,
      index: currentIndex,
      stickyIndex: currentIndex, // !!!!!!! FIX THIS !!!!!!!!
    };
  }

  calcNextIndex (currentIndex, quizLength ) {
    let nextIndex = currentIndex + 1;
    if ( nextIndex < 0 ) {
      nextIndex = 0;
    } else if ( nextIndex > quizLength - 1 ) {
      nextIndex = quizLength - 1;
    } else if ( !nextIndex ) {
      nextIndex = quizLength - 1;
    }
    return nextIndex;
  }

  handleSubmitButton(choice, currentIndex) {
    const formattedChoiceObject = this.formatChoiceObject(choice, currentIndex);
    const nextIndex = this.calcNextIndex(this.props.quiz.currentIndex, this.props.quiz.questions.length );
    const mode = this.props.quiz.currentIndex === (this.props.quiz.questions.length - 1) ? 'results' : 'question' ;
    this.props.reset();   
    this.props.dispatch(actionsQuiz.submitChoices(this.props.user, this.props.quiz, nextIndex, mode, formattedChoiceObject));
  }  // refer to actions/users.js for format of values

  handleGotoQuestionButton(index) { // for skipping; index = 1 or -1
    const nextIndex = this.calcNextIndex(this.props.quiz.currentIndex, this.props.quiz.questions.length );
    if ( index === -1 && this.props.quiz.currentIndex > 0 )  {
      console.log('go back')
      this.props.reset();    
      this.props.dispatch(actionsQuiz.updateCurrentQuestion(this.props.quiz.currentIndex + index))
    } else if ( index === 1 && this.props.quiz.currentIndex === this.props.quiz.total-1) {
      this.props.reset();    
      this.props.dispatch(actionsMode.changeMode('results', this.props.quiz))
    } else if ( index === 1 ) {
      this.props.reset();    
      this.props.dispatch(actionsQuiz.updateCurrentQuestion(nextIndex))
    }
  }

  handleInputChange() {
    this.props.dispatch(actionsQuiz.toggleFormStatus(false)); // improve this to read from form
  }
  
  render() {

    const currentIndex = this.props.quiz.currentIndex ;
    const currQuestion = this.props.quiz.questions[currentIndex];
    const inputType = currQuestion.inputType; 
    
    const options = currQuestion.answers.map((answer,index)=>{
      const optionName = inputType === 'radio' ? 'option' : `${answer.id}`;
      return (
        <div key={index}>
          <Field 
            name={optionName} 
            id={answer.id}
            component='input'
            type={inputType}
            value={answer.id}
            onChange={()=>this.handleInputChange()}
          />
          <label htmlFor={answer.id}>{answer.option}</label>
        </div>
      )
    });

    const prevQuestionClass = this.props.quiz.currentIndex > 0 ?
      'fa fa-hand-o-left smallIcon'  : 'fa fa-hand-o-left smallIcon inactive' ;
    const submitButtonClass = this.props.quiz.formIsEmpty===true ?  'submitButton inactive'  : 'submitButton' ;
    return (
    <div className="question">

      <p className="questionAsked">{currQuestion.stickyIndex + 1}. {currQuestion.question}</p>
      
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, currentIndex)
      )}>
        {/* multiple choice options */}
        <ul className="questionOptions">
          {options}
        </ul>

        <div className="questionButtons">
          {/* previous  */}
          <i className={prevQuestionClass} 
            onClick={()=>this.handleGotoQuestionButton(-1)}
            aria-hidden="true">
          < span className="faText">Previous</span>
          </i>

          {/* submit */}
          <button className={submitButtonClass} type="submit">Submit</button>

          {/* next */}
          <i className="fa fa-hand-o-right smallIcon" 
            onClick={()=>this.handleGotoQuestionButton(1)}
            aria-hidden="true">
            <span className="faText">Skip</span>
          </i>
        </div>

      </form>
  
    </div>
  );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'question'}) // in the state we'll have state.form.login
)(Question);