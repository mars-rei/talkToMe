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
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-8 sm:rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">Delete Affirmation</h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <p className="text-[#EBFFF2] font-fustat-medium mb-6">
                    Are you sure you want to delete this affirmation? 
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="px-6 py-2 rounded-full bg-[#872328] text-[#EBFFF2] hover:opacity-90 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="px-6 py-2 rounded-full bg-[#872328] text-[#EBFFF2] hover:opacity-90 transition"
                    >
                        {processing ? 'Deleting...' : 'Delete Affirmation'}
                    </button>
                </div>
            </div>
        </div>
    );
}