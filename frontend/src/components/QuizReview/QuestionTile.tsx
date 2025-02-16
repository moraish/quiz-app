export default function QuestionContainer() {
    const questions = Array.from({ length: 25 }, (_, index) => ({
        number: index + 1,
        status: ['attempted', 'marked', 'skipped'][Math.floor(Math.random() * 3)]
    }));

    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold mb-4 text-center">Question Overview</h3>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {questions.map((question) => (
                        <QuestionTile
                            key={question.number}
                            number={question.number}
                            status={question.status}
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
            background: 'bg-gray-100',
            border: 'border-gray-300',
            text: 'text-black',
            hover: 'hover:bg-gray-200'
        },
        marked: {
            background: 'bg-gray-50',
            border: 'border-gray-300',
            text: 'text-black',
            hover: 'hover:bg-gray-100'
        },
        skipped: {
            background: 'bg-white',
            border: 'border-gray-300',
            text: 'text-gray-600',
            hover: 'hover:bg-gray-50'
        }
    };

    const style = styleConfig[status] || styleConfig.skipped;

    return (
        <div
            className={`
                p-3 rounded-lg border flex items-center justify-center
                cursor-pointer transition-colors duration-200 shadow-sm
                ${style.background} ${style.border} ${style.hover}
            `}
        >
            <span className={`text-lg font-semibold ${style.text}`}>
                {number}
            </span>
        </div>
    );
};