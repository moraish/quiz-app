import ReviewSummary from "../components/QuizReview/ReviewSummary";
import QuestionContainer from "../components/QuizReview/QuestionTile";
import SubmitQuiz from "../components/QuizReview/SubmitQuiz";

export default function ReviewCard() {
    return (
        <div>
            <div className="flex justify-center m-20 flex-grow">
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
