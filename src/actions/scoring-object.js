// scoringObject is the object that handles behavior of the spaced repetition algorithm once the quiz is scored

export const LOAD_SCORING_OBJECT = 'LOAD_SCORING_OBJECT';
export const loadScoringObject = scoringObject => ({
  type: LOAD_SCORING_OBJECT,
  scoringObject,    
});

// @@@@@@@@@@@@@@ HELPER FUNCTION TO QUIZ @@@@@@@@@@@@@@

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
  if(indexAfter <0 || indexBefore <0) return errorObject ('Sorry, invalid index found');
    
  let label = `${indexCurrent}-->>${indexAfter}`;

  let actualPositions = 1;
  let recalcNeeded = true;
  do {
    indexAfter = questions[indexAfter].indexNext;
    label += `->${indexAfter}`;
    indexBefore = questions[indexAfter].indexNext;
    actualPositions += 1;
    console.log('act pos',actualPositions, 'of' , positions,': ', label)
    if(indexAfter <0 || indexBefore <0) return errorObject ('Sorry, invalid index found along the way');

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
  // console.log('indexRedirect',indexRedirect);
  // console.log('indexCurrent',indexCurrent);
  // console.log('indexNext',newQuestions[indexCurrent].indexNext);
  // console.log('^ v')
  // console.log('indexBefore',indexBefore);
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