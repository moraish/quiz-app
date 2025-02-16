import { Link } from 'react-router-dom';
import { useState } from 'react';
import { User, LogOut } from 'lucide-react';

export default function AppBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
    };

    return (
        <header className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-300">
                            QuizMaster
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <nav className="flex space-x-6">
                            <Link
                                to="/quiz"
                                className="text-white hover:text-gray-300 cursor-pointer"
                            >
                                Quiz
                            </Link>

                            <Link
                                to="/leaderboard"
                                className="text-white hover:text-gray-300 cursor-pointer"
                            >
                                Leaderboard
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="text-white hover:text-gray-300">
                                <div className="h-6 w-6" />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:ring-2 hover:ring-gray-300 focus:outline-none"
                                >
                                    <span className="font-medium text-gray-600 dark:text-gray-300">MK</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}