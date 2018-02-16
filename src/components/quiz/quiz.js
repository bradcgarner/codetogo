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
      quiz: this.props.quiz,
      questions: this.props.questions,
      indexCurrent: this.props.quiz.indexCurrent,
      question: typeof this.props.quiz.indexCurrent === 'number' ? 
        this.props.questions[this.props.quiz.indexCurrent] : 
        {answers: null, question: null, typeAnswer: null, typeQuestion: null} ,
      formIsEmpty: true,
      showingAnswer: false,
    }
  }

  componentDidMount() {
    // componentDidMount should run only once
    console.log('componentDidMount');
    this.setState({ indexNext: this.state.question.indexNext })
    this.updateScoringObject(this.props.questions, this.props.quiz.indexCurrent, this.props.questions[this.props.quiz.indexCurrent]);
  }

  updateScoringObject(questions, indexCurrent, question){
    console.log('updateScoringObject indexCurrent', indexCurrent);
    const scoreIfTrue  = this.calcScore(question.score, true);
    const scoreIfFalse = this.calcScore(question.score, false);

    const positionsIfTrue  = this.calcPositions(questions, scoreIfTrue,  true);
    const positionsIfFalse = this.calcPositions(questions, scoreIfFalse, false);
    // console.log(' t r u e')
    const indexInsertAfterIfTrue  = this.findIndex(questions, indexCurrent, positionsIfTrue).indexNext;
    const indexInsertAfterIfTrueLabel  = this.findIndex(questions, indexCurrent, positionsIfTrue).label;
    // console.log('***',indexInsertAfterIfTrue)
    // console.log(' f a l s e')
    const indexInsertAfterIfFalse = this.findIndex(questions, indexCurrent, positionsIfFalse).indexNext;
    const indexInsertAfterIfFalseLabel = this.findIndex(questions, indexCurrent, positionsIfFalse).label;
    // console.log('***',indexInsertAfterIfFalse)
    // console.log(' ')
    const indexInsertBeforeIfTrue  = (Array.isArray(questions) && this.props.user.id) ? questions[indexInsertAfterIfTrue ].indexNext : null;
    const indexInsertBeforeIfFalse = (Array.isArray(questions) && this.props.user.id) ? questions[indexInsertAfterIfFalse].indexNext : null;

    this.setState({
      scoringObject:{
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
      }
    });
  }

  updateQuestion(index) {
    console.log('update question to:');
    console.log('quiz', this.props.quiz);
    console.log('questions', this.props.questions);
    console.log('indexCurrent', this.props.quiz.indexCurrent);
    console.log('this.state.indexNext', this.state.indexNext);
    console.log('indexNext', this.props.questions[this.state.indexNext].indexNext);
    console.log('question', this.props.questions[this.props.quiz.indexCurrent]);
    this.setState({
      quiz: this.props.quiz,
      questions: this.props.questions,
      indexCurrent: this.state.indexNext,
      indexNext: this.props.questions[this.state.indexNext].indexNext,
      question: typeof this.props.quiz.indexCurrent === 'number' ? 
        this.props.questions[this.props.quiz.indexCurrent] : 
        {answers: null, question: null, typeAnswer: null, typeQuestion: null} ,
      formIsEmpty: true,
      showingAnswer: false,
    });
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
    const maxPositions = questions.length - randomAdder - 1;
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

  formatChoice(choices){
    // converts object with properties into an array with all choices. Used even if only 1 choice made.
    let formattedChoices = [];
    for ( let prop in choices ) {
      formattedChoices.push(choices[prop]);
    }
    return formattedChoices;
  }

  handleSubmitButton(choices, scoringObject) {
    // console.log('enter submitting', choices, request)
    if(this.state.formIsEmpty) return;
    const formattedChoices = this.formatChoice(choices);
    this.setState({
      showingAnswer: true
    });
    const answerObject = {...scoringObject, choices: formattedChoices}
    console.log('submitting', answerObject);
    this.props.dispatch(actionsQuestions.answerQuestion(
      answerObject, 
      this.props.user.authToken)); 
  } 

  handleNextButton(indexNext) {
    console.log('handleNext indexNext', indexNext);
    if(this.state.showingAnswer){
      console.log('updateQuizIndexCurrent ... store')
      console.log('current index before', this.props.quiz.indexCurrent, 'store')
      this.props.dispatch(actionsQuiz.updateQuizIndexCurrent(indexNext));
      console.log('current index after', this.props.quiz.indexCurrent, 'store')
      console.log('reset')
      this.props.reset();   
      console.log('updateQuestion')
      this.updateQuestion();
      console.log('updateScoringObject')
      this.updateScoringObject(this.props.questions, indexNext, this.props.questions[indexNext])
    } else {
      console.log('not showing answer', this.state.showingAnswer)
    }
  }

  render() {
    const results = this.state.showingAnswer ? <Results/> : null ;
    const typeAnswer = this.state.question.typeAnswer;
    const options = Array.isArray(this.state.question.answers) ? 
      this.state.question.answers.map((answer,index)=>{
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
      }) 
    : null ;

    const submitButtonClass = this.state.formIsEmpty   ? 'submitButton inactive' : 'submitButton' ;
    const nextButtonClass   = this.state.showingAnswer ? 'submitButton inactive' : 'submitButton' ;
    const button = this.state.showingAnswer ? 
      <button className={nextButtonClass} type="button" onClick={()=>this.handleNextButton(this.state.indexNext)}>Next</button>
      : <button className={submitButtonClass} type="submit">Submit</button> ;
    const spacedRepGraphic = this.state.scoringObject ?
      <SpacedRepGraphic
      scoringObject={this.state.scoringObject}
      quiz={this.state.quiz}
      questions={this.state.questions}/> : null ;

    return (
    <div className="quiz">
      <p className="questionAsked">{this.state.question.question}</p>
      <form className="questionForm" onSubmit={this.props.handleSubmit(values =>
        this.handleSubmitButton(values, this.state.scoringObject)
      )}>
        <ul className="questionOptions"> {options} </ul>
        <div className="questionButtons">
         {button}
        </div>
      </form>
      {results}
      {spacedRepGraphic}
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