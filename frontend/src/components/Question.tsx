interface QuestionProps {
    question: string
}

export default function Question({ question }: QuestionProps) {
    return <h2 className="text-2xl font-bold mb-4 text-white">{question}</h2>
}

