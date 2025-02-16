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
    { rank: 3, name: "Charlie Brown", points: 1400, country: "Canada", school: "University of Toronto", category: "Math" },
    { rank: 4, name: "Diana Prince", points: 1350, country: "Australia", school: "University of Melbourne", category: "Literature" },
    { rank: 5, name: "Ethan Hunt", points: 1300, country: "New Zealand", school: "University of Auckland", category: "Geography" },
]

const categories = ["Science", "History", "Math", "Literature", "Geography"]
const countries = ["USA", "UK", "Canada", "Australia", "New Zealand"]
const schools = ["Harvard University", "Oxford University", "University of Toronto", "University of Melbourne", "University of Auckland"]

export default function LeaderboardPage() {
    const [filter, setFilter] = useState({ category: "", country: "", school: "" })

    const filteredUsers = users.filter(
        (user) =>
            (filter.category === "" || user.category === filter.category) &&
            (filter.country === "" || user.country === filter.country) &&
            (filter.school === "" || user.school === filter.school)
    )

    return (
        <div className="bg-white mt-20">
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-black mb-6">Leaderboard Rankings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filter.country}
                            onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="">All Countries</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filter.school}
                            onChange={(e) => setFilter({ ...filter, school: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="">All Schools</option>
                            {schools.map((school) => (
                                <option key={school} value={school}>
                                    {school}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="px-6 py-3 text-left font-semibold">Rank</th>
                                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left font-semibold">Points</th>
                                    <th className="px-6 py-3 text-left font-semibold">Country</th>
                                    <th className="px-6 py-3 text-left font-semibold">School</th>
                                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={user.rank}
                                        className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-semibold">
                                                #{user.rank}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{user.name}</td>
                                        <td className="px-6 py-4">{user.points.toLocaleString()}</td>
                                        <td className="px-6 py-4">{user.country}</td>
                                        <td className="px-6 py-4">{user.school}</td>
                                        <td className="px-6 py-4">{user.category}</td>
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