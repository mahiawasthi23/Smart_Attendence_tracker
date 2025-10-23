import React from 'react';

const StatusCard = ({ title, value, footerText, isHigh = true }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md mb-4 ${isHigh ? 'bg-indigo-50 border-indigo-200' : 'bg-red-50 border-red-200'} border`}>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className={`text-3xl font-bold mt-1 ${isHigh ? 'text-indigo-600' : 'text-red-600'}`}>{value}</h3>
            <p className="text-xs mt-2 text-gray-400">{footerText}</p>
        </div>
    );
};

export default StatusCard;