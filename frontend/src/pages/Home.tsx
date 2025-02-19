import { BookOpen, Upload, Sparkles } from 'lucide-react';
import TrustedBy from '../components/Landing/TrustedBy';
import Banner from '../components/Landing/Banner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const features = [
        {
            title: "Play a Quiz",
            description: "Choose from our curated categories and test your knowledge",
            icon: BookOpen,
            path: "/categories",
            buttonText: "Get Started"
        },
        {
            title: "Host Your Quiz",
            description: "Upload your own questions and create custom quizzes",
            icon: Upload,
            path: "/",
            buttonText: "Coming Soon!"
        },
        {
            title: "Generate Quiz",
            description: "Upload a PDF or enter a topic to automatically create questions",
            icon: Sparkles,
            path: "/",
            buttonText: "Coming Soon!"
        }
    ];

    return (
        <div className="flex flex-col flex-grow h-full justify-center">
            <div>
                <Banner />
            </div>
            <div className='flex py-15'>
                <main className="flex-grow">
                    <div className="max-w-6xl mx-auto px-4 pt-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="mb-4 flex justify-center">
                                            <feature.icon className="w-12 h-12 text-black p-2 bg-gray-100 rounded-lg" />
                                        </div>

                                        <h3 className="text-2xl font-semibold mb-3 text-gray-900 flex justify-center">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 mb-2 h-20">
                                            {feature.description}
                                        </p>

                                        <button
                                            onClick={() => {
                                                navigate(feature.path)
                                            }}
                                            className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium 
                                                 hover:bg-gray-600 transition-colors duration-300"
                                        >
                                            {feature.buttonText}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

            </div>

            <div className="m-3" />
            {/* Trusted By Section */}
            <div className='pb-20'>
                <TrustedBy />
            </div>

        </div>
    );
};

export default Home;


