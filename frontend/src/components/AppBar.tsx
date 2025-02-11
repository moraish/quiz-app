import { Link } from 'react-router-dom';

export default function AppBar() {
    return (
        <header className="bg-black shadow-md">
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

                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">MK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}