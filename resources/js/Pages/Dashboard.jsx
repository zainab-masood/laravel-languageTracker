import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Inertia } from '@inertiajs/inertia';
import ProgressChart from './ProgressChart';

const Dashboard = ({ activities, query, streak, masteredWords, totalVocabulary, categories }) => {
    const [search, setSearch] = useState(query || '');
    const [filterCategory, setFilterCategory] = useState('');
    const [filteredActivities, setFilteredActivities] = useState(activities.data || []);

    console.log('Props received:', masteredWords, streak);

    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/dashboard', { query: search }); // Send search query to the backend
    };

    // Filter by Category
    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilterCategory(selectedCategory);

        if (selectedCategory) {
            const filtered = activities.data.filter(
                (activity) => activity.category?.name === selectedCategory
            );
            setFilteredActivities(filtered);
        } else {
            setFilteredActivities(activities.data); // Reset filter
        }
    };

    // Delete activity
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            Inertia.delete(`/activities/${id}`);
        }
    };

    // Calculate vocabulary progress
    const progressPercentage = totalVocabulary
        ? Math.round((masteredWords / totalVocabulary) * 100)
        : 0;

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8 space-y-8">
                <h2 className="text-3xl font-bold text-center">Dashboard</h2>

                {/* Display Streak */}
                <div className="bg-gray-100 p-4 rounded shadow-md">
                    <p className="text-lg font-semibold">
                        Current Streak: {streak} {streak === 1 ? 'day' : 'days'}
                    </p>
                </div>

                {/* Vocabulary Progress */}
                <div className="bg-gray-100 p-4 rounded shadow-md">
                    <h3 className="text-lg font-bold">Vocabulary Progress</h3>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm mt-2">
                        Mastered {masteredWords} out of {totalVocabulary} words ({progressPercentage}%)
                    </p>
                </div>

                {/* Search and Filter */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded shadow-md"
                >
                    <input
                        type="text"
                        placeholder="Search activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <select
                        value={filterCategory}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value="">All Categories</option>
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

                {/* List Activities */}
                <div>
                    <h3 className="text-xl font-bold">Your Activities</h3>
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="p-4 mb-4 bg-white shadow rounded"
                            >
                                <h4 className="text-lg font-bold">
                                    {activity.activity_name}
                                </h4>
                                <p>{activity.description}</p>
                                <p>
                                    <strong>Category:</strong>{' '}
                                    {activity.category?.name || 'Uncategorized'}
                                </p>
                                <p>
                                    <strong>Date:</strong> {activity.date}
                                </p>
                                <p>
                                    <strong>Duration:</strong>{' '}
                                    {activity.duration} minutes
                                </p>

                                {/* Edit and Delete buttons */}
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
                        <p>No activities found</p>
                    )}
                </div>

                {/* Pagination Links */}
                <div className="mt-4 flex justify-center space-x-2">
                    {activities.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
{link.label === "&laquo; Previous" ? "Previous" : 
             link.label === "Next &raquo;" ? "Next" : 
             link.label}            
            </Link>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
