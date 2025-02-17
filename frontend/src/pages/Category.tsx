import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showMore, setShowMore] = useState(false);

    // Sample categories - in a real application, this might come from an API
    const [categories] = useState([
        { id: 1, name: 'History', icon: '🏛️' },
        { id: 2, name: 'Science', icon: '🔬' },
        { id: 3, name: 'Geography', icon: '🌍' },
        { id: 4, name: 'Literature', icon: '📚' },
        { id: 5, name: 'Mathematics', icon: '🧮' },
        { id: 6, name: 'Sports', icon: '⚽' },
        { id: 7, name: 'Entertainment', icon: '🎬' },
        { id: 8, name: 'Technology', icon: '💻' },
        { id: 9, name: 'Art', icon: '🎨' },
        { id: 10, name: 'Music', icon: '🎵' },
        { id: 11, name: 'Food', icon: '🍲' },
        { id: 12, name: 'Politics', icon: '🏛️' },
        { id: 13, name: 'Business', icon: '💼' },
        { id: 14, name: 'Animals', icon: '🐾' },
        { id: 15, name: 'Movies', icon: '🎥' },
        { id: 16, name: 'Television', icon: '📺' },
        { id: 17, name: 'Celebrities', icon: '🌟' },
        { id: 18, name: 'Language', icon: '🗣️' },
    ]);

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle category selection
    const handleCategorySelect = (categoryId) => {
        navigate(`/quiz?category=${categoryId}`);
    };

    // Determine which categories to display based on showMore state
    const displayedCategories = showMore ? filteredCategories : filteredCategories.slice(0, 10);

    return (
        <div className="pt-20 bg-white">
            <main className="max-w-7xl mx-auto px-4 pt-16 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black mb-4">Choose a Category</h1>
                    <p className="text-lg text-gray-600">Find the perfect quiz topic to test your knowledge</p>
                </div>

                {/* Search Bar - Now wider and with rounded pill shape */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-5 py-4 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
                            placeholder="Find category"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Pills - Replacing Cards */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 mx-10">
                    {displayedCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className="flex items-center px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 hover:border-black transition-colors"
                        >
                            <span className="mr-2">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* See More Button (only show if there are more than 10 categories to display) */}
                {filteredCategories.length > 10 && (
                    <div className="text-center">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="inline-flex items-center text-gray-700 hover:text-black font-medium"
                        >
                            {showMore ? (
                                <>
                                    Show Less <ChevronUp className="ml-1 h-5 w-5" />
                                </>
                            ) : (
                                <>
                                    See More <ChevronDown className="ml-1 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Categories;