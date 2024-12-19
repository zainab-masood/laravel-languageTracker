import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '../../Layouts/DefaultLayout';

const CreateQuiz = ({ vocabulary }) => {
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (id, value) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const questions = vocabulary.map((word) => ({
            question: word.word,
            correct_answer: word.meaning,
            user_answer: answers[word.id] || '',
        }));

        setTimeout(() => {
            Inertia.post('/quiz', { questions }, {
                onFinish: () => {
                    Inertia.visit('/quiz/results');
                  //  setIsLoading(false);
                }
            });
        }, 800);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center mt-6">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="ml-4 text-lg text-blue-500 dark:text-blue-300">Checking answers...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {vocabulary.map((word) => (
                            <div key={word.id} className="mt-4">
                                <label className="text-gray-900 dark:text-white">
                                    <strong>{word.word}:</strong>
                                </label>
                                <input
                                    type="text"
                                    className="mt-2 p-2 border rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                                    onChange={(e) => handleChange(word.id, e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                            disabled={isLoading}
                        >
                            Submit Quiz
                        </button>
                    </form>
                )}
            </div>
        </DefaultLayout>
    );
};

export default CreateQuiz;
