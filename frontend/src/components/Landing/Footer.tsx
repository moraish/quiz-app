export default function Footer() {
    return (
        < footer className="bg-black text-white py-8" >
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About QuizMaster</h4>
                        <p className="text-gray-400">Your go-to platform for creating and sharing engaging quizzes.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Home</li>
                            <li>Play Quiz</li>
                            <li>Host Quiz</li>
                            <li>Generate Quiz</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400">Have questions? Get in touch with us.</p>
                    </div>
                </div>
            </div>
        </footer >
    )
}