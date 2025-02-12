import { useState } from "react";
import { CheckCircle, AlertCircle, SkipForward } from "lucide-react";

const quizData = [
    { id: 1, question: "What is React?", status: "answered", answer: "A JavaScript library" },
    { id: 2, question: "What is JSX?", status: "marked", answer: "A syntax extension" },
    { id: 3, question: "What is useState?", status: "skipped", answer: "" },
    { id: 4, question: "What is a component?", status: "answered", answer: "Reusable UI block" }
];

const statusIcons = {
    answered: <CheckCircle className="text-green-500" />,
    marked: <AlertCircle className="text-yellow-500" />,
    skipped: <SkipForward className="text-gray-500" />
};

export default function ReviewCard() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [filter, setFilter] = useState("all");

    const filteredQuestions = quizData.filter(q => filter === "all" || q.status === filter);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Quiz Review</h2>
            <div className="flex gap-2 mb-4">
                {["all", "answered", "marked", "skipped"].map(f => (
                    <button key={f} className={`px-4 py-2 rounded ${filter === f ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                {filteredQuestions.map(q => (
                    <div key={q.id} className="p-4 cursor-pointer border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100" onClick={() => setSelectedQuestion(q)}>
                        <div className="flex items-center gap-2">
                            {statusIcons[q.status]} <span>{q.question}</span>
                        </div>
                    </div>
                ))}
            </div>
            {selectedQuestion && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">{selectedQuestion.question}</h3>
                    <p className="mt-2">Your Answer: {selectedQuestion.answer || "Not answered"}</p>
                    <button className="mt-2 bg-gray-200 px-4 py-2 rounded" onClick={() => setSelectedQuestion(null)}>
                        Close
                    </button>
                </div>
            )}
            <div className="mt-6 flex justify-between">
                <button className="bg-gray-300 px-4 py-2 rounded">Back to Quiz</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit Quiz</button>
            </div>
        </div>
    );
}
