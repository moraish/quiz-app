export default function QuestionToggle({
    onPrevious,
    onNext,
    isFirstQuestion,
    isLastQuestion,
    onReviewTest
}: {
    onPrevious: () => void;
    onNext: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    onReviewTest: () => void;
}) {
    return (
        <div className="flex justify-around">
            <button
                onClick={onPrevious}
                disabled={isFirstQuestion}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 
                    ${isFirstQuestion ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200`}
            >
                <svg
                    className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                    />
                </svg>
                <p className="pt-2 text-sm text-gray-500">Back</p>
            </button>

            <button
                onClick={isLastQuestion ? onReviewTest : onNext}
                className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200"
            >
                {isLastQuestion ? (
                    <>
                        <svg
                            className="w-6 h-6 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 8h10M9 12h10M9 16h10M5 8h0M5 12h0M5 16h0"
                            />
                        </svg>
                        <p className="pt-2 text-sm text-gray-500">Review Test</p>
                    </>
                ) : (
                    <>
                        <svg
                            className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 8 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                            />
                        </svg>
                        <p className="pt-2 text-sm text-gray-500">Next</p>
                    </>
                )}
            </button>
        </div>
    );
}