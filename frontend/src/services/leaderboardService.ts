import axios from 'axios';

const API_URL = 'http://localhost:3000/api/leaderboard';

export interface LeaderboardEntry {
    userId: number;
    points: number;
    category_id?: number;
    category?: {
        name: string;
    };
    firstName: string;
    lastName: string;
    institution: string;
}

export interface ScoreUpdatePayload {
    userId: number;
    category_id: number;
    points: number;
}

export interface ScoreUpdateResponse {
    id?: number;
    userId: number;
    category_id: number;
    points: number;
}

/**
 * Fetches the top 10 leaderboard entries ordered by points
 * @returns Promise with leaderboard data
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw new Error('Failed to fetch leaderboard data');
    }
};

/**
 * Fetches the top 10 leaderboard entries for a specific category
 * @param categoryId - The ID of the category to fetch leaderboard data for
 * @returns Promise with category-specific leaderboard data
 */
export const getCategoryLeaderboard = async (categoryId: number): Promise<LeaderboardEntry[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/category`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            data: { category_id: categoryId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching category leaderboard:', error);
        throw new Error('Failed to fetch category leaderboard data');
    }
};

/**
 * Fetches the top 10 leaderboard entries for a specific institution
 * @param institution - The name of the institution to fetch leaderboard data for
 * @returns Promise with institution-specific leaderboard data
 */
export const getInstitutionLeaderboard = async (institution: string): Promise<LeaderboardEntry[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/institution`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            data: { institution }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching institution leaderboard:', error);
        throw new Error('Failed to fetch institution leaderboard data');
    }
};

/**
 * Updates or creates a score entry in the leaderboard
 * @param scoreData - The score data to update or create
 * @returns Promise with the updated score
 */
export const updateScore = async (scoreData: ScoreUpdatePayload): Promise<ScoreUpdateResponse> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/updateScore`, scoreData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating score:', error);
        throw new Error('Failed to update leaderboard score');
    }
};