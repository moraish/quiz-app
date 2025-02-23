import ReviewSummary from "../components/QuizReview/ReviewSummary";
import QuestionContainer from "../components/QuizReview/QuestionTile";
import SubmitQuiz from "../components/QuizReview/SubmitQuiz";

export interface QuestionStatus {
    questionId: number;
    status: "incomplete" | "A" | "B" | "C" | "D";
}

interface ReviewCardProps {
    quiz_status: QuestionStatus[];
}

export default function ReviewCard({ quiz_status }: ReviewCardProps) {
    const totalQuestions = quiz_status.length;
    const attemptedQuestions = quiz_status.filter(q => q.status !== "incomplete").length;
    const skippedQuestions = quiz_status.filter(q => q.status === "incomplete").length;


    return (
        <div>
            <div className="flex justify-center m-20 flex-grow">
                <div className="flex flex-col justify-center w-11/12 sm:w-9/12">

                    {/* Review Summary Container */}
                    <div>
                        <ReviewSummary totalQuestions={totalQuestions} attemptedQuestions={attemptedQuestions} markedForReview={0} skippedQuestions={skippedQuestions} />
                    </div>
                    {/* Review Questions Container */}
                    <div>
                        <QuestionContainer quizStatus={quiz_status} />
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

/* 
question_status
    total_questions
    attempted_questions
    marked_for_review = 0
    skipped_questions


*/