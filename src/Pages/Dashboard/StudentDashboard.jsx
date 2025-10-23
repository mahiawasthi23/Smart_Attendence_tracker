import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchStudentDashboardData } from '../../services/studentService'; 
import StatusCard from '../../Components/Card'; 
import AttendanceForm from '../../Components/AttendanceForm';
import LeaveForm from '../../Components/LeaveForm';
import KitchenTurn from '../../Components/KitchenTurn';
import AttendanceBarChart from '../../Components/Charts/AttendanceBarChart';
import AttendancePieChart from '../../Components/Charts/AttendancePieChart';
import StudentTable from '../../Components/StudentTable'; 

const StudentDashboard = () => {
    const { user: contextUser } = useContext(AuthContext);
    const currentUser = contextUser || JSON.parse(localStorage.getItem('user')) || { name: 'Student', email: 'user@example.com' };

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const initialDataMock = {
        profile: currentUser, 
        overallPercentage: 0,
        todayStatus: [],
        monthlySummary: { 
            presentSlots: 0, absentSlots: 0, leaveSlots: 0, kitchenSlots: 0 
        },
        dailyTimeline: [],
        pendingCorrectionRequests: [],
    };

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = {
                ...initialDataMock,
                overallPercentage: 78.5,
                todayStatus: [
                    { slot: '9:00 AM', status: 'Present', key: 'qr_s1' },
                    { slot: '2:00 PM', status: 'Absent', key: 'qr_s2' },
                    { slot: '5:30 PM', status: 'Pending', key: 'qr_s3' }
                ],
                monthlySummary: { presentSlots: 50, absentSlots: 15, leaveSlots: 5, kitchenSlots: 2 },
                dailyTimeline: [{date: '10 Oct', slots: [{time: '9:00 AM', status: 'Present'}]}, /* ... */],
                pendingCorrectionRequests: [
                    { id: 1, date: '08 Oct', slot: '2:00 PM', reason: 'Forgot phone' }
                ]
            };
            
            setDashboardData(data);
        } catch (err) {
            setError('Failed to fetch dashboard data.');
            if (err.response?.status === 401) navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    if (loading || !dashboardData) {
        if (error) {
            return <div className="p-8 text-center text-lg text-red-500">Error: {error}</div>;
        }
        return <div className="p-8 text-center text-lg">Loading Student Dashboard...</div>;
    }
    const totalSlots = dashboardData.monthlySummary.presentSlots + dashboardData.monthlySummary.absentSlots + dashboardData.monthlySummary.leaveSlots + dashboardData.monthlySummary.kitchenSlots;
    const leaveStatus = dashboardData.todayStatus.find(s => s.status === 'Leave')?.status || 'N/A';
    const kitchenStatus = dashboardData.todayStatus.find(s => s.status === 'Kitchen Duty')?.status || 'N/A';

    return (
        <div className="student-dashboard p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {dashboardData.profile.name}!</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Today's Attendance</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 border-r pr-4">
                            <h3 className="text-lg font-medium mb-2">✅ Present (QR Scan)</h3>
                            <AttendanceForm reloadData={loadDashboardData} />
                        </div>
                        <div className="md:col-span-1 border-r pr-4">
                            <h3 className="text-lg font-medium mb-2">🍴 Kitchen Turn</h3>
                            <KitchenTurn reloadData={loadDashboardData} />
                        </div>
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium mb-2">🏠 Leave Form</h3>
                            <LeaveForm reloadData={loadDashboardData} />
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <StatusCard 
                        title="Overall %" 
                        value={`${dashboardData.overallPercentage.toFixed(2)}%`}
                        footerText={`Total Slots: ${totalSlots}`}
                        isHigh={dashboardData.overallPercentage >= 75}
                    />
                    <StatusCard 
                        title="Today's Status" 
                        value={kitchenStatus === 'Kitchen Duty' ? 'Kitchen Duty 🍴' : leaveStatus === 'Leave' ? 'On Leave 🏠' : 'Check Slots'}
                        footerText={`Pending Corrections: ${dashboardData.pendingCorrectionRequests.length}`}
                        isHigh={kitchenStatus !== 'Kitchen Duty' && leaveStatus !== 'Leave'}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Attendance Summary & Graphs</h2>
                    
                    <div className="flex justify-around text-center mb-6">
                        {dashboardData.todayStatus.map((slot) => (
                            <div key={slot.slot} className="p-3 bg-gray-100 rounded-md">
                                <p className="font-medium">{slot.slot}</p>
                                <span className={`text-sm font-bold ${slot.status === 'Present' ? 'text-green-600' : slot.status === 'Absent' ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {slot.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
                        <AttendancePieChart data={dashboardData.monthlySummary} />
                        <AttendanceBarChart data={dashboardData.monthlySummary} />
                    </div>
                </div>

                <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">History & Requests</h2>
                    
                    <h3 className="text-lg font-medium mt-4 mb-2">Daily Timeline (Recent)</h3>
                    <StudentTable 
                        data={dashboardData.dailyTimeline.slice(0, 5)} 
                        columns={['Date', 'Slot 1', 'Slot 2', 'Slot 3']} 
                    />

                    <h3 className="text-lg font-medium mt-6 mb-2">Late Join / Correction Requests</h3>
                    {dashboardData.pendingCorrectionRequests.length > 0 ? (
                        <p className="text-yellow-600">{dashboardData.pendingCorrectionRequests.length} Pending Correction(s) awaiting Admin Approval.</p>
                    ) : (
                        <p className="text-gray-500">No pending correction requests.</p>
                    )}
                    <div className="mt-4">
                        <LeaveForm isCorrectionForm={true} reloadData={loadDashboardData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;