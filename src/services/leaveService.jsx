import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;

    if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
    }
    return { Authorization: `Bearer ${token}` };
};
export const submitLeaveRequest = async (leaveData) => {
    try {
        const headers = getAuthHeaders(); 
        const response = await api.post('/leave/submit', leaveData, { headers });
        return response.data;
        
    } catch (error) {
        const message = error.message || error.response?.data?.message || "Failed to submit leave request.";
        throw new Error(message);
    }
};
export const submitCorrectionRequest = async (correctionData) => {
    try {
        const headers = getAuthHeaders(); 
        const response = await api.post('/attendance/correction/submit', correctionData, { headers });
        return response.data;
        
    } catch (error) {
        const message = error.message || error.response?.data?.message || "Failed to submit correction request.";
        throw new Error(message);
    }
};