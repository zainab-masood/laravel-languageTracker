import React from 'react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const QuizResults = ({ quiz }) => {
    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">Quiz Results</h2>
                <p>Your Score: {quiz.score}/{quiz.questions.length}</p>
                <div className="mt-4">
                    {quiz.questions.map((question, index) => (
                        <div key={index} className="p-4 bg-white shadow rounded mb-4">
                            <p><strong>Question:</strong> {question.question}</p>
                            <p><strong>Your Answer:</strong> {question.user_answer}</p>
                            <p><strong>Correct Answer:</strong> {question.correct_answer}</p>
                            <p>
                                <strong>Result:</strong>{' '}
                                {question.is_correct ? 'Correct' : 'Incorrect'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default QuizResults;
