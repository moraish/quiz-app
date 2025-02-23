interface QuestionStatus {
    questionId: number;
    status: "incomplete" | "A" | "B" | "C" | "D" | "marked_for_review";
}

interface QuestionContainerProps {
    quizStatus: QuestionStatus[];
    onNavigateToQuestion: (questionIndex: number) => void;
}

export default function QuestionContainer({ quizStatus, onNavigateToQuestion }: QuestionContainerProps) {
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {quizStatus.map((question, index) => (
                        <QuestionTile
                            key={question.questionId}
                            number={index + 1}
                            status={question.status}
                            onClick={() => onNavigateToQuestion(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface QuestionTileProps {
    number: number;
    status: "incomplete" | "A" | "B" | "C" | "D" | "marked_for_review";
    onClick: () => void;
}

function QuestionTile({ number, status, onClick }: QuestionTileProps) {
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

    const style =
        status === "marked_for_review"
            ? styleConfig.marked
            : status === "incomplete"
                ? styleConfig.incomplete
                : styleConfig.attempted;

    return (
        <div
            onClick={onClick}
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