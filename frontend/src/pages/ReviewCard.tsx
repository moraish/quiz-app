import axios from 'axios';
import ReviewSummary from "../components/QuizReview/ReviewSummary";
import QuestionContainer from "../components/QuizReview/QuestionTile";
import SubmitQuiz from "../components/QuizReview/SubmitQuiz";

export interface QuestionStatus {
    questionId: number;
    status: "incomplete" | "A" | "B" | "C" | "D";
}

interface ReviewCardProps {
    quiz_status: QuestionStatus[];
    onNavigateToQuestion: (questionIndex: number) => void;
}

export default function ReviewCard({ quiz_status, onNavigateToQuestion }: ReviewCardProps) {
    const totalQuestions = quiz_status.length;
    const attemptedQuestions = quiz_status.filter(q => q.status !== "incomplete").length;
    const skippedQuestions = quiz_status.filter(q => q.status === "incomplete").length;

    const handleSubmitQuiz = async () => {
        try {
            // Log the data we're sending
            console.log('Sending quiz data:', quiz_status);

            const response = await axios.post('http://localhost:3000/api/question/score', quiz_status, {
                // Add headers if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Quiz submission response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Detailed error information:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    headers: error.response?.headers
                });
            } else {
                console.error('Non-Axios error:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center m-20 flex-grow">
                <div className="flex flex-col justify-center w-11/12 sm:w-9/12">
                    <div>
                        <ReviewSummary
                            totalQuestions={totalQuestions}
                            attemptedQuestions={attemptedQuestions}
                            markedForReview={0}
                            skippedQuestions={skippedQuestions}
                        />
                    </div>
                    <div>
                        <QuestionContainer
                            quizStatus={quiz_status}
                            onNavigateToQuestion={onNavigateToQuestion}
                        />
                    </div>
                    <div className="mb-4">
                        <SubmitQuiz onSubmit={handleSubmitQuiz} />
                    </div>
                </div>
            </div>
        </div>
    );
}