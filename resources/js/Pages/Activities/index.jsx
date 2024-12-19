import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Index = ({ activities }) => {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            Inertia.delete(`/activities/${id}`);
        }
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Activities</h2>

                {activities.data.length > 0 ? (
                    activities.data.map((activity) => (
                        <div
                            key={activity.id}
                            className="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded text-gray-900 dark:text-white"
                        >
                            <h3 className="text-xl">{activity.activity_name}</h3>
                            <p>{activity.description}</p>
                            <p>
                                <strong>Category:</strong> {activity.category?.name || 'Uncategorized'}
                            </p>
                            <p>
                                <strong>Date:</strong> {activity.date}
                            </p>
                            <p>
                                <strong>Duration:</strong> {activity.duration} minutes
                            </p>
                            <div className="flex justify-between">
                                <Link href={`/activities/${activity.id}/edit`} className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(activity.id)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-900 dark:text-white">No activities found</p>
                )}

                <div className="mt-4">
                    {activities.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;
