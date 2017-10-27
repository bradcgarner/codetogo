import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  
  const containerClass = props.mode === 'question' ? 'statusBarContainer' : 'statusIconContainer' ;

  const total = props.total;
  const originalLength = props.originalLength || total;
  const priorCompleted = originalLength - total;
  const current = props.currentIndex + priorCompleted + 1;
  const currentIndex = props.currentIndex + priorCompleted;
  const completed = props.completed + priorCompleted;
  const correct = props.correct;
  console.log('total',total,'current',current,'currentIndex',currentIndex,'completed',completed,'correct',correct);
  
  const totalPct = 100;
  const currentPct = (current/originalLength)*100 || 0;
  const currentIndexPct = (currentIndex/originalLength)*100 || 0;
  const completedPct = (completed/originalLength)*100 || 0;
  const correctPct = (correct/completed)*100 || 0;
  console.log('total',totalPct,'current',currentPct,'currentIndex',currentIndexPct,'completed',completedPct,'correct',correctPct);
  
  return (
    <div className={containerClass}>
      <div className="statusBarTotal statusBar" style={{width: totalPct + '%'}}></div>
      <div className="statusBarCurrent statusBar" style={{width: currentPct + '%'}}></div>
      <div className="statusBarCurrentIndex statusBar" style={{width: currentIndexPct + '%'}}></div>
      <div className="statusBarCompletedContainer statusBar" style={{width: completedPct + '%'}}>
        <div className="statusBarCompleted statusBar" style={{width: 100 + '%'}}></div>
        <div className="statusBarCorrect statusBar" style={{width: correctPct + '%'}}></div>
      </div>
    </div>
  );
}

export default connect()(StatusBar);