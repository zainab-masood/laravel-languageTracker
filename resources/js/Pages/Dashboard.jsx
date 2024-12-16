import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Inertia } from '@inertiajs/inertia';

const Dashboard = ({ activities, query }) => {
    const [search, setSearch] = useState(query || ''); // Initialize search state

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/dashboard', { query: search }); // Send search query to the backend
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            Inertia.delete(`/activities/${id}`); // Delete request
        }
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">Dashboard</h2>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6 flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </form>

                {/* List Activities */}
                <div className="mb-6">
                    <h3 className="text-xl">Your Activities</h3>
                    {activities.data.length > 0 ? (
                        activities.data.map((activity) => (
                            <div key={activity.id} className="p-4 mb-4 bg-white shadow rounded">
                                <h4 className="text-lg">{activity.activity_name}</h4>
                                <p>{activity.description}</p>
                                <p><strong>Category:</strong> {activity.category?.name || 'Uncategorized'}</p>
                                <p><strong>Date:</strong> {activity.date}</p>
                                <p><strong>Duration:</strong> {activity.duration} minutes</p>
                                
                                {/* Edit and Delete buttons */}
                                <div className="flex justify-between mt-4">
                                    <Link 
                                        href={`/activities/${activity.id}/edit`} 
                                        className="text-blue-500">
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(activity.id)} 
                                        className="text-red-500">
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
                                                link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
