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

  handleFormStatusChange() {
    this.setState({formIsEmpty: false});
  }

  formatChoice(choice, indexCurrent){
    let formattedChoices = [];
    for ( let prop in choice ) {
      formattedChoices.push(prop);
    }
    return formattedChoices;
  }

  calcNextIndex (indexCurrent, quizLength ) {

    
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

    const indexCurrent = this.props.quiz.indexCurrent || 0; // REMOVE THIS!!!!!!
    const currQuestion = this.props.questions[indexCurrent];
    const typeAnswer = currQuestion.typeAnswer // currQuestion.typeAnswer; 
    
    const options = currQuestion.answers.map((answer,index)=>{
      const optionName = typeAnswer === 'radio' ? 'option' : `${answer.id}`;
      return (
        <div key={index}>
          <Field 
            name={optionName} 
            id={answer.id}
            component='input'
            type={typeAnswer}
            value={answer.id}
            onChange={()=>this.handleFormStatusChange()}
          />
          <label htmlFor={answer.id}>{answer.option}</label>
        </div>
      )
    });

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
  user: state.user,
  quiz: state.quiz,
  display: state.display,
  questions: state.questions,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'question'}) // in the state we'll have state.form.login
)(Quiz);