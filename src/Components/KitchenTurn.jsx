import React, { useState } from 'react';
import { markKitchenDuty } from '../services/attendanceService';

const KitchenTurn = ({ reloadData }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleMarkKitchen = async () => {
        if (!window.confirm("Confirm: Mark yourself for Kitchen Duty? This will mark all slots as present.")) {
            return;
        }

        setLoading(true);
        setMessage('Processing request...');
        try {
            const response = await markKitchenDuty(); 
            setMessage(`✅ ${response?.message || 'Kitchen Duty marked successfully!'}`);
            
            reloadData();
            
        } catch (error) {
            setMessage(`❌ Error: ${error.message || 'Failed to mark duty due to network issue.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kitchen-turn">
            <p className="text-sm text-gray-500 mb-3">Marks all slots as Present + Kitchen Duty.</p>
            <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded transition duration-150"
                onClick={handleMarkKitchen}
                disabled={loading}
            >
                {loading ? 'Marking...' : 'Mark Kitchen Duty'}
            </button>
            {message && (
                <p className={`mt-2 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default KitchenTurn;