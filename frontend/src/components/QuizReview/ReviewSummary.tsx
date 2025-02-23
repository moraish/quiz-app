import { useEffect, useState, useRef } from "react";

interface ReviewSummaryProps {
    totalQuestions: number;
    attemptedQuestions: number;
    markedForReview: number;
    skippedQuestions: number;
}

export default function ReviewSummary({
    totalQuestions,
    attemptedQuestions,
    markedForReview,
    skippedQuestions,
}: ReviewSummaryProps) {
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <h2 className="bg-black text-white py-4 text-xl font-bold text-center leading-relaxed rounded-t-lg">
                    Quiz Summary
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {/* Total Questions Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Counter value={totalQuestions} color="text-black" />
                        <span className="text-sm text-gray-700">Total Questions</span>
                    </div>

                    {/* Questions Attempted Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Counter value={attemptedQuestions} color="text-black" />
                        <span className="text-sm text-gray-700">Questions Attempted</span>
                    </div>

                    {/* Marked for Review Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Counter value={markedForReview} color="text-black" />
                        <span className="text-sm text-gray-700">Marked for Review</span>
                    </div>

                    {/* Questions Skipped Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Counter value={skippedQuestions} color="text-black" />
                        <span className="text-sm text-gray-700">Questions Skipped</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Counter({ value, color }: { value: number; color: string }) {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null); // Stores animation frame ID

    useEffect(() => {
        let start = 0;
        const duration = 1000; // 1 second animation
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            if (elapsed >= duration) {
                setCount(value);
                return;
            }
            start = Math.round((elapsed / duration) * value);
            setCount(start);
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [value]);

    return <span className={`text-3xl font-bold ${color} mb-2`}>{count}</span>;
}