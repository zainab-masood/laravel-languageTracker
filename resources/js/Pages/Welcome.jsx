import React from 'react';
import { Link } from '@inertiajs/inertia-react'; // Inertia Link for navigation
import { Head } from '@inertiajs/react';

const Welcome = ({ auth }) => {
    return (
        <>
            <Head title="Welcome to Language Learning Tracker" />
            <div className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white min-h-screen flex flex-col justify-center">
                <div className="flex justify-center items-center flex-col p-6 space-y-6">
                    {/* Header */}
                    <header className="text-center">
                        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                            Language Learning Tracker
                        </h1>
                    </header>

                    {/* Main Content */}
                    <main className="flex flex-col justify-center items-center space-y-6">
                        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
                            
                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
                                Our Language Learning Tracker helps you monitor your progress, whether you're
                                practicing speaking, reading, or writing. Stay organized and motivated while
                                achieving your learning goals!
                            </p>

                            {/* Call to Action Button */}
                            <div className="mt-6 text-center">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                                    >
                                    Start Tracking Your Activities
                                </Link>
                            </div>
                        </div>

                        {/* Auth Links */}
                        <div className="flex justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Welcome;
