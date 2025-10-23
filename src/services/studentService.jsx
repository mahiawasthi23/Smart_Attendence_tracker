import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    if (!token) throw new Error("Authentication token not found.");
    return { Authorization: `Bearer ${token}` };
};

export const fetchStudentDashboardData = async () => {
    try {
        const headers = getAuthHeaders();
        const response = await api.get('/student/dashboard', { headers });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
             throw { response: { status: 401, message: "Session expired." } }; 
        }
        const message = error.message || error.response?.data?.message || 'Failed to fetch dashboard data.';
        throw new Error(message);
    }
};
