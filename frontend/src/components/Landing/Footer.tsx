import { useNavigate } from "react-router-dom"

export default function Footer() {

    const navigate = useNavigate();


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
                        <div className="space-y-2">
                            <button onClick={() => {
                                navigate('/pricing')
                            }} className="text-gray-400 hover:text-white transition-colors">Pricing</button>
                            <button onClick={() => {
                                navigate('/quiz')
                            }} className="text-gray-400 hover:text-white transition-colors block">Play Quiz</button>
                            <button className="text-gray-400 hover:text-white transition-colors block">Host Quiz</button>
                            <button className="text-gray-400 hover:text-white transition-colors block">Generate Quiz</button>
                        </div>
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