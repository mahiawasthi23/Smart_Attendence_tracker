import React from 'react';

const StudentTable = ({ data, columns }) => {
    
    if (!data || data.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 border rounded-lg">
                No recent history data available.
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg overflow-x-auto shadow-sm">
            <h3 className="text-md font-medium p-3 border-b">
                History Table Placeholder
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr className="bg-yellow-50/50">
                        <td className="px-3 py-2 whitespace-nowrap">Today</td>
                        <td className="px-3 py-2 whitespace-nowrap">Present</td>
                        <td className="px-3 py-2 whitespace-nowrap">Absent</td>
                        <td className="px-3 py-2 whitespace-nowrap">Pending</td>
                    </tr>
                </tbody>
            </table>
            <p className="p-3 text-xs text-yellow-600">Please implement the full table rendering logic here.</p>
        </div>
    );
};

export default StudentTable;