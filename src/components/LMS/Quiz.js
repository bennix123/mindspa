import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';

function Quiz({ courseId, moduleIdx, quiz }) {
  const { submitQuiz, getBestQuizScore } = useLMS();
  const quizId = `${courseId}-m${moduleIdx}`;
  const bestScore = getBestQuizScore(quizId);

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);

  if (!quiz) return null;

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined);

  const handleSubmit = () => {
    const arr = quiz.questions.map((_, i) => answers[i]);
    const res = submitQuiz(quizId, arr);
    setResult(res);
    setReviewMode(true);
  };

  const restart = () => {
    setAnswers({});
    setResult(null);
    setReviewMode(false);
    setStarted(true);
  };

  if (!started && !result) {
    return (
      <div className="lms-quiz">
        <div className="lms-quiz__header">
          <span className="lms-quiz__icon">📝</span>
          <div>
            <h4>{quiz.title}</h4>
            <p>
              {quiz.questions.length} questions · Pass mark: {quiz.passingScore}%
            </p>
          </div>
        </div>
        {bestScore !== null && (
          <p className="lms-quiz__best">
            Best score: <strong>{bestScore}%</strong>
          </p>
        )}
        <button
          className="lms-quiz__btn lms-quiz__btn--start"
          onClick={() => setStarted(true)}
        >
          {bestScore !== null ? 'Retake Quiz' : 'Start Quiz'}
        </button>
      </div>
    );
  }

  if (result && reviewMode) {
    return (
      <div className="lms-quiz">
        <div
          className={`lms-quiz__result ${
            result.passed ? 'lms-quiz__result--pass' : 'lms-quiz__result--fail'
          }`}
        >
          <div className="lms-quiz__result-icon">
            {result.passed ? '🎉' : '📚'}
          </div>
          <h3>{result.passed ? 'You Passed!' : 'Keep Learning'}</h3>
          <p className="lms-quiz__result-score">
            {result.percent}% ({result.score}/{result.total})
          </p>
          <p>
            {result.passed
              ? 'Great work! You can proceed to the next module.'
              : `You need ${quiz.passingScore}% to pass. Review your answers and try again.`}
          </p>
          <button className="lms-quiz__btn lms-quiz__btn--start" onClick={restart}>
            Retake Quiz
          </button>
        </div>

        <div className="lms-quiz__review">
          <h4>Review Answers</h4>
          {quiz.questions.map((q, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={i} className="lms-quiz__question lms-quiz__question--review">
                <p className="lms-quiz__q-text">
                  <strong>Q{i + 1}.</strong> {q.question}
                </p>
                {q.options.map((opt, j) => {
                  let cls = 'lms-quiz__option';
                  if (j === q.correctAnswer) cls += ' lms-quiz__option--correct';
                  if (j === userAns && !isCorrect)
                    cls += ' lms-quiz__option--wrong';
                  return (
                    <div key={j} className={cls}>
                      {j === q.correctAnswer && '✓ '}
                      {j === userAns && j !== q.correctAnswer && '✗ '}
                      {opt}
                    </div>
                  );
                })}
                <p className="lms-quiz__explanation">
                  💡 {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="lms-quiz">
      <h4>{quiz.title}</h4>
      {quiz.questions.map((q, i) => (
        <div key={i} className="lms-quiz__question">
          <p className="lms-quiz__q-text">
            <strong>Q{i + 1}.</strong> {q.question}
          </p>
          {q.options.map((opt, j) => (
            <label
              key={j}
              className={`lms-quiz__option lms-quiz__option--clickable ${
                answers[i] === j ? 'lms-quiz__option--selected' : ''
              }`}
            >
              <input
                type="radio"
                name={`q${i}`}
                checked={answers[i] === j}
                onChange={() => setAnswers({ ...answers, [i]: j })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button
        className="lms-quiz__btn lms-quiz__btn--start"
        disabled={!allAnswered}
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
