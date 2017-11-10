import React from 'react';
import { connect } from 'react-redux';

export class StatusBar extends React.Component {

  render() {
    let isQuestion = true;
    if (this.props.mode === 'quizlist'){
      isQuestion = false;
    } else if (this.props.mode === 'dashboard') {
      isQuestion = false;      
    }

    const thisQuiz = this.props.quiz;

    const containerClass = isQuestion ? 'statusBarContainer tooltip' : 'statusIconContainer tooltip' ;
  
    const currentLength = thisQuiz.total;
    const totalLength = thisQuiz.originalLength || currentLength; // this.props.originalLength is available in question mode only
  
    const totalCompleted = thisQuiz.completed || 0; // reads directly from quiz, which updates as we go, includes
    const priorCompleted = totalLength - currentLength;
    const currentCompleted = totalCompleted - priorCompleted;
    
    const currentIndex = isQuestion ? thisQuiz.currentIndex : 0 ;
    const currentIndexDisplay = isQuestion ? thisQuiz.currentIndex + 1 : 0 ;
    const totalIndexDisplay = isQuestion ? currentIndexDisplay + priorCompleted : 0 ;
    const currentIndexDisplayTooltip = isQuestion ? <p>Current Question: {totalIndexDisplay}</p> : '' ;
    
    let currentSkipped = isQuestion ? currentIndex - currentCompleted : 0 ;
    if (this.props.mode === 'results') {currentSkipped = currentIndex + 1 - currentCompleted}
    const totalCorrect = thisQuiz.correct || 0;
    const totalIncorrect = totalCompleted - totalCorrect;
    const justOne = this.props.mode === 'question' ? 1 : 0 ; // more restrictive than isQuestion
        
    const currentSkippedPct = (currentSkipped/totalLength)*100 || 0;
    const totalIncorrectPct = (totalIncorrect/totalLength)* 100 || 0;
    const totalCorrectPct = (totalCorrect/totalLength)*100 || 0;
    const justOnePct = (justOne/totalLength)*100;

    const skipDisplay = (isQuestion && currentSkipped>0) ? <span>{currentSkipped}/{totalLength}</span> : '' ;
    const correctDisplay = (isQuestion && totalCorrect>0)? <span>{totalCorrect}/{totalLength}</span> : '' ;
    const incorrectDisplay = (isQuestion && totalIncorrect>0)? <span>{totalIncorrect}/{totalLength}</span> : '' ;
    
    let currentSkippedTooltip = isQuestion ? <tr><td>Skipped</td><td>{currentSkipped}</td><td>{Math.round(currentSkippedPct,0)}%</td></tr> : <tr></tr> ;
    
    const tooltip = <div className="tooltipText popover">
      <h4>{thisQuiz.name}</h4>
      <table>
        <tbody>
          <tr><td>Category</td><td colSpan={2}>{thisQuiz.category}</td></tr>
          <tr><td>Difficulty</td><td colSpan={2}>{thisQuiz.difficulty}</td></tr>
          <tr><td>Attempts</td><td colSpan={2}>{thisQuiz.attempt}</td></tr>
          <tr><td>Completed</td><td colSpan={2}>{totalCompleted}</td></tr>
          <tr><td>Correct</td><td>{totalCorrect}</td><td>{Math.round(totalCorrectPct,0)}%</td></tr>
          <tr><td>Incorrect</td><td>{totalIncorrect}</td><td>{Math.round(totalIncorrectPct,0)}%</td></tr>
          {currentSkippedTooltip}
        </tbody>
      </table>
      {currentIndexDisplayTooltip}
    </div>

    return (
      <div className={containerClass}> {/* statusBarContainer statusIconContainer */}
        <div className="statusBarSkipped statusBar" style={{width: currentSkippedPct + '%'}}>{skipDisplay}</div>
        <div className="statusBarIncorrect statusBar" style={{width: totalIncorrectPct + '%'}}>{incorrectDisplay}</div>
        <div className="statusBarCorrect statusBar" style={{width: totalCorrectPct + '%'}}>{correctDisplay}</div>
        <div className="statusBarJustOne statusBar" style={{width: justOnePct + '%'}}></div>
        {tooltip}
      </div>
    );
  }
}

export default connect()(StatusBar);