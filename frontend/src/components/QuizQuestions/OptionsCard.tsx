export default function OptionCard({ text, label }: {
    text: string,
    label: string
}) {
    return (
        <button className="w-full text-left transition-all duration-200 group">
            <div className="h-24 p-4 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                <div className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold group-hover:bg-blue-100">
                        {label}
                    </span>
                    <span className="text-gray-700">{text}</span>
                </div>
            </div>
        </button>
    );
};