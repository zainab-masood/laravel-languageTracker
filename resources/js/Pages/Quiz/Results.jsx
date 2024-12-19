import React from 'react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const QuizResults = ({ quiz }) => {
    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Results</h2>
                <p className="text-gray-800 dark:text-gray-200">Your Score: {quiz.score}/{quiz.questions.length}</p>
                <div className="mt-4">
                    {quiz.questions.map((question, index) => (
                        <div key={index} className="p-4 bg-white dark:bg-gray-800 shadow rounded mb-4">
                            <p className="text-gray-900 dark:text-white"><strong>Question:</strong> {question.question}</p>
                            <p className="text-gray-800 dark:text-gray-300"><strong>Your Answer:</strong> {question.user_answer}</p>
                            <p className="text-gray-800 dark:text-gray-300"><strong>Correct Answer:</strong> {question.correct_answer}</p>
                            <p className="text-gray-800 dark:text-gray-300">
                                <strong>Result:</strong>{' '}
                                {question.is_correct ? (
                                    <span className="text-green-500 dark:text-green-400">Correct</span>
                                ) : (
                                    <span className="text-red-500 dark:text-red-400">Incorrect</span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default QuizResults;
