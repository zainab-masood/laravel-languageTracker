import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Create = ({ types }) => {
    const [formData, setFormData] = useState({
        word: '',
        meaning: '',
        type_id: '',
        status: 'Learning',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/vocabulary', formData);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Vocabulary</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="word" className="text-gray-900 dark:text-white">Word:</label>
                        <input
                            type="text"
                            name="word"
                            id="word"
                            value={formData.word}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="meaning" className="text-gray-900 dark:text-white">Meaning:</label>
                        <textarea
                            name="meaning"
                            value={formData.meaning}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="type_id" className="text-gray-900 dark:text-white">Type:</label>
                        <select
                            name="type_id"
                            value={formData.type_id}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="">Select Type</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="status" className="text-gray-900 dark:text-white">Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="Learning">Learning</option>
                            <option value="Mastered">Mastered</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Vocabulary
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default Create;
