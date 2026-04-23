// last updated on 02/04 by mars

import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DeleteAffirmationModal({ isOpen, onClose, affirmation, onSuccess }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(`/affirmations/${affirmation.id}`, {
            onSuccess: () => {
                onSuccess();
            },
            onFinish: () => setProcessing(false),
        });
    };

    if (!isOpen || !affirmation) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-8 sm:rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">Delete Affirmation</h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <p className="text-[#1E3A5F] font-fustat-medium mb-6">
                    Are you sure you want to delete this affirmation? 
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-2 text-md hover:bg-[#1E3A5F] hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#FF383C] px-8 py-2 text-md text-white disabled:opacity-25 hover:bg-[#991B1B] transition"
                    >
                        {processing ? 'Deleting...' : 'Delete Affirmation'}
                    </button>
                </div>
            </div>
        </div>
    );
}