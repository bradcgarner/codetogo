import React from 'react';
import { connect } from 'react-redux';

export function ResultsScore(props) {

  const quizId = props.quiz.id;
  const currentQuizUser = props.user.quizzes.filter(quiz => quiz.id === quizId); // total # of quizzes
  const total = currentQuizUser[0].completed;
  const correct = currentQuizUser[0].correct;

    return (
      <div>
          <p>Total Questions:{total}</p>
          <p>Total Correct:{correct}</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(ResultsScore);