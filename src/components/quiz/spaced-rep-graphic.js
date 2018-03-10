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

  const questionObjectArray = props.questions.map((question, index)=>{
    
    // top of graphic - shows score (always show, just hide if not current)
    const falseScore     = question.index === indexCurrent           ? 'false' : 'transparent' ;
    const trueScore      = question.index === indexCurrent           ? 'true'  : 'transparent' ;
    
    // middle of graphic - shows current (always show, just change class)
    const indexClass     = question.index === indexCurrent           ? 'questionConstant currentQuestion priorQuestion' : 
                           question.index === indexNextPrior         ? 'questionConstant nextQuestion'  : 'questionConstant' ;
    const indexNextClass = question.indexNext === indexCurrent       ? 'cell currentQuestion nextQuestion' : 
                           question.indexNext === indexCurrent       ? 'questionConstant priorQuestion' : 'questionConstant' ;
    
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