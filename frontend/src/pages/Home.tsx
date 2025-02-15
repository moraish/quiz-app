import { BookOpen, Upload, Sparkles } from 'lucide-react';

const Home = () => {
    const features = [
        {
            title: "Play a Quiz",
            description: "Choose from our curated categories and test your knowledge",
            icon: BookOpen,
            gradient: "from-blue-500 to-cyan-500",
            path: "/play"
        },
        {
            title: "Host Your Quiz",
            description: "Upload your own questions and create custom quizzes",
            icon: Upload,
            gradient: "from-purple-500 to-pink-500",
            path: "/host"
        },
        {
            title: "Generate Quiz",
            description: "Upload a PDF or enter a topic to automatically create questions",
            icon: Sparkles,
            gradient: "from-amber-500 to-orange-500",
            path: "/generate"
        }
    ];

    return (
        <div className="bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to QuizMaster
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Create, play, and generate quizzes effortlessly. Choose your path below to get started.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${feature.gradient}`} />

                            <div className="relative">
                                <div className="mb-4">
                                    <feature.icon className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} p-2 rounded-xl text-white`} />
                                </div>

                                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                    {feature.title}
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    {feature.description}
                                </p>

                                <button
                                    className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${feature.gradient} text-white font-medium hover:opacity-90 transition-opacity`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Home;