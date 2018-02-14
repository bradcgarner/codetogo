import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsDisplay from '../../actions/display';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsQuestions from '../../actions/questions';
import Results from './results';
import SpacedRepGraphic from './spaced-rep-graphic';

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

  calcScore(scorePrior, correct) {
    const score = (typeof scorePrior === 'number' && scorePrior >=2) ? scorePrior : 2 ;
    const changeFactor = correct ? Math.ceil(Math.sqrt(scorePrior)) : Math.ceil(scorePrior/2) ;
    if(correct) return Math.ceil(score + changeFactor);
    return changeFactor;
  };
  
  calcPositions(score, correct) {
    if(score < 2) return 2;
    const variantLo = Math.floor(Math.random() * 3);
    const variantHi = Math.ceil(this.props.questions.length * 0.1);
    const randomAdder = correct ?
      Math.ceil(Math.random() * variantHi) : 
      Math.ceil(Math.random() * variantLo) ;
    const maxPositions = this.props.questions.length - randomAdder - 1;
    if(!correct && score > this.props.questions.length/2) {
      return Math.ceil(this.props.questions.length/2) + variantLo;
    }
    if(!correct) return score + variantLo;
    if(score > maxPositions) return maxPositions;
    return score;
  };

  findIndex(positions){
    // console.log('findIndex', positions);
    if(Array.isArray(this.props.questions) && this.props.user.id){
      let indexNext = this.props.questions[this.props.quiz.indexCurrent].indexNext;
      let label = `${positions} positions (${indexNext}`;
      // console.log('indexNext start', indexNext)
      for (let i=0; i < positions -1; i++) {
        indexNext = this.props.questions[indexNext].indexNext;
        label += `->${indexNext}`;
        // console.log(i, 'indexNext', indexNext)
      }
      if (indexNext < 0) return {label: 'OOPS! Corrected negative to 0', indexNext: 0};
      label +=')';
      return {label, indexNext};
    }
    return {label: 'Sorry, either no questions or not logged in', indexNext: 0};
  };

  formatChoice(choices){
    let formattedChoices = [];
    for ( let prop in choices ) {
      formattedChoices.push(choices[prop]);
    }
    return formattedChoices;
  }

  handleSubmitButton(choices, request) {
    // console.log('enter submitting', choices, request)
    if(this.state.formIsEmpty) return;
    const formattedChoices = this.formatChoice(choices);
    this.setState({showingAnswer: true});
    const answerObject = {...request, choices: formattedChoices}
    console.log('submitting', answerObject);
    this.props.dispatch(actionsQuestions.answerQuestion(
      answerObject, 
      this.props.user.authToken)); 
  } 

  handleNextButton(indexNext) {
    if(this.state.showingAnswer){
      this.setState({showingAnswer: false, formIsEmpty: true})
      this.props.reset();   
      this.props.dispatch(actionsQuiz.updateQuizIndexCurrent(indexNext));
    }
  }
  
  render() {
    let results = this.state.showingAnswer ? <Results/> : null ;
    const nullQuiz = {answers: null, question: null, typeAnswer: null, typeQuestion: null}

    const indexCurrent = this.props.quiz.indexCurrent
    const currQuestion = typeof indexCurrent === 'number' ?
      this.props.questions[indexCurrent] : nullQuiz ;
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

    const submitButtonClass = this.state.formIsEmpty   ? 'submitButton inactive' : 'submitButton' ;
    const nextButtonClass   = this.state.showingAnswer ? 'submitButton inactive' : 'submitButton' ;
    const button = this.state.showingAnswer ? 
      <button className={nextButtonClass} type="button" onClick={()=>this.handleNextButton(currQuestion.indexNext)}>Next</button>
      : <button className={submitButtonClass} type="submit">Submit</button> ;
    
    const scoreIfTrue  = this.calcScore(currQuestion.score, true);
    const scoreIfFalse = this.calcScore(currQuestion.score, false);
    const positionsIfTrue  = this.calcPositions(scoreIfTrue,  true);
    const positionsIfFalse = this.calcPositions(scoreIfFalse, false);
    // console.log(' t r u e')
    const indexInsertAfterIfTrue  = this.findIndex(positionsIfTrue).indexNext;
    const indexInsertAfterIfTrueLabel  = this.findIndex(positionsIfTrue).label;
    // console.log('***',indexInsertAfterIfTrue)
    // console.log(' f a l s e')
    const indexInsertAfterIfFalse = this.findIndex(positionsIfFalse).indexNext;
    const indexInsertAfterIfFalseLabel = this.findIndex(positionsIfFalse).label;
    // console.log('***',indexInsertAfterIfFalse)
    // console.log(' ')
    let indexInsertBeforeIfTrue, indexInsertBeforeIfFalse;
    if (Array.isArray(this.props.questions) && this.props.user.id) {
      indexInsertBeforeIfTrue = this.props.questions[indexInsertAfterIfTrue].indexNext ;
      indexInsertBeforeIfFalse = this.props.questions[indexInsertAfterIfFalse].indexNext ;
    }

    const scoringObject = {
      indexCurrent,
      scorePrior: currQuestion.score,
      indexNextPrior: currQuestion.indexNext,
      scoreIfTrue,
      scoreIfFalse,
      positionsIfTrue,
      positionsIfFalse,
      indexInsertAfterIfTrue,
      indexInsertAfterIfTrueLabel,
      indexInsertAfterIfFalse,
      indexInsertAfterIfFalseLabel,
      indexInsertBeforeIfTrue,
      indexInsertBeforeIfFalse,
    };

    const request = {
      ...scoringObject,
      idQuestion: currQuestion.id,
      idUser: this.props.user.id,
      idQuiz: this.props.quiz.id,
    };

    return (
    <div className="quiz">
      <p className="questionAsked">{currQuestion.question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, request)
      )}>
        <ul className="questionOptions"> {options} </ul>
        <div className="questionButtons">
         {button}
        </div>
      </form>
      {results}
      <SpacedRepGraphic scoringObject={scoringObject}/>
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