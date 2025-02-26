import { useState, useEffect } from "react"
import { getLeaderboard, LeaderboardEntry } from "../services/leaderboardService"

interface User {
    rank: number
    name: string
    points: number
    school: string
    category: string
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState({ category: "", school: "" })
    const [categories, setCategories] = useState<string[]>([])
    const [schools, setSchools] = useState<string[]>([])

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true)
                const data = await getLeaderboard()

                // Transform data from API to match our User interface
                const transformedData = data.map((entry, index) => ({
                    rank: index + 1,
                    name: `${entry.user.firstName} ${entry.user.lastName}`,
                    points: entry.points,
                    school: entry.user.institution,
                    category: entry.category.name
                }))

                setUsers(transformedData)

                // Extract unique categories and schools for filters
                const uniqueCategories = Array.from(new Set(transformedData.map(user => user.category)))
                const uniqueSchools = Array.from(new Set(transformedData.map(user => user.school)))

                setCategories(uniqueCategories)
                setSchools(uniqueSchools)
                setError(null)
            } catch (err) {
                console.error('Failed to fetch leaderboard:', err)
                setError('Failed to load leaderboard data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    const filteredUsers = users.filter(
        (user) =>
            (filter.category === "" || user.category === filter.category) &&
            (filter.school === "" || user.school === filter.school)
    )

    if (loading) {
        return (
            <div className="bg-white mt-20">
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center">
                        <p className="text-lg">Loading leaderboard data...</p>
                    </div>
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white mt-20">
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                        >
                            Retry
                        </button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="bg-white mt-20">
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-black mb-6">Leaderboard Rankings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                    {filteredUsers.length === 0 ? (
                        <div className="p-4 text-center">
                            <p>No leaderboard data available for the selected filters.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-black text-white">
                                        <th className="px-6 py-3 text-left font-semibold">Rank</th>
                                        <th className="px-6 py-3 text-left font-semibold">Name</th>
                                        <th className="px-6 py-3 text-left font-semibold">Points</th>
                                        <th className="px-6 py-3 text-left font-semibold">School</th>
                                        <th className="px-6 py-3 text-left font-semibold">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-semibold">
                                                    #{user.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{user.name}</td>
                                            <td className="px-6 py-4">{user.points.toLocaleString()}</td>
                                            <td className="px-6 py-4">{user.school}</td>
                                            <td className="px-6 py-4">{user.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}