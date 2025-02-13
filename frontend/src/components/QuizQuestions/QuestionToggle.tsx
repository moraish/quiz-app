
export default function QuestionToggle() {
    return (
        <div className="flex justify-around">
            <button className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200">
                <svg className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg>
                <p className="pt-2 text-sm text-gray-500">Back</p>
            </button>

            <button className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200">
                <svg className="w-6 h-6 text-gray-800 transition-colors duration-200 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                </svg>
                <p className="pt-2 text-sm text-gray-500">Next</p>
            </button>
        </div>
    )
}

