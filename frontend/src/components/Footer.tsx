import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bottom-0 left-0 right-0 bg-black text-white py-4 text-sm">
            <div className="max-w-4xl mx-auto px-4">
                {/* Company Name */}
                <div className="text-center mb-3">
                    <h3 className="text-lg font-bold">QuizMaster</h3>
                </div>

                {/* Navigation Links */}
                <div className="flex justify-center flex-wrap gap-x-12 gap-y-2 mb-3">
                    <Link to="/" className="hover:text-gray-300">Pricing</Link>
                    <Link to="/quiz" className="hover:text-gray-300">Mission</Link>
                    <Link to="/aboutus" className="hover:text-gray-300">About</Link>                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-3"></div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center flex-wrap gap-y-2">
                    <div className="text-gray-400">
                        &copy; {new Date().getFullYear()} QuizMaster
                    </div>
                    <div className="text-gray-400">
                        support@quizmaster.com
                    </div>
                </div>
            </div>
        </footer>
    );
}