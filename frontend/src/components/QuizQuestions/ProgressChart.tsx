export default function ProgressChart({ markedAnswers }) {
    const totalQuestions = 10;
    const progress = (markedAnswers / totalQuestions) * 100;
    const radius = 24; // Radius of the circle
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="gray"
                strokeWidth={strokeWidth}
                opacity="0.2"
            />
            {/* Progress Circle */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="blue"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
            />
            {/* Percentage Text */}
            <text x="50" y="54" textAnchor="middle" fontSize="12" fontWeight="bold">
                {Math.round(progress)}%
            </text>
        </svg>
    );
};
