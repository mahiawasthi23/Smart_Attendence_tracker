import React from 'react';
import QrReader from 'react-qr-scanner'; 

const QRScanner = ({ onResult }) => {
    
 
    const handleMockScan = () => {
        setTimeout(() => {
            onResult('MOCK_QR_CODE_SLOT_1_VALID');
        }, 2000);
    };
   
    const handleError = (err) => {
      console.error(err);
    }

    return (
        <div className="qr-scanner-window text-center p-4 bg-gray-50 border-dashed border-2 border-gray-300 rounded">
            <p className="text-gray-600 mb-2">Awaiting camera access...</p>
            
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-700">
                [Camera Feed / QR Reader View]
            </div>
            
            <button onClick={handleMockScan} className="mt-3 text-blue-500 hover:text-blue-700 text-sm underline">
                (Mock Scan: Click to Simulate)
            </button>
        </div>
    );
};

export default QRScanner;