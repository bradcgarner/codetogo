// scoringObject is the object that handles behavior of the spaced repetition algorithm once the quiz is scored

export const LOAD_SCORING_OBJECT = 'LOAD_SCORING_OBJECT';
export const loadScoringObject = scoringObject => ({
  type: LOAD_SCORING_OBJECT,
  scoringObject,    
});

// @@@@@@@@@@@@@@ HELPER FUNCTION TO QUIZ @@@@@@@@@@@@@@

export const calcScore = (scorePrior, correct) => {
  // calculates theoretical correct and incorrect scores, then sends both scores to the back end, back end grades (correct/incorrect) and uses one of the scores sent to it
  const score = (typeof scorePrior === 'number' && scorePrior >=2) ? scorePrior : 2 ;
  const changeFactor = correct ? Math.ceil(Math.sqrt(scorePrior)) : Math.ceil(scorePrior/2) ;
  if(correct) return Math.ceil(score + changeFactor);
  return changeFactor;
};

export const calcPositions = (questions, score, correct) => {
  // calculates theoretical positions based on prior score correct/incorrect. Only a helper function before findIndexByPositions()
  if(score < 2) return 2;

  // maximum positions based on score and length
  const scorePctOfLength = Math.floor(score/questions.length) >= 50 ? 0.95 :
  Math.floor(score/questions.length) >= 44 ? 0.90 :
  Math.floor(score/questions.length) >= 38 ? 0.85 :
  Math.floor(score/questions.length) >= 32 ? 0.87 :
  Math.floor(score/questions.length) >= 28 ? 0.85 :
  Math.floor(score/questions.length) >= 24 ? 0.82 :
  Math.floor(score/questions.length) >= 20 ? 0.80 :
  Math.floor(score/questions.length) >= 18 ? 0.75 :
  Math.floor(score/questions.length) >= 16 ? 0.70 :
  Math.floor(score/questions.length) >= 13 ? 0.65 :
  Math.floor(score/questions.length) >= 11 ? 0.62 :
  Math.floor(score/questions.length) >= 10 ? 0.60 :
  Math.floor(score/questions.length) >=  9 ? 0.55 :
  Math.floor(score/questions.length) >=  8 ? 0.50 :
  Math.floor(score/questions.length) >=  7 ? 0.45 :
  Math.floor(score/questions.length) >=  6 ? 0.40 :
  Math.floor(score/questions.length) >=  5 ? 0.35 :
  Math.floor(score/questions.length) >=  4 ? 0.30 :
  Math.floor(score/questions.length) >=  3 ? 0.25 :
  Math.floor(score/questions.length) >=  2 ? 0.20 :
  Math.floor(score/questions.length) >=  1 ? 0.15 : 0.10 ;

  const maxPositions = Math.floor(questions.length * scorePctOfLength);

  if(!correct) return Math.floor(maxPositions/2);
  if(maxPositions > score ) return score;
  if(scorePctOfLength >= 0.75) return maxPositions - 2;
  return maxPositions;
};

export const findIndexByPositions = (questions, indexCurrent, positions, indexRedirect, idUser) => {
  // calculates theoretical index based on positions moved. 
  // submit sends theoretical indices to server, and server uses one of the indices sent.
  // returns keys 'positions', 'indexAfter', 'indexBefore', and 'label'
  // track illegal moves

  const errorObject = message => ({
    indexAfter: null,
    indexBefore: null,
    positions: null, 
    label: message, 
  });

  const illegal = {
    indexInsertAfter: [indexCurrent, indexRedirect],
    indexInsertBefore: [indexCurrent, indexRedirect],
  };

  if(isNaN(indexCurrent) || indexCurrent <0) return errorObject('Sorry, invalid index received');
  if(isNaN(indexRedirect) || indexRedirect <0) return errorObject('Sorry, invalid redirect index received');
  if(isNaN(positions) || positions <0) return errorObject('Sorry, invalid positions received');
  if(!(Array.isArray(questions))) return errorObject('Sorry, but we don\'t see an array of questions.');
  if(!idUser) return errorObject('Sorry, but no-one is logged in.');

  // set indexAfter incrementally by position count; label accumulates all positions
  let indexAfter = questions[indexCurrent].indexNext;
  let indexBefore = questions[indexAfter].indexNext;
  if(indexAfter<0 || indexBefore<0) return errorObject ('Sorry, invalid index found');
    
  let label = `${indexCurrent}-->>${indexAfter}`;

  let actualPositions = 1;
  let recalcNeeded = true;
  do {
    indexAfter = questions[indexAfter].indexNext;
    label += `->${indexAfter}`;
    indexBefore = questions[indexAfter].indexNext;
    actualPositions += 1;
    console.log('act pos',actualPositions, 'of' , positions,': ', label)
    if(indexAfter<0 || indexBefore<0) return errorObject ('Sorry, invalid index found along the way');

    if(actualPositions >= positions) {
      if(!(illegal.indexInsertAfter.includes(indexAfter))){
        if(!(illegal.indexInsertBefore.includes(indexBefore))) {
          recalcNeeded = false;
        }
      }
    }
  } while ( recalcNeeded && actualPositions <= questions.length + 1);

  const newQuestions = questions.map(question=>{
    return { index: question.index, indexNext: question.indexNext };
  });
  newQuestions[indexRedirect].indexNext = newQuestions[indexCurrent].indexNext;
  newQuestions[indexCurrent].indexNext = indexBefore;
  newQuestions[indexAfter].indexNext = indexCurrent;
  console.log('newQuestions',newQuestions);
  const continuityResult = continuityTest(newQuestions);
  console.log('continuityResult',continuityResult);

  if(continuityResult.fullLoop !== questions.length) {
    return errorObject('Loop error')
  }

  if(actualPositions > questions.length + 1) {
    return errorObject('Index error');
  }

  return {
    indexAfter, 
    indexBefore, 
    positions: actualPositions,
    label: `${actualPositions} positions (${label}...*...${indexBefore})`,
    illegal,
  };

};

export const continuityTest = questions => {
  let count = 1;
  let indexNext = questions[0].indexNext;
  const tracker = [{index: 0, indexNext}];
  let fullLoop = null;
  while (fullLoop === null) {
    tracker.push({index: indexNext, indexNext: questions[indexNext].indexNext})
    indexNext = questions[indexNext].indexNext;
    count += 1;
    if(indexNext === 0) fullLoop = count;
    if(count > questions.length) fullLoop = 'length';
  }
  return {fullLoop, tracker};
}

export const updateScoringObject = (indexCurrent, questions, question, indexRedirect, indexRedirectNext, idUser) => dispatch => {
    
  const scoreIfTrue  = calcScore(question.score, true);
  const scoreIfFalse = calcScore(question.score, false);

  // these positions are only a starting point; final positions are set by ifTrue and ifFalse
  const positionsIfTrue  = calcPositions(questions, scoreIfTrue,  true);
  const positionsIfFalse = calcPositions(questions, scoreIfFalse, false);
  // ifTrue and ifFalse return keys 'positions', 'indexAfter', 'indexBefore', and 'label'
  const ifTrue = findIndexByPositions(questions, indexCurrent, positionsIfTrue, indexRedirect, idUser);
  const ifFalse = findIndexByPositions(questions, indexCurrent, positionsIfFalse, indexRedirect, idUser);

  if(ifTrue.indexAfter === null) {
    alert(ifTrue.label);
  } else if (ifFalse.indexAfter === null) {
    alert(ifFalse.label);
  } else {
    const scoringObject = {
      idQuestion: question.id,
      idUser,
      idQuiz: question.idQuiz,
      indexCurrent,
      scorePrior: question.score,
      indexNextPrior: question.indexNext,
      scoreIfTrue,
      positionsIfTrue:              ifTrue.positions,
      indexInsertAfterIfTrue:       ifTrue.indexAfter,
      indexInsertBeforeIfTrue:      ifTrue.indexBefore,
      indexInsertAfterIfTrueLabel:  ifTrue.label,
      scoreIfFalse,
      positionsIfFalse:             ifFalse.positions,
      indexInsertAfterIfFalse:      ifFalse.indexAfter,
      indexInsertBeforeIfFalse:     ifFalse.indexBefore,
      indexInsertAfterIfFalseLabel: ifFalse.label,
      indexRedirect,
      indexRedirectNext,
    };
    console.log('scoringObject',scoringObject)
    dispatch(loadScoringObject(scoringObject));
  }
}