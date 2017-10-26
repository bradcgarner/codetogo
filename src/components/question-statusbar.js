import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  
  const containerClass = props.mode === 'question' ? 'statusBarContainer' : 'statusIconContainer' ;

  const total = props.total;
  const current = props.currentIndex + 1;
  const currentIndex = props.currentIndex;
  const completed = props.completed;
  const correct = props.correct;
  console.log('total',total,'current',current,'currentIndex',currentIndex,'completed',completed,'correct',correct);
  
  const totalPct = 100;
  const currentPct = (current/total)*100 || 0;
  const currentIndexPct = (currentIndex/total)*100 || 0;
  const completedPct = (completed/total)*100 || 0;
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