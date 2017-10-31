import React from 'react';
import { connect } from 'react-redux';

export class StatusBar extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log('this.props in statusbar', this.props);
    let isQuestion = true;
    if (this.props.mode === 'quizlist'){
      isQuestion = false;
    } else if (this.props.mode === 'dashboard') {
      isQuestion = false;      
    }

    const containerClass = isQuestion ? 'statusBarContainer' : 'statusIconContainer' ;
  
    const currentLength = this.props.total;
    const totalLength = this.props.originalLength || currentLength; // this.props.originalLength is available in question mode only
  
    const totalCompleted = this.props.completed || 0; // reads directly from quiz, which updates as we go, includes
    const priorCompleted = totalLength - currentLength;
    const currentCompleted = totalCompleted - priorCompleted;
    
    const currentIndex = isQuestion ? this.props.currentIndex : 0 ;
    const currentIndexDisplay = isQuestion ? this.props.currentIndex + 1 : 0 ;
    const totalIndexDisplay = isQuestion ? currentIndexDisplay + priorCompleted : 0 ;
    
    let currentSkipped = isQuestion ? currentIndex - currentCompleted : 0 ;
    if (this.props.mode === 'results') {currentSkipped = currentIndex + 1 - currentCompleted}
    const totalCorrect = this.props.correct || 0;
    const totalIncorrect = totalCompleted - totalCorrect;
    const justOne = this.props.mode === 'question' ? 1 : 0 ; // more restrictive than isQuestion
    
    const attempt = this.props.attempt; // || 0;
    
    const currentSkippedPct = (currentSkipped/totalLength)*100 || 0;
    const totalIncorrectPct = (totalIncorrect/totalLength)* 100 || 0;
    const totalCorrectPct = (totalCorrect/totalLength)*100 || 0;
    const justOnePct = (justOne/totalLength)*100;

    const totalDisplay = isQuestion ? totalLength : '' ;   
    const skipDisplay = (isQuestion && currentSkipped>0) ? <span>{currentSkipped}/{totalLength}</span> : '' ;
    const correctDisplay = (isQuestion && totalCorrect>0)? <span>{totalCorrect}/{totalLength}</span> : '' ;
    const incorrectDisplay = (isQuestion && totalIncorrect>0)? <span>{totalIncorrect}/{totalLength}</span> : '' ;
    
    console.log(this.props.name,'attempt', attempt, 'currentLength',currentLength,'totalLength',totalLength,'totalCompleted', totalCompleted, 'currentCompleted',currentCompleted,'priorCompleted',priorCompleted,'totalIndexDisplay',totalIndexDisplay,'currentIndex',currentIndex,'currentSkipped',currentSkipped,'currentSkippedPct', currentSkippedPct,'totalIncorrect',totalIncorrect, 'totalIncorrectPct', totalIncorrectPct, 'totalCorrect', totalCorrect, 'totalCorrectPct', totalCorrectPct, 'justOne', justOne, 'justOnePct', justOnePct);
    
    return (
      <div className={containerClass}> {/* statusBarContainer statusIconContainer */}
        <div className="statusBarSkipped statusBar" style={{width: currentSkippedPct + '%'}}>{skipDisplay}</div>
        <div className="statusBarIncorrect statusBar" style={{width: totalIncorrectPct + '%'}}>{incorrectDisplay}</div>
        <div className="statusBarCorrect statusBar" style={{width: totalCorrectPct + '%'}}>{correctDisplay}</div>
        <div className="statusBarJustOne statusBar" style={{width: justOnePct + '%'}}></div>
      </div>
    );
  }
}

export default connect()(StatusBar);