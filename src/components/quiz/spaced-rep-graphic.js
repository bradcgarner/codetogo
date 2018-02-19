import React from 'react';
import { connect } from 'react-redux';

export function SpacedRepGraphic(props) {
  // Component function: graphic display of spaced repetition algorithm, both for development testing AND for programmers curious about the algorithm

  const {
    indexCurrent,
    indexNextPrior,
    scorePrior,
    scoreIfTrue,
    scoreIfFalse,
    positionsIfTrue,
    positionsIfFalse,
    indexInsertAfterIfTrue,
    indexInsertAfterIfTrueLabel,
    indexInsertAfterIfFalse,
    indexInsertAfterIfFalseLabel,
    indexInsertBeforeIfTrue,
    indexInsertBeforeIfFalse
  } = props.scoringObject;
  // console.log('spacedRepGraphic indexCurrent', indexCurrent)

  const questionObjectArray = props.questions.map((question, index)=>{
    const falseScore     = question.index === indexCurrent ? 'false' : 'transparent' ;
    const trueScore      = question.index === indexCurrent ? 'true' : 'transparent' ;
    const indexClass     = question.index === indexCurrent ? 'questionConstant currentQuestion priorQuestion' : 
                           question.index === indexNextPrior ? 'questionConstant nextQuestion' : 'questionConstant' ;
    const indexNextClass = question.index === indexCurrent ? 'cell currentQuestion nextQuestion' : 
                           question.indexNext === indexCurrent ? 'questionConstant priorQuestion' : 'questionConstant' ;
    const indexNextTrue  = question.index === indexCurrent ? indexInsertBeforeIfTrue :
                           question.index === indexInsertAfterIfTrue ? indexCurrent : 
                           question.indexNext === indexCurrent ? indexNextPrior : null ;
    const indexNextFalse = question.index === indexCurrent ? indexInsertBeforeIfFalse :
                           question.index === indexInsertAfterIfFalse ? indexCurrent : 
                           question.indexNext === indexCurrent ? indexNextPrior : null ;
    
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
        <div>indexNext = {indexNextPrior}</div>
        <div>quiz score now = {props.quiz.score}</div>
        <div>if true: {indexCurrent} + {indexInsertAfterIfTrueLabel} = {indexInsertAfterIfTrue} ... {indexInsertBeforeIfTrue} &amp; score: {scorePrior} -> {scoreIfTrue} </div>
        <div>if false: {indexCurrent} + {indexInsertAfterIfFalseLabel} = {indexInsertAfterIfFalse} ... {indexInsertBeforeIfFalse} &amp; score: {scorePrior} -> {scoreIfFalse} </div>
      </div>
    </div>
    );
}

export const mapStateToProps = state => ({
  questions: state.questions,
  quiz: state.quiz,
})

export default connect(mapStateToProps)(SpacedRepGraphic);