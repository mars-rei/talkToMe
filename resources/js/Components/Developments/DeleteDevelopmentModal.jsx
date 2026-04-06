// last updated on 06/04 by valeria

import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DeleteDevelopmentModal({ isOpen, onClose, development, onSuccess }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(`/developments/${development.id}`, {
            onSuccess: () => {
                onSuccess();
            },
            onFinish: () => setProcessing(false),
        });
    };

    if (!isOpen || !development) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-8 sm:rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">Delete Development</h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73] transition">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <p className="text-[#1E3A5F] font-fustat-medium mb-6">
                    Are you sure you want to delete this development note? 
                </p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white px-8 py-2 text-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#FF383C] hover:bg-[#991B1B] px-8 py-2 text-md text-white"
                    >
                        {processing ? 'Deleting...' : 'Delete Development'}
                    </button>
                </div>
            </div>
        </div>
    );
}