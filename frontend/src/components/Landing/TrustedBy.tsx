
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

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pt-12">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Educators & Quiz Enthusiasts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {reviews.map((review, index) => (
                    <div key={review.name} className="flex flex-col">
                        <div className="flex items-start space-x-4 mb-4">
                            <Avatar src={review.imageUrl} alt={review.name} />
                            <div className="flex-1">
                                <p className="text-gray-700 mb-4">"{review.review}"</p>
                                <div className="italic text-gray-600">
                                    <p className="font-semibold">{review.name}</p>
                                    <p className="text-sm">{review.role}</p>
                                </div>
                            </div>
                        </div>
                        {index < 2 && (
                            <div
                                className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200"
                                style={{ left: `${(index + 1) * (100 / 3)}%` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default TrustedBy;