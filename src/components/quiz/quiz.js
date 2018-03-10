import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsQuiz from '../../actions/quiz';
import * as actionsQuizList from '../../actions/quizList';
import * as actionsQuestions from '../../actions/questions';
import * as actionsScoringObject from '../../actions/scoring-object';
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
    if(this.props.user.id){
      console.log(' ');
      this.updateScoringObject(
        this.props.questions, 
        this.props.quiz.indexCurrent, 
        this.props.questions[this.props.quiz.indexCurrent]
      );
    }
  }

  updateScoringObject(questions, indexCurrent, question){
    const scoreIfTrue  = this.calcScore(question.score, true);
    const scoreIfFalse = this.calcScore(question.score, false);

    // this is always the same. Question that points to current question points to current question's next.
    const indexRedirect = questions.findIndex(item=>item.indexNext === indexCurrent);
    const indexRedirectNext = questions[indexCurrent].indexNext;

    // these positions are only a starting point; final positions are set by ifTrue and ifFalse
    const positionsIfTrue  = this.calcPositions(questions, scoreIfTrue,  true);
    const positionsIfFalse = this.calcPositions(questions, scoreIfFalse, false);

    // ifTrue and ifFalse return keys 'positions', 'indexAfter', 'indexBefore', and 'label'
    const ifTrue = actionsScoringObject.findIndexByPositions(questions, indexCurrent, positionsIfTrue, indexRedirect, this.props.user.id);
    const ifFalse = actionsScoringObject.findIndexByPositions(questions, indexCurrent, positionsIfFalse, indexRedirect, this.props.user.id);
    console.log(
      'illegal positions',ifTrue.illegal,
      'indexRedirect',indexRedirect,
      'indexRedirectNext',indexRedirectNext,
      'ifTrue.indexAfter', ifTrue.indexAfter,
      'ifTrue.indexBefore', ifTrue.indexBefore,
      'ifFalse.indexAfter',ifFalse.indexAfter,
      'ifFalse.indexBefore',ifFalse.indexBefore
    )

    if(ifTrue.indexAfter === null) {
      alert(ifTrue.label);
    } else if (ifFalse.indexAfter === null) {
      alert(ifFalse.label);
    } else {
      const scoringObject = {
        idQuestion: question.id,
        idUser: this.props.user.id,
        idQuiz: this.props.quiz.id,
        indexCurrent,
        scorePrior: question.score,
        indexNextPrior: question.indexNext,
        scoreIfTrue,
        positionsIfTrue:              ifTrue.positions,
        indexInsertAfterIfTrue:       ifTrue.indexAfter,
        indexInsertBeforeIfTrue:      ifTrue.indexBefore,
        indexInsertAfterIfTrueLabel:  ifTrue.label,
        scoreIfFalse,
        positionsIfFalse:             ifFalse.positions,
        indexInsertAfterIfFalse:      ifFalse.indexAfter,
        indexInsertBeforeIfFalse:     ifFalse.indexBefore,
        indexInsertAfterIfFalseLabel: ifFalse.label,
        indexRedirect,
        indexRedirectNext,
      };
      this.props.dispatch(actionsScoringObject.loadScoringObject(scoringObject));
    }
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
    // calculates theoretical positions based on prior score correct/incorrect. Only a helper function before findIndexByPositions()
    if(score < 2) return 2;
    const variantLo = Math.floor(Math.random() * 2);
    const variantHi = Math.ceil(questions.length * 0.05); // array of 1-20 = 1; array of 21-40 = 2; array of 40-80 = 4...
    const randomAdder = correct ?
      Math.ceil(Math.random() * variantHi) : // array of 1-20 = 1 ; array of 21-40 = 1 or 2 ; array of 41-80 = 1-4
      Math.ceil(Math.random() * variantLo) ; // 1-2
    const maxPositions = questions.length - randomAdder - 5; // array of 10=10-1-5=4 ; array of 20=20-1-5=14 || 20=20-2-5=13 
    if(!correct && score >= questions.length/2) { 
      return Math.ceil(questions.length/2) + variantLo;
    }
    if(!correct) return score + variantLo; // array of 10 = score <= 4; 4+1=5, or 4+2=6; array of 20 = score <= 9; 9+1=10, or 9+2=11; 
    if(score > maxPositions) return maxPositions;
    return score;
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

  handleSubmitButton(choices, typeAnswer) {
    console.log(' ');
    console.log('SUBMITTING', choices);
    if(this.state.formIsEmpty) return;
    const formattedChoices = this.formatChoice(choices, typeAnswer);
    const answerObject = {...this.props.scoringObject, choices: formattedChoices}
    this.props.dispatch(actionsQuestions.answerQuestion(
      answerObject, 
      this.props.user.authToken)); 
  }

  handleNextButton(indexNext) {
    console.log(' ');
    console.log('ADVANCING', indexNext);
    const nextState = {...this.props.quiz.nextState};

    // console.log('handleNext indexNext', indexNext);
    if(this.props.quiz.showingAnswers && this.props.user.id){
      this.props.reset();

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

      this.updateScoringObject(
        this.props.questions, 
        this.props.quiz.indexCurrent, 
        this.props.questions[this.props.quiz.indexCurrent]
      );

    } else {
      console.log('not showing answer', this.props.quiz.showingAnswers)
    }
  }

  render() {
    const quiz = this.props.quiz ? this.props.quiz : {showingAnswers: false, indexCurrent: 0, nextState: {} };
    const questions = this.props.questions ? this.props.questions : [{question: null, answers: null, typeAnswer: null, typeQuestion: null, indexNext: 0}] ;

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
          name='textInput' 
          id='textInput'
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
    
    const results = quiz.showingAnswers ? <Results reason={question.reason} resources={question.resources}/> : null ;

    return (
    <div className="quiz">
      <p className="questionAsked">{questions[quiz.indexCurrent].question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, question.typeAnswer)
      )}>
        {options}
        <div className="questionButtons">
         <div className="questionStatus">{status}</div>
         {button}
         <div className="questionStatus">{status}</div>
        </div>
      </form>
      <SpacedRepGraphic />
      {results}
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