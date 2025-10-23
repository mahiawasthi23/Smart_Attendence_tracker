import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-red-700">
                Admin Dashboard (Placeholder)
            </h1>
            <p className="text-lg text-gray-600">
                This page is currently under construction. Please add the actual logic, cards, and tables for the Admin view here.
            </p>
            <div className="mt-8 p-4 bg-white border border-red-300 rounded-lg shadow">
                <p className="font-semibold text-sm">
                    Status: File successfully exported! ✅
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;