import { useState } from "react"
import ProgressBar from "../components/ProgressBar"
import Question from "../components/Question"
import Answer from "../components/Answer"
import NavigationBar from "../components/NavigationBar"
import ScoreCard from "../components/ScoreCard"
import ReviewCard from "../components/ReviewCard"

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },
]

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
    const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set())
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))

    const [showReview, setShowReview] = useState(false)
    const [showScore, setShowScore] = useState(false)

    const handleAnswerClick = (selectedAnswer: number) => {
        const newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = selectedAnswer
        setUserAnswers(newUserAnswers)

        setMarkedQuestions((prev) => new Set(prev).add(currentQuestion))
        setSkippedQuestions((prev) => {
            const newSkipped = new Set(prev)
            newSkipped.delete(currentQuestion)
            return newSkipped
        })

        goToNextQuestion()
    }

    const goToNextQuestion = () => {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowReview(true)
        }
    }

    const handleQuestionSelect = (index: number) => {
        if (currentQuestion !== index && !markedQuestions.has(currentQuestion)) {
            setSkippedQuestions((prev) => new Set(prev).add(currentQuestion))
        }
        setCurrentQuestion(index)
    }

    const handleSubmitQuiz = () => {
        const score = userAnswers.reduce((total, answer, index) => {
            return total || 0 + (answer === questions[index].correctAnswer ? 1 : 0)
        }, 0)
        setShowScore(true)
    }

    // fix hardcoded values
    if (showScore) {
        return (
            <ScoreCard totalQuestions="12" correctAnswers="9" />
        )
    }

    if (showReview) {
        return (
            <ReviewCard />
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#202020] to-[#252525]">

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
                    <ProgressBar current={currentQuestion + 1} total={questions.length} />
                    <Question question={questions[currentQuestion].question} />
                    <div className="mt-4 space-y-2">
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <Answer
                                key={index}
                                text={answer}
                                onClick={() => handleAnswerClick(index)}
                                isSelected={userAnswers[currentQuestion] === index}
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={goToNextQuestion}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
            <NavigationBar
                questions={questions}
                currentQuestion={currentQuestion}
                markedQuestions={markedQuestions}
                skippedQuestions={skippedQuestions}
                onQuestionSelect={handleQuestionSelect}
            />

        </div>
    )
}

