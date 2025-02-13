import { useEffect, useState, useRef } from "react";

export default function ReviewCard() {
    return (
        <div>


            <div className="flex justify-center h-[calc(100vh-72px)]">
                <div className="flex flex-col justify-center w-11/12 sm:w-9/12">

                    {/* Review Summary Container */}
                    <div>
                        <ReviewSummary />
                    </div>
                    {/* Review Questions Container */}
                    <div>
                        <QuestionContainer />
                    </div>
                    {/* Submit Quiz */}
                    <div className="mb-4">
                        <SubmitQuiz />
                    </div>

                </div>

            </div>




        </div>

    )
}


function ReviewSummary() {
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <h2 className="mt-2 text-xl font-bold text-center leading-relaxed">
                    Quiz Summary
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {/* Total Questions Tile */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col items-center">
                        {/* <span className="text-3xl font-bold text-blue-600 mb-2">100</span> */}
                        <Counter value={100} color='text-blue-600' />
                        <span className="text-sm text-blue-700">Total Questions</span>
                    </div>

                    {/* Questions Attempted Tile */}
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex flex-col items-center">
                        {/* <span className="text-3xl font-bold text-green-600 mb-2">21</span> */}
                        <Counter value={21} color="text-green-600" />
                        <span className="text-sm text-green-700">Questions Attempted</span>
                    </div>

                    {/* Marked for Review Tile */}
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex flex-col items-center">
                        <Counter value={4} color="text-yellow-600" />
                        <span className="text-sm text-yellow-700">Marked for Review</span>
                    </div>

                    {/* Questions Skipped Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                        <Counter value={17} color="text-gray-600" />
                        <span className="text-sm text-gray-700">Questions Skipped</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Counter({ value, color }: { value: number; color: string }) {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null); // Stores animation frame ID

    useEffect(() => {
        let start = 0;
        const duration = 1000; // 1 second animation
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            if (elapsed >= duration) {
                setCount(value);
                return;
            }
            start = Math.round((elapsed / duration) * value);
            setCount(start);
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [value]);

    return <span className={`text-3xl font-bold ${color} mb-2`}>{count}</span>;
}

const QuestionTile = ({ number, status }: {
    number: number,
    status: "attempted" | "marked" | "skipped"
}) => {
    // Define styling configurations for each status
    const styleConfig = {
        attempted: {
            background: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-600',
            hover: 'hover:bg-green-100'
        },
        marked: {
            background: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-600',
            hover: 'hover:bg-yellow-100'
        },
        skipped: {
            background: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-600',
            hover: 'hover:bg-gray-100'
        }
    };

    const style = styleConfig[status] || styleConfig.skipped;

    return (
        <div
            className={`
          p-3 rounded-lg border flex items-center justify-center
          cursor-pointer transition-colors duration-200
          ${style.background} ${style.border} ${style.hover}
        `}
        >
            <span className={`text-lg font-semibold ${style.text}`}>
                {number}
            </span>
        </div>
    );
};

function QuestionContainer() {
    const questions = Array.from({ length: 25 }, (_, index) => ({
        number: index + 1,
        status: ['attempted', 'marked', 'skipped'][Math.floor(Math.random() * 3)]
    }));
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {questions.map((question) => (
                        <QuestionTile
                            key={question.number}
                            number={question.number}
                            status={question.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SubmitQuiz() {
    return (
        <div className="m-4">
            <button
                className="w-full p-4 bg-blue-600 hover:bg-blue-700 
                text-white font-semibold rounded-lg shadow-lg 
                transition-colors duration-200 
                border border-blue-700
                flex items-center justify-center
                text-lg"
            >
                Submit Quiz
            </button>
        </div>
    );
}
