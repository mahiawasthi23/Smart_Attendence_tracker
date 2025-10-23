import React, { useState } from 'react';

import QRScanner from './QRScanner'; 
import { markAttendanceQR } from '../services/attendanceService';

const AttendanceForm = ({ reloadData }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleScanResult = async (qrCodeData) => {
        setIsScanning(false);
        setLoading(true);
        setMessage('Validating QR code...');
        try {
            await markAttendanceQR(qrCodeData);
            setMessage('✅ Present marked successfully!');
            reloadData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Invalid QR or Time Window Closed';
            setMessage(`❌ Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="attendance-form">
            <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsScanning(!isScanning)}
                disabled={loading}
            >
                {isScanning ? '🛑 Stop Scanning' : 'Scan QR Code'}
            </button>
            
            {isScanning && (
                <div className="mt-4 border p-2 rounded">
                    <QRScanner onResult={handleScanResult} />
                </div>
            )}

            {loading && <p className="text-blue-500 mt-2">Processing...</p>}
            {message && <p className={`mt-2 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
    );
};

export default AttendanceForm;