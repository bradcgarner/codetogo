import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsDisplay from '../../actions/display';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsQuestion from '../../actions/questions';
import Results from './results';

export class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formIsEmpty: true,
      showingAnswer: false,
    }
  }

  markFormAsTouched() {
    this.setState({formIsEmpty: false});
  }

  formatChoice(choice, indexCurrent){
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    return formattedChoices;
  }

  handleSubmitButton(choice, indexCurrent) {
    if(!(this.state.formIsEmpty)) {
      const formattedChoice = this.formatChoice(choice, indexCurrent);
      // validate before proceeding
      this.setState({showingAnswer: true});
      this.props.dispatch(actionsQuestion.answerQuestion = (
        this.props.quiz.questions, 
        indexCurrent, 
        formattedChoice, 
        this.props.user.id,
        this.props.user.authToken));
    }  
  } 

  handleNextButton() {
    if(this.state.showingAnswer){
      this.setState({showingAnswer: false, formIsEmpty: true})
      this.props.reset();   
      this.props.dispatch(actionsQuiz.updateQuizIndexCurrent(1));
    }
  }
  
  render() {

    let results = this.state.showingAnswer ? <Results/> : null ;
    const nullQuiz = {answers: null, question: null, typeAnswer: null, typeQuestion: null}

    const indexCurrent = this.props.quiz.indexCurrent
    const currQuestion = typeof indexCurrent === 'number' ?
      this.props.questions[indexCurrent] : nullQuiz ;
    console.log('indexCurrent',indexCurrent,'currQuestion',currQuestion)
    const typeAnswer = currQuestion.typeAnswer 
    
    const options = Array.isArray(currQuestion.answers) ? 
      currQuestion.answers.map((answer,index)=>{
      const optionName = typeAnswer === 'radio' ? 'option' : `${answer.id}`;
      return (
        <div key={index}>
          <Field 
            name={optionName} 
            id={answer.id}
            component='input'
            type={typeAnswer}
            value={answer.id}
            onChange={()=>this.markFormAsTouched()}
          />
          <label htmlFor={answer.id}>{answer.option}</label>
        </div>
      )
    }) : null ;

    const submitButtonClass =this.state.formIsEmpty  ===true ? 'submitButton inactive' : 'submitButton' ;
    const nextButtonClass   =this.state.showingAnswer===true ? 'submitButton inactive' : 'submitButton' ;
    return (
    <div className="quiz">
      <p className="questionAsked">{currQuestion.question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, indexCurrent)
      )}>
        <ul className="questionOptions"> {options} </ul>
        <div className="questionButtons">
          <button className={submitButtonClass} type="submit">Submit</button>
          <button className={nextButtonClass} type="button" onClick={()=>this.handleNextButton()}>Next</button>
        </div>
      </form>
      {results}
    </div>
  );
  }
}

const mapStateToProps = state => ({
  display: state.display,
  quiz: state.quiz,
  questions: state.questions,
  user: state.user,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'quiz'}) // in the state we'll have state.form.login
)(Quiz);