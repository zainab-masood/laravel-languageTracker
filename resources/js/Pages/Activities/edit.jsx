import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Edit = ({ activity, categories }) => {
    const [formData, setFormData] = useState({
        activity_name: activity.activity_name,
        description: activity.description,
        date: activity.date,
        duration: activity.duration,
        category_id: activity.category_id || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/activities/${activity.id}`, formData);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Activity</h2>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="activity_name" className="text-gray-900 dark:text-white">Activity Name:</label>
                        <input
                            type="text"
                            name="activity_name"
                            value={formData.activity_name}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="description" className="text-gray-900 dark:text-white">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="category_id" className="text-gray-900 dark:text-white">Category:</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
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
                        <label htmlFor="date" className="text-gray-900 dark:text-white">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="duration" className="text-gray-900 dark:text-white">Duration (minutes):</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update Activity
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default Edit;
