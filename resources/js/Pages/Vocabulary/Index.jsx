import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ vocabulary }) => {
    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">My Vocabulary</h2>
                {/* Link to the create vocabulary page */}
                <Link href="/vocabulary/create" className="text-blue-500 mb-4 inline-block">Add New Word</Link>

                {/* Vocabulary List */}
                {vocabulary.data.length > 0 ? (
                    vocabulary.data.map((word) => (
                        <div key={word.id} className="p-4 mb-4 bg-white shadow rounded">
                            <h3 className="text-xl font-semibold">{word.word}</h3>
                            <p><strong>Meaning:</strong> {word.meaning}</p>
                            <p><strong>Category:</strong> {word.category}</p>
                            <p><strong>Status:</strong> {word.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No vocabulary found. Start adding new words!</p>
                )}

                {/* Pagination Links */}
                <div className="mt-4 flex justify-center space-x-2">
                    {vocabulary.links.map((link, index) => (
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

export default Index;
