interface SubmitQuizProps {
    onSubmit: () => void;
}

export default function SubmitQuiz({ onSubmit }: SubmitQuizProps) {
    return (
        <div className="m-4">
            <button
                onClick={onSubmit}
                className="w-full p-4 bg-black hover:bg-gray-800 
                text-white font-semibold rounded-lg shadow-lg 
                transition-colors duration-200 cursor-pointer
                border border-black
                flex items-center justify-center
                text-lg"
            >
                Submit Quiz
            </button>
        </div>
    );
}