// last updated on 09/04 by valeria

import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DeleteEntryModal({ isOpen, onClose, entry, onSuccess }) {
    const [processing, setProcessing] = useState(false);
    
        const handleDelete = () => {
            setProcessing(true);
            router.delete(`/entries/${entry.id}`, {
                onSuccess: () => {
                    onSuccess();
                },
                onFinish: () => setProcessing(false),
            });
        };

    if (!isOpen || !entry) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-8 sm:rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">Delete Journal Entry</h2>
                    <button onClick={onClose} className="text-[#1E3A5F]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <p className="text-[#1E3A5F] font-fustat-medium mb-6">
                    Are you sure you want to delete this entry? 
                    This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-2 text-md hover:bg-[#1E3A5F]/70"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#1E3A5F] px-8 py-2 text-md text-white hover:bg-[#1E3A5F]/90"
                    >
                        {processing ? 'Deleting...' : 'Delete Journal Entry'}
                    </button>
                </div>
            </div>
        </div>
    );
}