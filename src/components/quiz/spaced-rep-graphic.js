import React from 'react';
import { connect } from 'react-redux';

export function SpacedRepGraphic(props) {

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

  const indexRow = props.questions.map((question, index)=>{
    const cellClass = question.index === indexCurrent ? 'cell currentCell priorCell' : 
    question.index === indexNextPrior ? 'cell nextCell' : 'cell' ;
    return <td key={index} className={cellClass}>{question.index}</td>
  });
 
  const indexNextRow = props.questions.map((question, index)=>{
    const cellClass = question.index === indexCurrent ? 'cell currentCell nextCell' : 
    question.indexNext === indexCurrent ? 'cell priorCell' : 'cell' ;
    return <td key={index} className={cellClass}>{question.indexNext}</td>
  });
 
  return (
    <div className='spacedRepContainer'>
      <table className='spacedRepGraphic'>
        <tbody>
          <tr>{indexRow}</tr>
          <tr>{indexNextRow}</tr>
        </tbody>
      </table>
      <div>indexCurrent {indexCurrent}</div>
      <div>indexNext {indexNextPrior}</div>
      <div>score {scorePrior}</div>
      <br/>
      <div>scoreIfTrue {scoreIfTrue}</div>
      <div>positionsIfTrue {positionsIfTrue}</div>
      <div>indexInsertAfterIfTrue {indexInsertAfterIfTrue} {indexInsertAfterIfTrueLabel}</div>
      <div>indexInsertBeforeIfTrue {indexInsertBeforeIfTrue}</div>
      <br/>
      <div>scoreIfFalse {scoreIfFalse}</div>
      <div>positionsIfFalse {positionsIfFalse}</div>
      <div>indexInsertAfterIfFalse {indexInsertAfterIfFalse} {indexInsertAfterIfFalseLabel}</div>
      <div>indexInsertBeforeIfFalse {indexInsertBeforeIfFalse}</div>
    </div>
    );
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  questions: state.questions,
})

export default connect(mapStateToProps)(SpacedRepGraphic);