import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  console.log('props in statusbar', props);
  const containerClass = props.mode === 'question' ? 'statusBarContainer' : 'statusIconContainer' ;

  const currentLength = props.total;
  const totalLength = props.originalLength || currentLength;

  const totalCompleted = props.completed; // reads directly from quiz, which updates as we go, includes
  const currentCompleted = totalCompleted - priorCompleted;
  const priorCompleted = totalLength - currentLength;
  
  const totalIndex = props.mode === 'question' ? props.currentIndex + priorCompleted + 1 : 0 ;
  const currentIndex = props.mode === 'question' ? props.currentIndex + 1 : 0 ;
  
  const currentSkipped = props.mode === 'question' ? currentIndex - currentCompleted : 0 ;
  const totalCorrect = props.correct || 0;
  const totalIncorrect = totalCompleted - totalCorrect;
  const justOne = props.mode === 'question' ? 1 : 0 ;
  
  const attempt = props.attempt; // || 0;
  
  // const currentLengthPct = 100;
  // const totalIndexPct = (totalIndex/totalLength)*100 || 0;
  // const completedPct = (completed/totalLength)*100 || 0;
  const currentSkippedPct = (currentSkipped/totalLength)*100 || 0;
  const totalIncorrectPct = (totalIncorrect/totalLength)* 100 || 0;
  const totalCorrectPct = (totalCorrect/totalLength)*100 || 0;
  const justOnePct = (justOne/totalLength)*100;
  console.log(props.name,'attempt', attempt, 'currentLength',currentLength,'totalLength',totalLength,'currentCompleted',currentCompleted,'priorCompleted',priorCompleted,'totalIndex',totalIndex,'currentIndex',currentIndex,'currentSkipped',currentSkipped,'currentSkippedPct', currentSkippedPct,'totalIncorrect',totalIncorrect, 'totalIncorrectPct', totalIncorrectPct, 'totalCorrect', totalCorrect, 'totalCorrectPct', totalCorrectPct, 'justOne', justOne, 'justOnePct', justOnePct);
  
  return (
    <div className={containerClass}> {/* statusBarContainer statusIconContainer */}
      <div className="statusBarSkipped statusBar" style={{width: currentSkippedPct + '%'}}></div>
      <div className="statusBarIncorrect statusBar" style={{width: totalIncorrectPct + '%'}}></div>
      <div className="statusBarCorrect statusBar" style={{width: totalCorrectPct + '%'}}></div>
      <div className="statusBarJustOne statusBar" style={{width: justOnePct + '%'}}></div>
    </div>
  );
}

export default connect()(StatusBar);