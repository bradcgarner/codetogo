import * as actionsQuiz from '../actions/quiz';

describe('ACTIONS', () => {
  // it('Should be question', () => {
  //   const questions = ['1', '2', '3']
  //   const action = actionsQuiz.questions(questions);
  //   expect(action.type).toEqual('QUESTIONS');
  //   expect(action.questions).toEqual(['1', '2', '3']);
  // });

  it('Should be toggleFormStatus', () => {
    const status = true;
    const action = actionsQuiz.toggleFormStatus(status);
    expect(action.type).toEqual('TOGGLE_FORM_STATUS');
    expect(action.formIsEmpty).toEqual(true);
  });

  it('Should be loadQuiz', () => {
    const quiz = {
      type: 'some value that doesn\'t matter',
      id: 'quiz.id',    
      name: 'quiz.name',
      category: 'quiz.category',
      difficulty: 'quiz.difficulty',
      questions: 'quiz.questions',
      originalLength: 'quiz.originalLength',
      attempt: 'quiz.attempt',
      currentIndex: 'quiz.nextIndex',
      nextIndex: 33,
      completed: 'quiz.completed',
      correct: 'quiz.correct' 
    }
    const action = actionsQuiz.loadQuiz(quiz);
    expect(action.type).toEqual('LOAD_QUIZ');
    expect(action.id).toEqual('quiz.id');
    expect(action.name).toEqual('quiz.name');
    expect(action.category).toEqual('quiz.category');
    expect(action.difficulty).toEqual('quiz.difficulty');
    expect(action.questions).toEqual('quiz.questions');
    expect(action.originalLength).toEqual('quiz.originalLength');
    expect(action.attempt).toEqual('quiz.attempt');
    expect(action.currentIndex).toEqual(33);
    expect(action.completed).toEqual('quiz.completed');
    expect(action.correct).toEqual('quiz.correct');
  });

  it('Should be nextQuestion', () => {
    const quiz = {
      type: 'some value that doesn\'t matter',
      id: 'quiz.id',    
      name: 'quiz.name',
      category: 'quiz.category',
      difficulty: 'quiz.difficulty',
      questions: 'quiz.questions',
      originalLength: 'quiz.originalLength',
      attempt: 'quiz.attempt',
      currentIndex: 'quiz.nextIndex',
      nextIndex: 103,
      completed: 'quiz.completed',
      correct: 'quiz.correct',
      currentIndex: 99,
      completed: 97,
      correct: 96
    }
    const action = actionsQuiz.nextQuestion(quiz);
    expect(action.type).toEqual('NEXT_QUESTION');
    expect(action.id).toEqual(undefined);
    expect(action.name).toEqual(undefined);
    expect(action.category).toEqual(undefined);
    expect(action.difficulty).toEqual(undefined);
    expect(action.questions).toEqual(undefined);
    expect(action.originalLength).toEqual(undefined);
    expect(action.attempt).toEqual(undefined);
    expect(action.currentIndex).toEqual(103);
    expect(action.completed).toEqual(97);
    expect(action.correct).toEqual(96);
  });

  it('Should be updateCurrentQuestion', () => {
    const nextIndex = 102;
    const action = actionsQuiz.updateCurrentQuestion(nextIndex);
    expect(action.type).toEqual('UPDATE_CURRENT_QUESTION');
    expect(action.id).toEqual(undefined);
    expect(action.name).toEqual(undefined);
    expect(action.category).toEqual(undefined);
    expect(action.difficulty).toEqual(undefined);
    expect(action.questions).toEqual(undefined);
    expect(action.originalLength).toEqual(undefined);
    expect(action.attempt).toEqual(undefined);
    expect(action.currentIndex).toEqual(102);
    expect(action.completed).toEqual(undefined);
    expect(action.correct).toEqual(undefined);
  });

  it('Should be scoreChoice', () => {
    const correct = {
      questionId: '123',
      correct: true,
      choices: ['x','y','z']
    }
    const action = actionsQuiz.scoreChoice(correct);
    expect(action.type).toEqual('SCORE_CHOICE');
    expect(action.questionId).toEqual('123');
    expect(action.correct).toEqual(true);
    expect(action.choices).toEqual(['x','y','z']);
  });

  it('Should be updateQuizMenu', () => {
    const menu = ['one','two','three'];
    const action = actionsQuiz.updateQuizMenu(menu);
    expect(action.type).toEqual('UPDATE_QUIZ_MENU');
    expect(action.menuOfAllQuizzes).toEqual(['one','two','three']);
  });

  it.skip('Should fetch all Quizzes', () => {
    global.fetch = jest.fn().mockImplementation( () =>
      Promise.resolve({
        ok: true,
        json() {
          return;
        }
      })
    );
    const dispatch = jest.fn();
    return actionsQuiz.fetchQuizzes()(dispatch)
      .then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalled();
        console.log(dispatch.mock.calls[0][0]);
        expect(typeof dispatch.mock.calls[0][0]).toEqual('object');
        expect(dispatch.mock.calls[0][0]).toHaveProp('type');
        expect(dispatch.mock.calls[0][0]).toHaveProp('menuOfAllQuizzes');
      });
  });
  
});