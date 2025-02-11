"use client"

import { useState } from "react"
import ProgressBar from "../components/ProgressBar"
import Question from "../components/Question"
import Answer from "../components/Answer"
import NavigationBar from "../components/NavigationBar"

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

    if (showScore) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#202020] to-[#252525]">

                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
                        <p className="text-xl mb-4 text-white">
                            You scored{" "}
                            {userAnswers.reduce(
                                (total, answer, index) => total || 0 + (answer === questions[index].correctAnswer ? 1 : 0),
                                0,
                            )}{" "}
                            out of {questions.length}
                        </p>
                    </div>
                </main>

            </div>
        )
    }

    if (showReview) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#202020] to-[#252525]">

                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white">Review Your Answers</h2>
                        <ul className="space-y-2 mb-4">
                            {questions.map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            setShowReview(false)
                                            setCurrentQuestion(index)
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded transition-colors ${markedQuestions.has(index) ? "bg-blue-500 text-white" : "bg-yellow-500 text-white"
                                            }`}
                                    >
                                        Question {index + 1}: {markedQuestions.has(index) ? "Answered" : "Skipped"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleSubmitQuiz}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </main>

            </div>
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

