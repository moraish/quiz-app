import { useState, useEffect } from "react";
import QuestionCard from "../components/QuizQuestions/QuestionCard";
import { useSearchParams } from "react-router-dom";
import QuestionToggle from "../components/QuizQuestions/QuestionToggle";
import ProgressChart from "../components/QuizQuestions/ProgressChart";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [searchParams] = useSearchParams();
    const category_id = searchParams.get('category_id');
    const [quizStatus, setQuizStatus] = useState([]);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            // Mark the current question as complete when moving to next question
            updateQuestionStatus(currentQuestion, "complete");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Function to update the status of a specific question
    const updateQuestionStatus = (questionIndex, status) => {
        setQuizStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[questionIndex] = {
                questionId: questions[questionIndex].id,
                status: status
            };
            return newStatus;
        });
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/question/${category_id}`);
                const data = await response.json();
                const mappedQuestions = data.map(q => ({
                    id: q.id,
                    question_text: q.text,
                    option_a: q.option_a,
                    option_b: q.option_b,
                    option_c: q.option_c,
                    option_d: q.option_d
                }));
                setQuestions(mappedQuestions);

                // Initialize quiz status array with "incomplete" status for each question
                setQuizStatus(mappedQuestions.map(q => ({
                    questionId: q.id,
                    status: "incomplete"
                })));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        if (category_id) {
            fetchQuestions();
        }
    }, [category_id]);

    if (questions.length === 0) {
        return <div className="mt-15">Loading questions...</div>;
    }

    return (
        <div className="mt-20">
            <div className="flex justify-around">
                <div className="flex flex-col justify-center">
                    <h2 className="sm:text-xl font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                    </h2>
                </div>
                <div className="flex flex-col justify-center">
                    <ProgressChart quiz_status={quizStatus} />
                </div>
            </div>

            <QuestionCard
                question_number={currentQuestion + 1}
                total_questions={questions.length}
                question_text={questions[currentQuestion].question_text}
                option_a={questions[currentQuestion].option_a}
                option_b={questions[currentQuestion].option_b}
                option_c={questions[currentQuestion].option_c}
                option_d={questions[currentQuestion].option_d}
            />

            <QuestionToggle
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                isFirstQuestion={currentQuestion === 0}
                isLastQuestion={currentQuestion === questions.length - 1}
            />
        </div>
    );
}