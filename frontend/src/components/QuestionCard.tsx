
export default function QuestionCard({ question_number, total_questions, question_text, option_a, option_b, option_c, option_d, quizStatus, setQuizStatus }) {



    return (

        <div className="h-screen font-mono ">
            {/* Question Heading */}
            <div className="flex justify-around ">
                <div className="flex flex-col justify-center">
                    <h2 className="sm:text-xl font-semibold">Question {question_number} of {total_questions}</h2>
                </div>
                <div className="flex flex-col justify-center">
                    <Progress_chart quiz_status={quizStatus} />
                </div>
            </div>
            {/* Question Container */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="p-6 m-4 bg-white rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-center leading-relaxed">
                        {question_text}
                    </h2>
                </div>
            </div>

            {/* Options Container */}
            <div className="max-w-4xl  mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

                    <OptionCard text={option_a} label="A" />
                    <OptionCard text={option_b} label="B" />

                    <OptionCard text={option_c} label="C" />
                    <OptionCard text={option_d} label="D" />


                </div>
            </div>
            {/* Navigation Container */}
            <QuestionToggle />

        </div>
    );
};





// define an interface quiz_status
function Progress_chart({ quiz_status }) {
    function calculate_progress() {
        if (!quiz_status || quiz_status.length === 0) return 0;

        const completed = quiz_status.filter(q => q.status === "complete").length;
        const total = quiz_status.length;

        return (completed / total) * 100;
    }


    const progress = calculate_progress(quiz_status);
    const radius = 24; // Radius of the circle
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="gray"
                strokeWidth={strokeWidth}
                opacity="0.2"
            />
            {/* Progress Circle */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="blue"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
            />
            {/* Percentage Text */}
            <text x="50" y="54" textAnchor="middle" fontSize="12" fontWeight="bold">
                {Math.round(progress)}%
            </text>
        </svg>
    );
};

const OptionCard = ({ text, label }) => {
    return (
        <button className="w-full text-left transition-all duration-200 group">
            <div className="h-24 p-4 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                <div className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold group-hover:bg-blue-100">
                        {label}
                    </span>
                    <span className="text-gray-700">{text}</span>
                </div>
            </div>
        </button>
    );
};

function QuestionToggle() {
    return (
        <div className="flex justify-around">
            <button className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200">
                <svg className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg>
                <p className="pt-2 text-sm text-gray-500">Back</p>
            </button>

            <button className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200">
                <svg className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                </svg>
                <p className="pt-2 text-sm text-gray-500">Next</p>
            </button>
        </div>
    )
}


