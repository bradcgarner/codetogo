import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsDisplay from '../../actions/display';
import * as actionsQuiz from '../../actions/quiz';
import Results from './results';

export class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formIsEmpty: true,
    }
  }

  formatChoiceObject(choice, indexCurrent){
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    return {
      userId: this.props.user.id, // user must be logged in
      quizId: this.props.quiz.id,
      attempt: this.props.quiz.attempt,
      questionId: this.props.quiz.questions[indexCurrent].id,
      choices: formattedChoices,
      index: indexCurrent,
      stickyIndex: indexCurrent, // !!!!!!! FIX THIS !!!!!!!!
    };
  }

  calcNextIndex (indexCurrent, quizLength ) {
    let nextIndex = indexCurrent + 1;
    if ( nextIndex < 0 ) {
      nextIndex = 0;
    } else if ( nextIndex > quizLength - 1 ) {
      nextIndex = quizLength - 1;
    } else if ( !nextIndex ) {
      nextIndex = quizLength - 1;
    }
    return nextIndex;
  }

  handleSubmitButton(choice, indexCurrent) {
    const formattedChoiceObject = this.formatChoiceObject(choice, indexCurrent);
    const nextIndex = this.calcNextIndex(this.props.quiz.indexCurrent, this.props.quiz.questions.length );
    const mode = this.props.quiz.indexCurrent === (this.props.quiz.questions.length - 1) ? 'results' : 'question' ;
    this.props.reset();   
    this.props.dispatch(actionsQuiz.submitChoices(this.props.user, this.props.quiz, nextIndex, mode, formattedChoiceObject));
  }  // refer to actions/users.js for format of values


  handleInputChange() {
    // change this to state
    // this.props.dispatch(actionsQuiz.toggleFormStatus(false)); // improve this to read from form
  }
  
  render() {

    let results = <Results/>;

    const indexCurrent = this.props.quiz.indexCurrent ;
    const currQuestion = this.props.questions[indexCurrent];
    const inputType = 'radio' // currQuestion.typeAnswer; 
    
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

    const submitButtonClass = this.state.formIsEmpty===true ?  'submitButton inactive'  : 'submitButton' ;
    return (
    <div className="question">

      <p className="questionAsked">{currQuestion.question}</p>
      
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, indexCurrent)
      )}>
        {/* multiple choice options */}
        <ul className="questionOptions"> {options} </ul>

        <div className="questionButtons">
          <button className={submitButtonClass} type="submit">Submit</button>
        </div>

      </form>

      {results}
  
    </div>
  );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  display: state.display,
  questions: state.questions,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'question'}) // in the state we'll have state.form.login
)(Question);