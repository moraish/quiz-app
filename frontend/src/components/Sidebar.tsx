import { ChevronRight } from "lucide-react"

interface SidebarProps {
    questions: { question: string; answers: string[]; correctAnswer: number }[]
    currentQuestion: number
    answeredQuestions: Set<number>
    skippedQuestions: Set<number>
    onQuestionSelect: (index: number) => void
}

export default function Sidebar({
    questions,
    currentQuestion,
    answeredQuestions,
    skippedQuestions,
    onQuestionSelect,
}: SidebarProps) {
    return (
        <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Questions</h2>
            <ul className="space-y-2">
                {questions.map((_, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onQuestionSelect(index)}
                            className={`w-full text-left px-3 py-2 rounded transition-colors ${index === currentQuestion
                                    ? "bg-blue-500 text-white"
                                    : answeredQuestions.has(index)
                                        ? "bg-green-700 text-white"
                                        : skippedQuestions.has(index)
                                            ? "bg-yellow-700 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            Question {index + 1}
                            {index === currentQuestion && <ChevronRight className="float-right h-5 w-5" />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

