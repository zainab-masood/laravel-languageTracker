import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';  // Inertia post method
import DefaultLayout from '../../Layouts/DefaultLayout';  // Layout wrapper

const Create = ({ categories }) => {
    const [formData, setFormData] = useState({
        activity_name: '',
        description: '',
        date: '',
        duration: '',
        category_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/activities', formData);  // Send the data to Laravel
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">Add New Activity</h2>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="activity_name">Activity Name:</label>
                        <input
                            type="text"
                            name="activity_name"
                            id="activity_name"
                            value={formData.activity_name}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>

                    {/* Add category dropdown */}
                    <div className="mt-4">
                        <label htmlFor="category_id">Category:</label>
                        <select
                            name="category_id"
                            id="category_id"
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

                    <div className="mt-4">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="duration">Duration (minutes):</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>

                    <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                        Add Activity
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};


   

export default Create;
