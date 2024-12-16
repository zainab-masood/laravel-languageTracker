import React from 'react';
import { Link } from '@inertiajs/inertia-react';  // Inertia Link for navigation
import { Inertia } from '@inertiajs/inertia';  // Inertia POST request

 const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        Inertia.post(route('logout')); // Send a POST request to the logout route
    };

const DefaultLayout = ({ children }) => {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Language Learning Tracker</h1>
                    <nav>
                        <Link href="/dashboard" className="text-white px-4">Home</Link>
                        <Link href="/activities/create" className="text-white px-4">Add Activity</Link>
                        <a href="#" onClick={handleLogout} className="text-white px-4">
                            Logout
                        </a>                        
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                {children} {/* This is where the page content will be injected */}
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
