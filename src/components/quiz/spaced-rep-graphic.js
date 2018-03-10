import React from 'react';
import { connect } from 'react-redux';

export function SpacedRepGraphic(props) {
  // Component function: graphic display of spaced repetition algorithm, both for development testing AND for programmers curious about the algorithm

  const {
    indexCurrent,
    indexNextPrior,
    scorePrior,

    scoreIfTrue,
    // positionsIfTrue,
    indexInsertAfterIfTrue,    
    indexInsertBeforeIfTrue,
    indexInsertAfterIfTrueLabel,
    
    scoreIfFalse,
    // positionsIfFalse,
    indexInsertAfterIfFalse,
    indexInsertBeforeIfFalse,
    indexInsertAfterIfFalseLabel,

    indexRedirect,
    indexRedirectNext,

  } = props.scoringObject;

  const indexRedirectPrior = props.questions[indexRedirect] ? props.questions[indexRedirect].indexNext : '???' ;


  const questionObjectArray = props.questions.map((question, index)=>{
    
    // top of graphic - shows score (always show, just hide if not current)
    const falseScore     = question.index === indexCurrent             ? 'false' : 'transparent' ;
    const trueScore      = question.index === indexCurrent             ? 'true'  : 'transparent' ;
    
    // middle of graphic - shows current (always show, just change class)
    const indexClass     = question.index === indexCurrent                 ? 'question-constant index-current' : 
                           question.index === indexNextPrior               ? 'question-constant index-next'  :
                           question.index === indexInsertAfterIfTrue       ? 'question-constant insert-after-if-true' : 
                           question.index === indexInsertAfterIfFalse      ? 'question-constant insert-after-if-false' : 
                           question.index === indexRedirect                ? 'question-constant index-redirect' : 
                                                                             'question-constant' ;
    const indexNextClass = question.indexNext === indexInsertBeforeIfTrue  ? 'question-constant insert-before-if-true' : 
                           question.indexNext === indexInsertBeforeIfFalse ? 'question-constant insert-before-if-false' : 
                           question.index     === indexRedirect            ? 'question-constant index-redirect-next' : 
                           question.indexNext === indexNextPrior           ? 'question-constant index-next'  :
                                                                             'question-constant' ;
    
    // bottom of graphic - shows future (constant class, value varies)
    const indexNextTrue  = question.index === indexCurrent           ? indexInsertBeforeIfTrue :
                           question.index === indexInsertAfterIfTrue ? indexCurrent : 
                           question.index === indexRedirect          ? indexRedirectNext : null ;
    const indexNextFalse = question.index === indexCurrent           ? indexInsertBeforeIfFalse :
                           question.index === indexInsertAfterIfFalse? indexCurrent : 
                           question.index === indexRedirect          ? indexRedirectNext : null ;
    
    return <div key={index} className='spacedRepObject'>
      <div className={falseScore}    >{scoreIfFalse}</div>
      <div className={trueScore}     >{scoreIfTrue}</div>
      <div className={indexClass}    >{question.index}</div>
      <div className={indexNextClass}>{question.indexNext}</div>
      <div className='true'          >{indexNextTrue}</div>
      <div className='false'         >{indexNextFalse}</div>
    </div>
  });
 
  return (
    <div className='spacedRepContainer'>
      <div className='spacedRepObjectContainer'>
        {questionObjectArray}
      </div>
      <div className='spacedRepStats'>
        <div>quiz score now = {props.quiz.score}</div>
        <div>if true:  {indexInsertAfterIfTrueLabel}  &amp; score: {scorePrior} -> {scoreIfTrue}  </div>
        <div>if false: {indexInsertAfterIfFalseLabel} &amp; score: {scorePrior} -> {scoreIfFalse} </div>
        <div>{indexNextPrior} is next regardless; redirect #{indexRedirect}'s next from {indexRedirectPrior} to {indexRedirectNext}</div>
      </div>
    </div>
    );
}

export const mapStateToProps = state => ({
  questions: state.questions,
  quiz: state.quiz,
  scoringObject: state.scoringObject,
})

export default connect(mapStateToProps)(SpacedRepGraphic);