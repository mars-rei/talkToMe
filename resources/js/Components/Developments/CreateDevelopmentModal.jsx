// last updated on 06/04 by valeria

import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function CreateDevelopmentModal({ isOpen, onClose, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        text_content: '', 
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const submit = (e) => {
        e.preventDefault();
        post('/developments', {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">
                        Add New Development Note
                    </h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73] transition">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Development Note
                            <span className="text-[#1E3A5F]"> *</span>
                        </p>
                        <input
                            type="text"
                            value={data.text_content}
                            onChange={e => setData('text_content', e.target.value)}
                            className="text-[#1F2937] text-base font-fustat-medium bg-[#F8FBFD] w-full h-12 border-[#CBD5E1] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#1E3A5F]"
                            placeholder="My Development Note"
                            maxLength="255"
                        />
                        {errors.text_content && <div className="text-[#B91C1C] text-sm mt-1">{errors.text_content}</div>}
                    </div>

                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Date
                            <span className="text-[#B91C1C]"> *</span>
                        </p>
                        <input
                            type="date"
                            value={data.date}
                            onChange={e => setData('date', e.target.value)}
                            className="text-[#1E3A5F] text-base font-fustat-medium bg-[#F8FBFD] w-full h-12 border-[#CBD5E1] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#1E3A5F] px-3"
                        />
                        {errors.date && <div className="text-[#B91C1C] text-sm mt-1">{errors.date}</div>}
                    </div>

                    {/* form buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="justify-center flex items-center rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-2 text-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#1E3A5F] px-8 py-2 text-md text-white disabled:opacity-25"
                        >
                            {processing ? 'Adding...' : 'Add Development Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}