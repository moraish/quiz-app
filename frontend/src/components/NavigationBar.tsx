import { useState } from "react"

interface NavigationBarProps {
    questions: { question: string; answers: string[]; correctAnswer: number }[]
    currentQuestion: number
    markedQuestions: Set<number>
    skippedQuestions: Set<number>
    onQuestionSelect: (index: number) => void
}

export default function NavigationBar({
    questions,
    currentQuestion,
    markedQuestions,
    skippedQuestions,
    onQuestionSelect,
}: NavigationBarProps) {
    const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null)

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
            {questions.map((_, index) => (
                <button
                    key={index}
                    onClick={() => onQuestionSelect(index)}
                    onMouseEnter={() => setHoveredQuestion(index)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 relative ${index === currentQuestion
                            ? "bg-white scale-125"
                            : markedQuestions.has(index)
                                ? "bg-blue-500"
                                : skippedQuestions.has(index)
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                        }`}
                >
                    {hoveredQuestion === index && (
                        <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Question {index + 1}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

