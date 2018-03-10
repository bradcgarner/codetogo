import * as actions from '../actions/scoring-object';
import { initialScoringObject } from './initialState';

export const reducer = ( state = initialScoringObject, action ) => {

  if ( action.type === actions.LOAD_SCORING_OBJECT ) {
    return action.scoringObject;
  }
  return state;
}

