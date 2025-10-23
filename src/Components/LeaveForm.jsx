import React, { useState } from 'react';
import { submitLeaveRequest, submitCorrectionRequest } from '../services/leaveService';

const LeaveForm = ({ reloadData, isCorrectionForm = false }) => {
    const [formData, setFormData] = useState({ 
        type: isCorrectionForm ? 'Correction' : 'Casual', 
        reason: '', 
        startDate: '', 
        endDate: '',   
        date: '',
        slot: '9:00 AM', 
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Submitting request...');
        try {
            if (isCorrectionForm) {
                await submitCorrectionRequest(formData);
                setMessage('✅ Correction request submitted (Pending).');
            } else {
                await submitLeaveRequest(formData);
                setMessage('✅ Leave request submitted (Pending).');
            }
            setFormData({ type: isCorrectionForm ? 'Correction' : 'Casual', reason: '', startDate: '', endDate: '', date: '', slot: '9:00 AM' });
            reloadData();
        } catch (error) {
            setMessage(`❌ Error: ${error.message || 'Submission failed.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="leave-form">
            <p className="text-md font-semibold mb-2">{isCorrectionForm ? 'Late Join / Correction' : 'Submit Leave Request'}</p>
            
            {isCorrectionForm ? (
                <>
                    <input type="date" name="date" required className="w-full p-2 border rounded mb-2 text-sm" onChange={handleChange} />
                    <select name="slot" value={formData.slot} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm">
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                    </select>
                </>
            ) : (
                <>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm">
                        <option value="Casual">Casual</option>
                        <option value="Health">Health</option>
                        <option value="Exam">Exam</option>
                        <option value="Home">Home</option>
                    </select>
                    <div className="flex space-x-2 mb-2">
                        <input type="date" name="startDate" required className="w-1/2 p-2 border rounded text-sm" onChange={handleChange} />
                        <input type="date" name="endDate" required className="w-1/2 p-2 border rounded text-sm" onChange={handleChange} />
                    </div>
                </>
            )}

            <textarea 
                name="reason" 
                placeholder="Reason required" 
                value={formData.reason} 
                onChange={handleChange} 
                required 
                rows="2" 
                className="w-full p-2 border rounded mb-2 text-sm"
            />
            
            <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm">
                {loading ? 'Submitting...' : isCorrectionForm ? 'Request Correction' : 'Submit Leave'}
            </button>
            {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </form>
    );
};

export default LeaveForm;