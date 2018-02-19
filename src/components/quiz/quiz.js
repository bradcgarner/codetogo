import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsDisplay from '../../actions/display';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsQuizList from '../../actions/quizList';
import * as actionsQuestions from '../../actions/questions';
import Results from './results';
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
    // componentDidMount should run only once
    // console.log('componentDidMount');
    this.updateScoringObject(this.props.questions, 
      this.props.quiz.indexCurrent, 
      this.props.questions[this.props.quiz.indexCurrent]);
  }

  updateScoringObject(questions, indexCurrent, question){
    // console.log('start updateScoringObject: indexCurrent', indexCurrent, 
      // 'questions', questions, 'question', question);
    const scoreIfTrue  = this.calcScore(question.score, true);
    const scoreIfFalse = this.calcScore(question.score, false);

    const positionsIfTrue  = this.calcPositions(questions, scoreIfTrue,  true);
    const positionsIfFalse = this.calcPositions(questions, scoreIfFalse, false);

    const indexInsertAfterIfTrue  = this.findIndex(questions, indexCurrent, positionsIfTrue).indexNext;
    const indexInsertAfterIfTrueLabel  = this.findIndex(questions, indexCurrent, positionsIfTrue).label;

    const indexInsertAfterIfFalse = this.findIndex(questions, indexCurrent, positionsIfFalse).indexNext;
    const indexInsertAfterIfFalseLabel = this.findIndex(questions, indexCurrent, positionsIfFalse).label;

    const indexInsertBeforeIfTrue  = (Array.isArray(questions) && this.props.user.id) ? questions[indexInsertAfterIfTrue ].indexNext : null;
    const indexInsertBeforeIfFalse = (Array.isArray(questions) && this.props.user.id) ? questions[indexInsertAfterIfFalse].indexNext : null;
    
    const scoringObject = {
      idQuestion: question.id,
      idUser: this.props.user.id,
      idQuiz: this.props.quiz.id,
      indexCurrent,
      scorePrior: question.score,
      indexNextPrior: question.indexNext,
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

    this.setState({ scoringObject: {...scoringObject} });
  }

  markFormAsTouched() {
    this.setState({formIsEmpty: false});
  }

  calcScore(scorePrior, correct) {
    // calculates theoretical correct and incorrect scores, then sends both scores to the back end, back end grades (correct/incorrect) and uses one of the scores sent to it
    const score = (typeof scorePrior === 'number' && scorePrior >=2) ? scorePrior : 2 ;
    const changeFactor = correct ? Math.ceil(Math.sqrt(scorePrior)) : Math.ceil(scorePrior/2) ;
    if(correct) return Math.ceil(score + changeFactor);
    return changeFactor;
  };
  
  calcPositions(questions, score, correct) {
    // calculates theoretical positions based on prior score correct/incorrect. Only a helper function before findIndex()
    if(score < 2) return 2;
    const variantLo = Math.floor(Math.random() * 3);
    const variantHi = Math.ceil(questions.length * 0.1);
    const randomAdder = correct ?
      Math.ceil(Math.random() * variantHi) : 
      Math.ceil(Math.random() * variantLo) ;
    const maxPositions = questions.length - randomAdder - 2;
    if(!correct && score > questions.length/2) {
      return Math.ceil(questions.length/2) + variantLo;
    }
    if(!correct) return score + variantLo;
    if(score > maxPositions) return maxPositions;
    return score;
  };

  findIndex(questions, indexCurrent, positions){
    // calculates theoretical index based on positions moved. Submit sends theoretical indices to server, and server uses one of the indices sent.
    // console.log('findIndex', positions);
    if(Array.isArray(questions) && this.props.user.id){
      let indexNext = questions[indexCurrent].indexNext;
      let label = `${positions} positions (${indexNext}`;
      // console.log('indexNext start', indexNext)
      for (let i=0; i < positions -1; i++) {
        indexNext = questions[indexNext].indexNext;
        label += `->${indexNext}`;
        // console.log(i, 'indexNext', indexNext)
      }
      if (indexNext < 0) return {label: 'OOPS! Corrected negative to 0', indexNext: 0};
      label +=')';
      return {label, indexNext};
    }
    return {label: 'Sorry, either no questions or not logged in', indexNext: 0};
  };

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

  handleSubmitButton(choices, scoringObject, typeAnswer) {
    console.log('enter submitting choices', choices);
    console.log('enter submitting scoringObject', scoringObject);
    if(this.state.formIsEmpty) return;
    const formattedChoices = this.formatChoice(choices, typeAnswer);
    console.log('formattedChoices', formattedChoices);
    const answerObject = {...scoringObject, choices: formattedChoices}
    console.log('submitting', answerObject);
    this.props.dispatch(actionsQuestions.answerQuestion(
      answerObject, 
      this.props.user.authToken)); 
  } 

  advanceQuestion(indexNext) {
    const nextState = {...this.props.quiz.nextState};

    // console.log('handleNext indexNext', indexNext);
    if(this.props.quiz.showingAnswers && this.props.user.id){
      this.props.reset();   
      console.log('updateQuestion, nextState', nextState)
      console.log('questions before updating', this.props.questions)
      console.log('question indices before updating',
        this.props.questions[nextState.indexCurrent].index,
        this.props.questions[nextState.indexCurrent].indexNext, '//',
        this.props.questions[nextState.indexRedirect].index,
        this.props.questions[nextState.indexRedirect].indexNext, '//',
        this.props.questions[nextState.indexInsertAfter].index,
        this.props.questions[nextState.indexInsertAfter].indexNext
      );

      this.props.dispatch(actionsQuiz.toggleShowAnswers(false));
      this.props.dispatch(actionsQuiz.updateQuizIndexCurrent(indexNext));
      this.props.dispatch(actionsQuiz.updateQuizScore(
        nextState.scorePrior, 
        nextState.scoreNew));
      this.props.dispatch(actionsQuizList.updateQuizListScore(
        nextState.idQuiz, 
        nextState.scorePrior, 
        nextState.scoreNew));
        
      this.props.dispatch(actionsQuestions.updateQuestion(
        nextState.indexCurrent, 
        nextState.indexNextNew, 
        nextState.scoreNew));
      this.props.dispatch(actionsQuestions.updateQuestion(
        nextState.indexRedirect, 
        nextState.indexRedirectNext));
      this.props.dispatch(actionsQuestions.updateQuestion(
        nextState.indexInsertAfter, 
        nextState.indexCurrent));

      this.setState({ formIsEmpty: true });

    } else {
      console.log('not showing answer', this.props.quiz.showingAnswers)
    }
  }

  handleNextButton(indexNext) {
  //   return new Promise((resolve, reject)=>{
      this.advanceQuestion(indexNext);
    //   resolve();
    // })
    // .then(()=>{
      const nextState = {...this.props.quiz.nextState};
      // console.log('questions after updating', this.props.questions)
      // console.log('question indices after updating',
      //   this.props.questions[nextState.indexCurrent].index,
      //   this.props.questions[nextState.indexCurrent].indexNext, '//',
      //   this.props.questions[nextState.indexRedirect].index,
      //   this.props.questions[nextState.indexRedirect].indexNext, '//',
      //   this.props.questions[nextState.indexInsertAfter].index,
      //   this.props.questions[nextState.indexInsertAfter].indexNext
      // );
      // if(this.props.questions[nextState.indexCurrent].indexNext !== nextState.indexNextNew) {
      //   let i = 1;
      //   while(this.props.questions[nextState.indexCurrent].indexNext !== nextState.indexNextNew && i<=10) {
      //     console.log(`try again #${i} current question`);
      //     this.props.dispatch(actionsQuestions.updateQuestion(
      //       nextState.indexCurrent, 
      //       nextState.indexNextNew, 
      //       nextState.scoreNew));
      //     i++;
      //   }
      //   if(i>10) console.log('ERROR DID NOT UPDATE CURRENT QUESTION')
      // }
      // if(this.props.questions[nextState.indexRedirect].indexNext !== nextState.indexRedirectNext) {
      //   let i = 1;
      //   while(this.props.questions[nextState.indexRedirect].indexNext !== nextState.indexRedirectNext && i<=10) {
      //     console.log(`try again #${i} redirect`);
      //     this.props.dispatch(actionsQuestions.updateQuestion(
      //       nextState.indexRedirect, 
      //       nextState.indexRedirectNext));
      //     i++;
      //   }
      //   if(i>10) console.log('ERROR DID NOT UPDATE REDIRECT')
      // }
      // if(this.props.questions[nextState.indexInsertAfter].indexNext !== nextState.indexCurrent) {
      //   let i = 1;
      //   while(this.props.questions[nextState.indexInsertAfter].indexNext !== nextState.indexCurrent && i<=10) {
      //     console.log(`try again #${i} insert after`);
      //     this.props.dispatch(actionsQuestions.updateQuestion(
      //       nextState.indexInsertAfter, 
      //       nextState.indexCurrent));
      //     i++;
      //     if(i>10) console.log('ERROR DID NOT UPDATE INSERT AFTER')
      //   }
      // }
      this.updateScoringObject(this.props.questions, indexNext, this.props.questions[indexNext]);
    // })
    // .catch(err=>{
    //   console.log('error', err);
    // })
  }

  render() {
    const quiz = this.props.quiz ? this.props.quiz : {showingAnswers: false, indexCurrent: 0, nextState: {} };
    const questions = this.props.questions ? this.props.questions : [{question: null, answers: null, question: null, typeAnswer: null, typeQuestion: null, indexNext: 0}] ;

    const question = typeof quiz.indexCurrent === 'number' ? 
        questions[quiz.indexCurrent] : 
        {answers: null, question: null, typeAnswer: null, typeQuestion: null} ;
    const typeAnswer = question.typeAnswer;  

    const optionsList = Array.isArray(question.answers) ? 
      question.answers.map((answer,index)=>{
        const optionName = typeAnswer === 'radio' ? 'option' : `${answer.id}`;
        return (
          <div key={index}>
            <Field 
              name={optionName} 
              id={answer.id}
              component='input'
              type={typeAnswer}
              value={answer.id}
              onChange={()=>this.markFormAsTouched()} />
            <label htmlFor={answer.id}>{answer.option}</label>
          </div>
        )
      }) 
    : null ;

    const options = question.typeAnswer === 'text' ?
        <Field 
          className="questionOptions questionTextInput"
          name={'textInput'} 
          id={'textInput'}
          component='input'
          placeholder='type your answer here'
          // value={answer.id}
          onChange={()=>this.markFormAsTouched()} /> :
      <div className="questionOptions">{optionsList}</div> 

    const submitButtonClass = this.state.formIsEmpty   ? 'submitButton inactive' : 'submitButton' ;
    const nextButtonClass   = quiz.showingAnswers ? 'submitButton' : 'submitButton inactive' ;
    const button = quiz.showingAnswers && this.props.user.id ? 
      <button className={nextButtonClass} 
        type="button" 
        onClick={()=>this.handleNextButton(this.props.questions[quiz.indexCurrent].indexNext)}>
          Next
        </button> :
      <button className={submitButtonClass} 
        type="submit">
          Submit
      </button> ;

    const status = !quiz.showingAnswers ? null :
      quiz.nextState.correct ? "Yay!" : "Boo..." ;

    const spacedRepGraphic = this.state.scoringObject ?
      <SpacedRepGraphic
      scoringObject={this.state.scoringObject}/> : null ;
    
    const results = quiz.showingAnswers ? <Results reason={question.reason} resources={question.resources}/> : null ;

    return (
    <div className="quiz">
      <p className="questionAsked">{questions[quiz.indexCurrent].question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, this.state.scoringObject, question.typeAnswer)
      )}>
        {options}
        <div className="questionButtons">
         <div className="questionStatus">{status}</div>
         {button}
         <div className="questionStatus">{status}</div>
        </div>
      </form>
      {spacedRepGraphic}
      {results}
    </div>
  );
  }
}

export const mapStateToProps = state => ({
  display: state.display,
  quiz: state.quiz,
  questions: state.questions,
  user: state.user,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'quiz'}) // in the state we'll have state.form.login
)(Quiz);