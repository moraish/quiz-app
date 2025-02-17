export default function QuestionContainer() {
    const questions = Array.from({ length: 25 }, (_, index) => ({
        number: index + 1,
        status: ['attempted', 'marked', 'skipped'][Math.floor(Math.random() * 3)]
    }));

    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {questions.map((question) => (
                        <QuestionTile
                            key={question.number}
                            number={question.number}
                            status={question.status}
                        // Needs to be fixed when we get the state variable
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function QuestionTile({ number, status }: {
    number: number,
    status: "attempted" | "marked" | "skipped"
}) {
    // Define styling configurations for each status
    const styleConfig = {
        attempted: {
            background: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-600',
            hover: 'hover:bg-green-100'
        },
        marked: {
            background: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-600',
            hover: 'hover:bg-yellow-100'
        },
        skipped: {
            background: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-600',
            hover: 'hover:bg-gray-100'
        }
    };

    const style = styleConfig[status] || styleConfig.skipped;

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
};