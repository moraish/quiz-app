import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Avatar = ({ src, alt }: {
    src: string,
    alt: string
}) => (
    <img
        src={src}
        alt={alt}
        className="w-16 h-16 rounded-full object-cover"
    />
);

const TrustedBy = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        {
            name: "Sarah Johnson",
            role: "High School Teacher",
            review: "QuizMaster has transformed how I create assessments for my students. The ability to generate questions from my course material saves hours of preparation time.",
            imageUrl: "/avatar1.png" // Updated path
        },
        {
            name: "Michael Chen",
            role: "Corporate Trainer",
            review: "The platform's versatility is impressive. I use it for employee training sessions, and the automated quiz generation feature helps maintain consistent quality across all assessments.",
            imageUrl: "/avatar2.png"  // Updated path
        },
        {
            name: "Emma Wilson",
            role: "Quiz Event Organizer",
            review: "Hosting pub quizzes has never been easier. The interface is intuitive, and the question bank is extensive. My participants consistently praise the quality of the questions.",
            imageUrl: "/avatar3.png"  // Updated path
        }
    ];
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pt-12">
            <h2 className="text-3xl font-bold text-center mb-12">
                Trusted by Educators & Quiz Enthusiasts
            </h2>

            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="transition-transform duration-500 ease-in-out flex"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.name}
                                className="w-full flex-shrink-0 px-8"
                            >
                                <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-sm">
                                    <div className="flex items-start space-x-4">
                                        <Avatar src={review.imageUrl} alt={review.name} />
                                        <div className="flex-1">
                                            <p className="text-gray-700 mb-4">"{review.review}"</p>
                                            <div className="italic text-gray-600">
                                                <p className="font-semibold">{review.name}</p>
                                                <p className="text-sm">{review.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                {/* <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                </button> */}

                {/* Dots indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default TrustedBy;