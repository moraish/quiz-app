export default function FooterSmall() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 text-sm">
            {/* Bottom Row */}
            <div className="flex justify-between px-12">
                <div className="text-gray-400">
                    &copy; {new Date().getFullYear()} QuizMaster
                </div>
                <div className="text-gray-400">
                    support@quizmaster.com
                </div>
            </div>

        </footer>
    );
}