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
    const [markedAnswers, setMarkedAnswers] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            // Mark the current question as complete when moving to next question - REMOVED
            // updateQuestionStatus(currentQuestion, "complete");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Function to update the status of a specific question
    const updateQuestionStatus = (status: string) => {
        setQuizStatus(prevStatus => {
            console.log("prev_status", prevStatus);
            console.log("status: ", status);

            const newStatus = [...prevStatus];
            const prevQuestionStatus = newStatus[currentQuestion]?.status || "incomplete";

            if (["A", "B", "C", "D"].includes(prevQuestionStatus) && status === "incomplete") {
                setMarkedAnswers(prev => Math.max(0, prev - 1)); // Ensures it doesn't go negative
                console.log("Decrementing markedAnswers");
            } else if (!["A", "B", "C", "D"].includes(prevQuestionStatus) && ["A", "B", "C", "D"].includes(status)) {
                setMarkedAnswers(prev => prev + 1);
                console.log("Incrementing markedAnswers");
            }

            newStatus[currentQuestion] = {
                questionId: questions[currentQuestion].id,
                status: status // Will be 'incomplete', 'A', 'B', 'C', or 'D'
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


    useEffect(() => {
        console.log("Quiz Status-> ", quizStatus);
    }, [quizStatus])

    if (questions.length === 0) {

        return (
            <div className="mt-25 ml-10">
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>);
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
                    <ProgressChart markedAnswers={markedAnswers} />
                </div>
            </div>

            {/* question_text, option_abcd for rendering
                quizStatus for marking questions.  
            */}
            <QuestionCard
                question_text={questions[currentQuestion].question_text}
                option_a={questions[currentQuestion].option_a}
                option_b={questions[currentQuestion].option_b}
                option_c={questions[currentQuestion].option_c}
                option_d={questions[currentQuestion].option_d}
                quizStatus={quizStatus}
                currentQuestionIndex={currentQuestion}
                onOptionSelect={updateQuestionStatus}
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