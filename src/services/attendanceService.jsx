import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const markAttendanceQR = async (qrCodeData) => {
    try {
        const headers = getAuthHeaders();
        
        const response = await api.post('/attendance/mark-qr', {
            qrData: qrCodeData,
        }, { headers });

        return response.data;
        
    } catch (error) {
        const message = error.message || error.response?.data?.message || 'Failed to mark attendance due to server error.';
        throw new Error(message);
    }
};

export const markKitchenDuty = async (slotId = 'default') => { 
    try {
        const headers = getAuthHeaders();
        const response = await api.post('/attendance/mark-kitchen-duty', { slotId }, { headers });
        
        return response.data;
    } catch (error) {
        const message = error.message || error.response?.data?.message || 'Failed to mark kitchen duty attendance.';
        throw new Error(message);
    }
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