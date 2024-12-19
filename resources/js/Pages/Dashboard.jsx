import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Inertia } from '@inertiajs/inertia';

const Dashboard = ({ activities, query, streak, masteredWords, totalVocabulary, categories }) => {
    const [search, setSearch] = useState(query || '');
    const [filterCategory, setFilterCategory] = useState('');
    const [filteredActivities, setFilteredActivities] = useState(activities.data || []);
    const [showModal, setShowModal] = useState(false);
    const [activityIdToDelete, setActivityIdToDelete] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/dashboard', { query: search, category: filterCategory });
    };

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilterCategory(selectedCategory);
        Inertia.get('/dashboard', { category: selectedCategory, query: search });
    };

    const handleDelete = (id) => {
        setActivityIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        Inertia.delete(`/activities/${activityIdToDelete}`);
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setActivityIdToDelete(null);
    };

    const progressPercentage = totalVocabulary
        ? Math.round((masteredWords / totalVocabulary) * 100)
        : 0;

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8 space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Dashboard</h2>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Current Streak: {streak} {streak === 1 ? 'day' : 'days'}
                    </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Vocabulary Progress</h3>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-900 dark:text-white">
                        Mastered {masteredWords} out of {totalVocabulary} words ({progressPercentage}%)
                    </p>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md"
                >
                    <input
                        type="text"
                        placeholder="Search activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                    <select
                        value={filterCategory}
                        onChange={handleFilterChange}
                        className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </form>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Activities</h3>
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded"
                            >
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {activity.activity_name}
                                </h4>
                                <p className="text-gray-900 dark:text-white">{activity.description}</p>
                                <p className="text-gray-900 dark:text-white">
                                    <strong>Category:</strong> {activity.category?.name || 'Uncategorized'}
                                </p>
                                <p className="text-gray-900 dark:text-white">
                                    <strong>Date:</strong> {activity.date}
                                </p>
                                <p className="text-gray-900 dark:text-white">
                                    <strong>Duration:</strong> {activity.duration} minutes
                                </p>

                                <div className="flex justify-between mt-4">
                                    <Link
                                        href={`/activities/${activity.id}/edit`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-900 dark:text-white">No activities found</p>
                    )}
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                    {activities.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url + (filterCategory ? `&category=${filterCategory}` : '')}
                            className={`px-3 py-1 border rounded ${
                                link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? 'Previous'
                                : link.label === 'Next &raquo;'
                                ? 'Next'
                                : link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-900 dark:text-white mt-4">
                            Are you sure you want to delete this activity?
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default Dashboard;







