import OptionCard from "./OptionsCard";
import ProgressChart from "./ProgressChart";
import QuestionToggle from "./QuestionToggle";

export default function QuestionCard({ question_number, total_questions, question_text, option_a, option_b, option_c, option_d, quizStatus, setQuizStatus }: {
    question_number: number,
    total_questions: number,
    question_text: string,
    option_a: string,
    option_b: string,
    option_c: string,
    option_d: string
}) {
    return (
        <div className="flex justify-center items-center flex-grow">
            <div className="container mx-auto px-4 py-8 font-mono">

                {/* Question Container */}


                <div className="max-w-4xl mx-auto mb-8">
                    <div className="p-6 m-4 bg-white rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-center leading-relaxed">
                            {question_text}
                        </h2>
                    </div>
                </div>

                {/* Options Container */}
                <div className="max-w-4xl  mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

                        <OptionCard text={option_a} label="A" />
                        <OptionCard text={option_b} label="B" />

                        <OptionCard text={option_c} label="C" />
                        <OptionCard text={option_d} label="D" />


                    </div>
                </div>

            </div>
        </div>
    );
};