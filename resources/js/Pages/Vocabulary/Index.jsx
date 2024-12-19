import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Index = ({ vocabulary }) => {
    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Vocabulary</h2>
                <Link href="/vocabulary/create" className="text-blue-500 mb-4 inline-block">Add New Word</Link>

                {vocabulary.data.length > 0 ? (
                    vocabulary.data.map((word) => (
                        <div key={word.id} className="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{word.word}</h3>
                            <p className="text-gray-900 dark:text-white"><strong>Meaning:</strong> {word.meaning}</p>
                            <p className="text-gray-900 dark:text-white"><strong>Type:</strong> {word.type ? word.type.name : 'N/A'}</p>
                            <p className="text-gray-900 dark:text-white"><strong>Status:</strong> {word.status}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-900 dark:text-white">No vocabulary found. Start adding new words!</p>
                )}

                <div className="mt-4 flex justify-center space-x-2">
                    {vocabulary.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}
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

export default Index;
