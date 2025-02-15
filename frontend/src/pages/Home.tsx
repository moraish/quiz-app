import { BookOpen, Upload, Sparkles } from 'lucide-react';

const Home = () => {
    const features = [
        {
            title: "Play a Quiz",
            description: "Choose from our curated categories and test your knowledge",
            icon: BookOpen,
            path: "/play"
        },
        {
            title: "Host Your Quiz",
            description: "Upload your own questions and create custom quizzes",
            icon: Upload,
            path: "/host"
        },
        {
            title: "Generate Quiz",
            description: "Upload a PDF or enter a topic to automatically create questions",
            icon: Sparkles,
            path: "/generate"
        }
    ];

    return (
        <div className="flex flex-col">
            <div className='flex'>
                <main className="flex-grow bg-red-200 h-auto">
                    <div className="max-w-6xl mx-auto px-4 pt-16">
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <feature.icon className="w-12 h-12 text-black p-2 bg-gray-100 rounded-lg" />
                                        </div>

                                        <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 h-20">
                                            {feature.description}
                                        </p>

                                        <button
                                            className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium 
                                                 hover:bg-gray-800 transition-colors duration-300"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>

            </div>
            {/* Trusted By Section */}
            <div>
                <TrustedBy />
            </div>

        </div>
    );
};

export default Home;


function TrustedBy() {
    return (
        <div>Trusted By</div>
    )
}