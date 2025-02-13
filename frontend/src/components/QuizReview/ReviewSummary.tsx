import { useEffect, useState, useRef } from "react";

export default function ReviewSummary() {
    return (
        <div className="m-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <h2 className="mt-2 text-xl font-bold text-center leading-relaxed">
                    Quiz Summary
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {/* Total Questions Tile */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col items-center">
                        {/* <span className="text-3xl font-bold text-blue-600 mb-2">100</span> */}
                        <Counter value={100} color='text-blue-600' />
                        <span className="text-sm text-blue-700">Total Questions</span>
                    </div>

                    {/* Questions Attempted Tile */}
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex flex-col items-center">
                        {/* <span className="text-3xl font-bold text-green-600 mb-2">21</span> */}
                        <Counter value={21} color="text-green-600" />
                        <span className="text-sm text-green-700">Questions Attempted</span>
                    </div>

                    {/* Marked for Review Tile */}
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex flex-col items-center">
                        <Counter value={4} color="text-yellow-600" />
                        <span className="text-sm text-yellow-700">Marked for Review</span>
                    </div>

                    {/* Questions Skipped Tile */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                        <Counter value={17} color="text-gray-600" />
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