import { findIndexByPositions } from '../actions/scoring-object';

describe('findIndexByPositions', () => {

  it('should return null with warning if invalid index', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 'g';
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid index received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if index <0', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = -2;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid index received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if invalid redirect index', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 'x';
    const positions = 2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid redirect index received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if redirect index <0', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = -2;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid redirect index received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if positions <0', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 2;
    const positions = -2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid positions received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );

    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if non-numeric positions', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 2;
    const positions = 'y';
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid positions received', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning questions is not array', () => {
    const questions = null;
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, but we don\'t see an array of questions.', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with warning if user not logged in', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = null;
    
    const expectedResult = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, but no-one is logged in.', 
    };
    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with error if <0 index found 1st pass', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: -2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult  = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid index found', 
    };    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should return null with error if <0 index found 1st pass', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: -3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const expectedResult  = {
      indexAfter: null,
      indexBefore: null,
      positions: null, 
      label: 'Sorry, invalid index found along the way', 
    };    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should move 1 position when 0 positions passed', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 0;
    const idUser = 3;

    const indexAfter = 2;
    const indexBefore = 3;
    const actualPositions = 2;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    };    
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should move 1 position when 1 position passed', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const indexAfter = 2;
    const indexBefore = 3;
    const actualPositions = 2;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 

    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should move 2 positions when 2 positions passed', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 2;
    const idUser = 3;
    
    const indexAfter = 2;
    const indexBefore = 3;
    const actualPositions = 2;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
  
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should move 3 positions when 3 positions passed', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 3;
    const idUser = 3;
    
    const indexAfter = 3;
    const indexBefore = 4;
    const actualPositions = 3;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->2->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
   
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should move 4 positions when 4 positions passed', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 4;
    const idUser = 3;
    
    const indexAfter = 4;
    const indexBefore = 5;
    const actualPositions = 4;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->2->3->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
  
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should stop short of illegal positions (5 passed)', () => {
    const questions = [
      {indexNext: 1},
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0},
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 5;
    const idUser = 3;
    
    const indexAfter = 5;
    const indexBefore = 6;
    const actualPositions = 5;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->2->3->4->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
  
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('should should skip illegal positions 1', () => {
    const questions = [
      {indexNext: 1}, // 0 current
      {indexNext: 2},
      {indexNext: 3},
      {indexNext: 4},
      {indexNext: 5},
      {indexNext: 6},
      {indexNext: 7},
      {indexNext: 0}, // 7 redirect
    ];
    const indexCurrent = 0;
    const indexRedirect = 7;
    const positions = 7;
    const idUser = 3;
    
    const indexAfter = 1;
    const indexBefore = 2;
    const actualPositions = 9;

    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->2->3->4->5->6->7->0->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
  
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should stop short of illegal positions (3 passed)', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 2;
    const indexRedirect = 0;
    const positions = 3;
    const idUser = 3;
    
    const indexAfter = 4;
    const indexBefore = 5;
    const actualPositions = 3;

    // current  indexAfter & Before
    // V        V  V
    // 2->6->7->4->5->1->3->0->2->6
    //    ^  ^  ^  3 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>6->7->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should stop short of illegal positions (4 passed from 2)', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 2;
    const indexRedirect = 0;
    const positions = 4;
    const idUser = 3;
    
    const indexAfter = 5;
    const indexBefore = 1;
    const actualPositions = 4;

    // current     indexAfter & Before
    // V           V  V
    // 2->6->7->4->5->1->3->0->2->6
    //    ^  ^  ^  ^  4 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>6->7->4->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should skip illegal positions 2', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 2;
    const indexRedirect = 0;
    const positions = 6;
    const idUser = 3;
    
    const indexAfter = 6;
    const indexBefore = 7;
    const actualPositions = 9;

    // current           1st try  indexAfter & Before
    // V                 !  !     V  V
    // 2->6->7->4->5->1->3->0->2->6->7
    //    ^  ^  ^  ^  ^  ^  ^  ^  ^  9 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>6->7->4->5->1->3->0->2->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect],
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should stop short of illegal positions (5 passed from 2)', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 2;
    const indexRedirect = 0;
    const positions = 5;
    const idUser = 3;
    
    const indexAfter = 1;
    const indexBefore = 3;
    const actualPositions = 5;

    // current        indexAfter & ~Before
    // V              V  V
    // 2->6->7->4->5->1->3->0->2->6->7->4->5
    //    ^  ^  ^  ^  ^  5 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>6->7->4->5->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect], 
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should stop short of illegal positions (4 passed from 5)', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 5;
    const indexRedirect = 4;
    const positions = 5;
    const idUser = 3;
    
    const indexAfter = 6;
    const indexBefore = 7;
    const actualPositions = 5;

    //             current        indexAfter & ~Before
    //             V              V  V
    // 2->6->7->4->5->1->3->0->2->6->7->4->5->1->3->0->2->6->7
    //                ^  ^  ^  ^  ^  5 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->3->0->2->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect], // current & redirect
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

  it('scramble: should skip illegal positions 3', () => {
    const questions = [
      {indexNext: 2}, // 0
      {indexNext: 3}, // 1
      {indexNext: 6}, // 2
      {indexNext: 0}, // 3 
      {indexNext: 5}, // 4
      {indexNext: 1}, // 5
      {indexNext: 7}, // 6
      {indexNext: 4}, // 7
    ];
    const indexCurrent = 5;
    const indexRedirect = 4;
    const positions = 6;
    const idUser = 3;
    
    const indexAfter = 1;
    const indexBefore = 3;
    const actualPositions = 9;

    //             current           1st try  indexAfter & ~Before
    //             V                    !  !  V  V
    // 2->6->7->4->5->1->3->0->2->6->7->4->5->1->3->0->2->6->7
    //                ^  ^  ^  ^  ^  ^  ^  ^  ^  9 positions
    const expectedResult  = {
      indexAfter, indexBefore, positions: actualPositions,
      label: `${actualPositions} positions (${indexCurrent}-->>1->3->0->2->6->7->4->5->${indexAfter}...*...${indexBefore})`, 
      illegal: {
        indexInsertAfter: [indexCurrent, indexRedirect], // current & redirect
        indexInsertBefore: [indexCurrent, indexRedirect],
      }
    }; 
 
    const result = findIndexByPositions(
      questions, 
      indexCurrent, 
      positions, 
      indexRedirect, 
      idUser
    );
    for (let key in expectedResult) {
      expect(result[key]).toEqual(expectedResult[key]);
    }
  });

});