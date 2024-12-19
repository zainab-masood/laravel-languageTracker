import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/react';

const Welcome = ({ auth }) => {
    return (
        <>
            <Head title="Welcome to Language Learning Tracker" />
            <div className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white min-h-screen flex flex-col justify-center">
                <div className="flex justify-center items-center flex-col p-6 space-y-6">
                    <header className="text-center">
                    <div>
            <Link href="/dashboard" className="flex justify-center shrink-0 items-center">
                        <img
                            src="/images/logo.jpg"
                            alt="App Logo"
                            className="h-20 w-20 fill-current text-gray-500"
                        />
                    </Link>
            </div>
                        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                            Language Learning Tracker
                        </h1>
                    </header>

                    <main className="flex flex-col justify-center items-center space-y-6">
                        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
                            
                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
                                Language Learning Tracker helps you monitor your progress, whether you're
                                practicing speaking, reading, or writing. Stay organized and motivated to complete 
                                your learning goals!
                            </p>

                            <div className="mt-6 text-center">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                                    >
                                    Start Tracking Your Activities
                                </Link>
                            </div>
                        </div>

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
