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

                    {/* Type Dropdown */}
                    <div className="mt-4">
                        <label htmlFor="type_id">Type:</label>
                        <select
                            name="type_id"
                            value={formData.type_id}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded"
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

                    {/* Status Dropdown */}
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
