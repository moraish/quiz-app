interface QuestionStatus {
    questionId: number;
    status: "incomplete" | "A" | "B" | "C" | "D" | "marked";
}

interface QuestionContainerProps {
    quizStatus: QuestionStatus[];
}

export default function QuestionContainer({ quizStatus }: QuestionContainerProps) {
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {quizStatus.map((question, index) => (
                        <QuestionTile
                            key={question.questionId}
                            number={index + 1} // Use index + 1 for numbering
                            status={question.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



// Mark for review is currently not implemented!
interface QuestionTileProps {
    number: number;
    status: "incomplete" | "A" | "B" | "C" | "D" | "marked_for_review";
}

function QuestionTile({ number, status }: QuestionTileProps) {
    // Define styling configurations for each status
    const styleConfig = {
        incomplete: {
            background: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-600',
            hover: 'hover:bg-gray-100'
        },
        marked: {
            background: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-600',
            hover: 'hover:bg-yellow-100'
        },
        attempted: {
            background: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-600',
            hover: 'hover:bg-blue-100'
        }
    };

    // Determine which style to use based on status
    const style =
        status === "marked"
            ? styleConfig.marked
            : status === "incomplete"
                ? styleConfig.incomplete
                : styleConfig.attempted; // All other statuses (A, B, C, D) are considered "attempted"

    return (
        <div
            className={`
          p-3 rounded-lg border flex items-center justify-center
          cursor-pointer transition-colors duration-200
          ${style.background} ${style.border} ${style.hover}
        `}
        >
            <span className={`text-lg font-semibold ${style.text}`}>
                {number}
            </span>
        </div>
    );
}
