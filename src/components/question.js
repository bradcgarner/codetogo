import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import StatusBar from './question-statusbar';
import Resources from './question-resources';
import Comments  from './question-comments';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export class Question extends React.Component {

  handleSubmitButton(choice, currentIndex) {
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    const formattedChoiceObject = {
      userId: this.props.user.id, // user must be logged in
      quizId: this.props.quiz.id,
      attempt: this.props.quiz.attempt,
      questionId: this.props.quiz.questions[currentIndex].id,
      choices : formattedChoices
    };
    const nextIndex = this.props.quiz.currentIndex === (this.props.quiz.questions.length - 1) ?
      999 : this.props.quiz.currentIndex + 1 ;
      console.log('nextIndex', nextIndex);
      this.props.reset();   
      this.props.dispatch(actionsUser.submitChoices(formattedChoiceObject, this.props.user, nextIndex));
  }  // refer to actions/users.js for format of values

  handleGotoQuestionButton(index) { // index = 1 or -1
    console.log('indices at go to question',index, this.props.quiz.currentIndex);
    console.log('this.props.quiz.total', this.props.quiz.total);
    if ( ( index === -1 && this.props.quiz.currentIndex > 0 ) || 
         ( index === 1 && this.props.quiz.currentIndex < this.props.quiz.total )
    ) {
      this.props.reset();    
      this.props.dispatch(actionsQuiz.updateCurrentQuestion(this.props.quiz.currentIndex + index))
    } else if ( index === 1 && this.props.quiz.currentIndex === this.props.quiz.total ) {
      this.props.reset();    
      this.props.dispatch(actionsMode.gotoResults())
    }
  }

  handleInputChange() {
    this.props.dispatch(actionsQuiz.toggleFormStatus(false)); // improve this to read from form
  }
  
  render() {

    // FIX THIS !!!!!! IS TRYING TO RENDER INDEX 999 !!!!!
    const currentIndex = this.props.quiz.currentIndex || 0;
    console.log('this.props.quiz',this.props.quiz);
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
    const nextQuestionClass = this.props.quiz.questions.length > ( this.props.quiz.currentIndex + 1 ) ?
      'fa fa-hand-o-right smallIcon'  : 'fa fa-hand-o-right smallIcon inactive' ;
    const submitButtonClass = this.props.quiz.formIsEmpty===true ?  'submitButton inactive'  : 'submitButton' ;
    console.log('this.props.quiz.formIsEmpty',this.props.quiz.formIsEmpty);
    return (
    <div className="question">
      <StatusBar 
        mode={'question'}
        total = {this.props.quiz.total}
        current = {this.props.quiz.currentIndex + 1}
        currentIndex = {this.props.quiz.currentIndex}
        completed = {this.props.quiz.completed}
        correct = {this.props.quiz.correct}
      />

      <p className="questionAsked">{this.props.quiz.currentIndex + 1}. {currQuestion.question}</p>
      
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
          <i className={nextQuestionClass} 
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