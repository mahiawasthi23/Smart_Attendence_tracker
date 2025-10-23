import React from 'react';

const AttendanceBarChart = ({ data }) => {
   
    if (!data) {
        return <div className="p-4 text-center text-gray-500">No data available for Bar Chart.</div>;
    }

    return (
        <div className="bg-gray-50 p-4 border rounded-lg h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-2">Monthly Slot Summary (Bar Chart Placeholder)</h3>
            <p className="text-sm text-blue-600">Present: {data.presentSlots}, Absent: {data.absentSlots}</p>
            <div className="mt-4 text-xs text-gray-400">
                // Chart component rendering goes here...
            </div>
            <p className="mt-2 text-sm text-yellow-600">Please implement the actual chart logic.</p>
        </div>
    );
};


export default AttendanceBarChart;