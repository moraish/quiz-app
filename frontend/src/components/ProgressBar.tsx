interface ProgressBarProps {
    current: number
    total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = (current / total) * 100

    return (
        <div className="mb-4">
            <div className="h-2 w-full bg-gray-700 rounded-full">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-300 mt-1">
                Question {current} of {total}
            </p>
        </div>
    )
}

