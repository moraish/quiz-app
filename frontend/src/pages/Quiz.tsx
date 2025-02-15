import { useState } from "react";
import QuestionCard from "../components/QuizQuestions/QuestionCard";

export default function Quiz() {
    const [quizStatus, setQuizStatus] = useState([
        { id: "1", status: "complete" },
        { id: "2", status: "incomplete" }
    ]);

    return (
        <div className="mt-15">
            <QuestionCard question_number={1} total_questions={20} quizStatus={quizStatus} setQuizStatus={setQuizStatus} question_text={"What is Marcus famous for?"} option_a={"We Suffer more in imagination than in reality.y."} option_b={"With great power comes great responsibility."} option_c={"Everybody whats to know what I'd do, if I didn't win. Guess we'll never know!"} option_d={"Siuuu!!!"} />

        </div>
    )
}
