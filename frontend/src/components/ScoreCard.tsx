export default function ScoreCard({
    correctAnswers,
    totalQuestions
}: {
    correctAnswers: string;
    totalQuestions: string;
}) {
    return (
        <div className="flex justify-center">
            <div className="h-[calc(100vh-100px)] flex justify-center flex-col">
                <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        Quiz Completed!
                    </h2>
                    <p className="text-xl mb-4 text-white">
                        You Scored {correctAnswers} out of {totalQuestions}.
                    </p>
                    <p className="text-xl mb-6 text-white">
                        Points earned: {parseInt(correctAnswers) * 10}
                    </p>
                    <div className="flex space-x-4 justify-center">
                        <button className="w-40 h-12 bg-gray-800 text-white text-lg font-semibold rounded-2xl shadow-lg transition duration-300 hover:bg-gray-700 active:scale-95">
                            Leaderboard
                        </button>
                        <button className="w-40 h-12 bg-blue-600 text-white text-lg font-semibold rounded-2xl shadow-lg transition duration-300 hover:bg-blue-500 active:scale-95">
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
