export default function OptionCard({
    text,
    label,
    isSelected,
    onClick
}: {
    text: string;
    label: string;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className="w-full text-left transition-all duration-200 group"
            onClick={onClick}
        >
            <div className={`h-24 p-4 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm
                ${isSelected
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'}`}
            >
                <div className="flex gap-3">
                    <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-semibold
                        ${isSelected
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100'}`}
                    >
                        {label}
                    </span>
                    <span className="text-gray-700">{text}</span>
                </div>
            </div>
        </button>
    );
}