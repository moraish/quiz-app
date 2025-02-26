import { useState, useEffect } from "react"
import { getLeaderboard, LeaderboardEntry, getInstitutionLeaderboard } from "../services/leaderboardService"

interface User {
    rank: number
    name: string
    points: number
    school: string
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState({ school: "" })
    const [schools, setSchools] = useState<string[]>([])

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true)
                const data = await getLeaderboard()

                // Transform data from API to match our User interface
                const transformedData = data.map((entry: LeaderboardEntry, index: number) => ({
                    rank: index + 1,
                    name: `${entry.firstName} ${entry.lastName}`,
                    points: entry.points,
                    school: entry.institution,
                }))

                setUsers(transformedData)

                // Extract unique schools for filters
                const uniqueSchools = Array.from(new Set(transformedData.map(user => user.school)))
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

    useEffect(() => {
        const fetchFilteredLeaderboard = async () => {
            if (filter.school) {
                try {
                    setLoading(true)
                    const data = await getInstitutionLeaderboard(filter.school)

                    // Transform filtered data
                    const transformedData = data.map((entry: LeaderboardEntry, index: number) => ({
                        rank: index + 1,
                        name: `${entry.firstName} ${entry.lastName}`,
                        points: entry.points,
                        school: entry.institution,
                    }))

                    setUsers(transformedData)
                    setError(null)
                } catch (err) {
                    console.error('Failed to fetch filtered leaderboard:', err)
                    setError('Failed to load filtered leaderboard data.')
                } finally {
                    setLoading(false)
                }
            } else {
                // If filter is cleared, fetch full leaderboard
                const fetchFullLeaderboard = async () => {
                    try {
                        setLoading(true)
                        const data = await getLeaderboard()

                        const transformedData = data.map((entry: LeaderboardEntry, index: number) => ({
                            rank: index + 1,
                            name: `${entry.firstName} ${entry.lastName}`,
                            points: entry.points,
                            school: entry.institution,
                        }))

                        setUsers(transformedData)
                        setError(null)
                    } catch (err) {
                        console.error('Failed to fetch leaderboard:', err)
                        setError('Failed to load leaderboard data.')
                    } finally {
                        setLoading(false)
                    }
                }
                fetchFullLeaderboard()
            }
        }

        fetchFilteredLeaderboard()
    }, [filter.school])

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

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
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

                    {users.length === 0 ? (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
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