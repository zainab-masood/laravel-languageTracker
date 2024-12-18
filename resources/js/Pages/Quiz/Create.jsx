import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '../../Layouts/DefaultLayout';

const CreateQuiz = ({ vocabulary }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (id, value) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const questions = vocabulary.map((word) => ({
            question: word.word,
            correct_answer: word.meaning,
            user_answer: answers[word.id] || '',
        }));
        Inertia.post('/quiz', { questions });
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">Quiz</h2>
                <form onSubmit={handleSubmit}>
                    {vocabulary.map((word) => (
                        <div key={word.id} className="mt-4">
                            <label>
                                <strong>{word.word}:</strong>
                            </label>
                            <input
                                type="text"
                                className="p-2 border rounded w-full"
                                onChange={(e) => handleChange(word.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit Quiz
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreateQuiz;
