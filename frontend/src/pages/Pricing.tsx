import React from 'react'
import { Shield, Target, Sparkles } from 'lucide-react'

const Pricing = () => {
    const [tokenAmount, setTokenAmount] = React.useState(1)

    const tiers = [
        {
            name: 'Free',
            price: '0',
            description: 'Perfect for quiz enthusiasts',
            features: [
                'Play unlimited quizzes',
                'Compete with others',
                'View global leaderboard',
                'Track your progress'
            ],
            icon: Shield,
            highlighted: false
        },
        {
            name: 'Host Quiz',
            price: '1 Token',
            description: 'Create your own quiz experience',
            features: [
                'Host custom quiz (20 questions)',
                'Share with friends',
                'Real-time quiz hosting',
                'Quiz analytics'
            ],
            icon: Target,
            highlighted: true
        },
        {
            name: 'Generate Quiz',
            price: '5 Tokens',
            description: 'AI-powered quiz generation',
            features: [
                'AI generates 20 questions',
                'Choose topic and difficulty',
                'Custom categories',
                'Host generated quiz'
            ],
            icon: Sparkles,
            highlighted: false
        }
    ]

    return (
        <div className="mt-20 bg-white">
            <main className="max-w-7xl mx-auto px-4 pt-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-black mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-lg text-gray-600">Choose the perfect plan for your quiz journey</p>
                </div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {tiers.map((tier) => {
                        const Icon = tier.icon
                        return (
                            <div
                                key={tier.name}
                                className={`rounded-2xl p-8 ${tier.highlighted
                                    ? 'border-2 border-black shadow-lg relative'
                                    : 'border border-gray-200'
                                    }`}
                            >
                                {tier.highlighted && (
                                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm">
                                        Popular Choice
                                    </span>
                                )}
                                <Icon className="w-12 h-12 mb-4" />
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold">{tier.price}</span>
                                </div>
                                <p className="text-gray-600 mb-6">{tier.description}</p>
                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                {/* Token Purchase Section */}
                <div className="max-w-xl mx-auto text-center bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Buy Tokens</h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <button
                            onClick={() => setTokenAmount(prev => Math.max(1, prev - 1))}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            -
                        </button>
                        <span className="text-xl font-bold">{tokenAmount} Tokens</span>
                        <button
                            onClick={() => setTokenAmount(prev => prev + 1)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg">Total: ${tokenAmount}.00</p>
                    <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Purchase Tokens
                    </button>
                    <p className="text-sm text-gray-500 mt-4">Secure payment processing</p>
                </div>
            </main>
        </div>
    )
}

export default Pricing;