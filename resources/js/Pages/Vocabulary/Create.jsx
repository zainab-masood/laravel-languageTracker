import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';  // Inertia POST request
import DefaultLayout from '../../Layouts/DefaultLayout';  // Layout wrapper

const Create = ({ categories }) => {
    const [formData, setFormData] = useState({
        word: '',
        meaning: '',
        category_id: '',
        status: 'Learning',  // Default to 'Learning'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/vocabulary', formData);  // Send POST request to store the vocabulary
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">Add New Vocabulary</h2>

                <form onSubmit={handleSubmit} className="mt-6">
                    {/* Word Input */}
                    <div>
                        <label htmlFor="word">Word:</label>
                        <input
                            type="text"
                            name="word"
                            id="word"
                            value={formData.word}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>

                    {/* Meaning Input */}
                    <div className="mt-4">
                        <label htmlFor="meaning">Meaning:</label>
                        <textarea
                            name="meaning"
                            value={formData.meaning}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded"
                            required
                        />
                    </div>

                    {/* Category Selection */}
                    <div className="mt-4">
                        <label htmlFor="category_id">Category:</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Selection */}
                    <div className="mt-4">
                        <label htmlFor="status">Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded"
                            required
                        >
                            <option value="Learning">Learning</option>
                            <option value="Mastered">Mastered</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                        Add Vocabulary
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default Create;
