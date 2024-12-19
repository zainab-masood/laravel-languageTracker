import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

const handleLogout = (e) => {
    e.preventDefault();
    Inertia.post(route('logout'));
};

const DefaultLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    React.useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center flex-wrap">
                    <Link href="/dashboard" className="flex items-center space-x-2 mb-2 md:mb-0">
                        <img
                            src="/images/logo.jpg"
                            alt="App Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <h1 className="text-xl font-bold">Language Learning Tracker</h1>
                    </Link>
                    <div className="block lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}>
                        <Link href="/dashboard" className="text-white px-4 py-2">Home</Link>
                        <Link href="/activities/create" className="text-white px-4 py-2">Add Activity</Link>
                        <Link href="/vocabulary" className="text-white px-4 py-2">Vocabulary</Link>
                        <Link href="/quiz/create" className="text-white px-4 py-2">Start Quiz</Link>
                        <button onClick={toggleDarkMode} className="text-white px-4 py-2">
                            Dark Mode
                        </button>
                        <a href="#" onClick={handleLogout} className="text-white px-4 py-2">
                            Logout
                        </a>
                    </nav>
                </div>
            </header>

            <main className="flex-grow bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                {children}
            </main>

            <footer className="bg-gray-800 text-white p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Language Learning Tracker</p>
                </div>
            </footer>
        </div>
    );
};

export default DefaultLayout;
