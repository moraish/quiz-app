import { useState } from "react"

interface User {
    rank: number
    name: string
    points: number
    country: string
    school: string
    category: string
}

const users: User[] = [
    { rank: 1, name: "Alice Johnson", points: 1500, country: "USA", school: "Harvard University", category: "Science" },
    { rank: 2, name: "Bob Smith", points: 1450, country: "UK", school: "Oxford University", category: "History" },
    {
        rank: 3,
        name: "Charlie Brown",
        points: 1400,
        country: "Canada",
        school: "University of Toronto",
        category: "Math",
    },
    {
        rank: 4,
        name: "Diana Prince",
        points: 1350,
        country: "Australia",
        school: "University of Melbourne",
        category: "Literature",
    },
    {
        rank: 5,
        name: "Ethan Hunt",
        points: 1300,
        country: "New Zealand",
        school: "University of Auckland",
        category: "Geography",
    },
]

export default function LeaderboardPage() {
    const [filter, setFilter] = useState({ category: "", country: "", school: "" })

    const filteredUsers = users.filter(
        (user) =>
            (filter.category === "" || user.category === filter.category) &&
            (filter.country === "" || user.country === filter.country) &&
            (filter.school === "" || user.school === filter.school),
    )

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#202020] to-[#252525]">
            <main className="flex-grow flex justify-center p-4">
                <div className="w-full max-w-4xl">
                    <h1 className="text-3xl font-bold text-white mb-6">Leaderboard</h1>
                    <div className="mb-4 flex space-x-4">
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="bg-gray-700 text-white rounded px-2 py-1"
                        >
                            <option value="">All Categories</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="Math">Math</option>
                            <option value="Literature">Literature</option>
                            <option value="Geography">Geography</option>
                        </select>
                        <select
                            value={filter.country}
                            onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                            className="bg-gray-700 text-white rounded px-2 py-1"
                        >
                            <option value="">All Countries</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="New Zealand">New Zealand</option>
                        </select>
                        <select
                            value={filter.school}
                            onChange={(e) => setFilter({ ...filter, school: e.target.value })}
                            className="bg-gray-700 text-white rounded px-2 py-1"
                        >
                            <option value="">All Schools</option>
                            <option value="Harvard University">Harvard University</option>
                            <option value="Oxford University">Oxford University</option>
                            <option value="University of Toronto">University of Toronto</option>
                            <option value="University of Melbourne">University of Melbourne</option>
                            <option value="University of Auckland">University of Auckland</option>
                        </select>
                    </div>
                    <div className="bg-black rounded-lg shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="px-4 py-2">Rank</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Points</th>
                                    <th className="px-4 py-2">Country</th>
                                    <th className="px-4 py-2">School</th>
                                    <th className="px-4 py-2">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.rank} className="border-b border-gray-700 text-white">
                                        <td className="px-4 py-2">{user.rank}</td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.points}</td>
                                        <td className="px-4 py-2">{user.country}</td>
                                        <td className="px-4 py-2">{user.school}</td>
                                        <td className="px-4 py-2">{user.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

