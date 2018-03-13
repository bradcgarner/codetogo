import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
// import * as actionsDisplay from '../../actions/display';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsQuizList from '../../actions/quizList';
import * as actionsQuestions from '../../actions/questions';
import * as actionsScoringObject from '../../actions/scoring-object';
import ChoiceInputs from './choice-inputs';
import ChoiceOutput from './choice-output';
import Results from './results';
import ResultModal from  './result-modal';
import SpacedRepGraphic from './spaced-rep-graphic';

export class Quiz extends React.Component {
  // Component function: workhorse component for app!!
  // displays current question and handles all front-end spaced repetition logic
  // logic is here so that logic can be visible to the user, primarily via the subcomponent spaced-rep-graphic, vs semi-concealed in an action
  // submission of answer processes logic, and sends processed results to server. Server only handles one small piece of logic: find the redirect question

  constructor(props){
    super(props);
    this.state = {
      formIsEmpty: true,
    }
  }

  componentDidMount() {
    if(this.props.user.id){
      this.updateScoringObject( this.props.quiz.indexCurrent );
    }
  }

  markFormAsTouched() {
    this.setState({formIsEmpty: false});
  }

  formatChoice(choices, typeAnswer){
    // converts object with properties into an array with all choices. Used even if only 1 choice made.
    let formattedChoices = [];
    for ( let prop in choices ) {
      if (typeAnswer === 'checkbox') {
        formattedChoices.push(prop);
      } else {
        formattedChoices.push(choices[prop]);
      }
    }
    return formattedChoices;
  }

  handleSubmitButton(choices, typeAnswer) {
    if(this.state.formIsEmpty) return;
    const formattedChoices = this.formatChoice(choices, typeAnswer);
    const answerObject = {...this.props.scoringObject, choices: formattedChoices}
    this.props.dispatch(actionsQuestions.answerQuestion(
      answerObject, 
      this.props.user.authToken
    )); 
  }

  handleNextButton() {
    const indexNext = this.props.questions[this.props.quiz.indexCurrent].indexNext;
    const nextState = {...this.props.quiz.nextState};

    if(this.props.quiz.showingAnswers && this.props.user.id){
      return new Promise((resolve, reject)=>{
          // reset to input mode
          this.props.reset();
          this.props.dispatch(actionsQuiz.toggleShowAnswers(false));
          this.setState({ formIsEmpty: true });
          // advance state
          this.props.dispatch(actionsQuiz.updateQuizIndexCurrent(indexNext));
          this.props.dispatch(actionsQuiz.updateQuizScore( nextState.scoreQuizNew ));
          this.props.dispatch(actionsQuizList.updateQuizListScore( 
            this.props.quiz.id,
            nextState.scoreQuizNew 
          ));
          this.props.dispatch(actionsQuestions.updateQuestion( nextState.indexCurrent,     nextState.indexNextNew,     nextState.scoreNew));
          this.props.dispatch(actionsQuestions.updateQuestion( nextState.indexRedirect,    nextState.indexRedirectNext ));
          this.props.dispatch(actionsQuestions.updateQuestion( nextState.indexInsertAfter, nextState.indexCurrent      ));
          resolve(()=>{})
      }).then(()=>{
        // queue up how we'll score the question that we just displayed
        this.updateScoringObject( indexNext );
        return;
      })
    }
  }

  updateScoringObject(indexCurrent){
    // redirect is the same if true or false. Question that points to current question points to current question's next.
    const indexRedirect = this.props.questions.findIndex(item=>item.indexNext === indexCurrent);
    const indexRedirectNext = this.props.questions[indexCurrent].indexNext;
    
    this.props.dispatch(actionsScoringObject.updateScoringObject(
      indexCurrent, this.props.questions, 
      this.props.questions[indexCurrent], 
      indexRedirect, 
      indexRedirectNext, 
      this.props.user.id));
  }

  render() {
    const redirect = this.props.user.id ? null : <Redirect to='/' /> ;

    const spacedRepGraphic = this.props.display.spacedRepGraphic ? <SpacedRepGraphic /> : null ;

    const quiz = this.props.quiz ? this.props.quiz : {showingAnswers: false, indexCurrent: 0, nextState: {} };
    const questions = this.props.questions ? this.props.questions : [{question: null, answers: null, typeAnswer: null, typeQuestion: null, indexNext: 0}] ;

    const question = typeof quiz.indexCurrent === 'number' ? 
        questions[quiz.indexCurrent] : 
        {answers: null, question: null, typeAnswer: null, typeQuestion: null} ;
    
    const options = this.props.quiz.showingAnswers ? 
      <ChoiceOutput 
        question={question} 
        // delete this
        markFormAsTouched={this.markFormAsTouched.bind(this)}
        choices={this.props.quiz.nextState.answers}/> :
      <ChoiceInputs 
        question={question} 
        markFormAsTouched={this.markFormAsTouched.bind(this)}/> ;

    const submitButtonClass = this.state.formIsEmpty   ? 'submitButton inactive' : 'submitButton' ;
    const nextButtonClass   = quiz.showingAnswers ? 'submitButton' : 'submitButton inactive' ;
    const button = quiz.showingAnswers && this.props.user.id ? 
      <button className={nextButtonClass} 
        type="button" 
        onClick={()=>this.handleNextButton()}>
          Next
        </button> :
      <button className={submitButtonClass} 
        type="submit">
          Submit
      </button> ;

    const status = 
      quiz.showingAnswers && quiz.nextState.correct ? 
        <img src={'http://res.freestockphotos.biz/pictures/15/15873-illustration-of-an-orange-smiley-face-pv.png'} alt='correct'/> :
      quiz.showingAnswers && !quiz.nextState.correct ?
        <img src={'http://qige87.com/data/out/199/wp-image-142591094.png'} alt='incorrect'/> :
      '' ; 
    

    const resultsModal = this.props.display.resultsModal ? 
      <ResultModal correct={this.props.quiz.nextState ? this.props.quiz.nextState.correct : false} /> : null ;

    const results = quiz.showingAnswers ? 
      <Results reason={question.reason} resources={question.resources}/> : null ;

    return (
    <div className="quiz">
      <p className="question-topic">{questions[quiz.indexCurrent].topic}</p>
      <p className="questionAsked">{questions[quiz.indexCurrent].question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, question.typeAnswer)
      )}>
        {options}
        <div className="question-buttons">
         <div className="question-status">{status}</div>
         {button}
         <div className="question-status">{status}</div>
        </div>
      </form>
      {spacedRepGraphic}
      {results}
      {resultsModal}
      {redirect}
    </div>
  );
  }
}

export const mapStateToProps = state => ({
  display: state.display,
  quiz: state.quiz,
  questions: state.questions,
  scoringObject: state.scoringObject,
  user: state.user,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'quiz'}) // in the state we'll have state.form.login
)(Quiz);