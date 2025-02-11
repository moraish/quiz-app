interface AnswerProps {
    text: string
    onClick: () => void
    isSelected: boolean
}

export default function Answer({ text, onClick, isSelected }: AnswerProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 text-left rounded transition-colors ${isSelected ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
            {text}
        </button>
    )
}

