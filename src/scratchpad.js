'use strict';

/*
components/questions.js

DONE

handleSubmitButton
add argument next

submitChoices
added then to go to result & scoreQuiz

NEXT

confirm that choices.quizId is the current quiz id
write actionsQuiz.scoreQuiz
  filter store.user.quizzes toget new object with ONLY matching quiz
  filter new object's choices by correct = true
  compare quantity of true against total quantity
*/

const quizToScore = props.user.quizzes.filter(quiz=>{
  return quiz.id === quizIdToScore;
});

/* then do the same thing with choices
   filter array of choices by correct = true */


     