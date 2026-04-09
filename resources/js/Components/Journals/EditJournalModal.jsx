// last updated on 09/04 by mars

import { useForm, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditJournalModal({ isOpen, onClose, journal, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        title: journal?.title || '',
    });

    useEffect(() => {
        if (journal) {
            setData({
                title: journal.title,
            });
        }
    }, [journal]);

    const submit = (e) => {
        e.preventDefault();
        
        put(`/journals/${journal.id}`, {
            onSuccess: () => {
                onClose();
                router.visit(window.location.href, {
                    preserveScroll: true,
                    preserveState: false,
                });
                if (onSuccess) onSuccess();
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
            },
        });
    };


    if (!isOpen || !journal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">
                        Edit Journal
                    </h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* journal name */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Title
                            <span className="text-[#1E3A5F]"> *</span>
                        </p>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="text-[#1F2937] text-base font-fustat-medium bg-[#F8FBFD] w-full h-12 border-[#CBD5E1] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#1E3A5F]"
                            placeholder="My Journal"
                            maxLength="60"
                        />
                        {errors.title && <div className="text-[#B91C1C] text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* form buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="justify-center flex items-center rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-2 text-md hover:bg-[#1E3A5F] hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#1E3A5F] px-8 py-2 text-md text-white disabled:opacity-25 hover:bg-[#2C4E73] transition"
                        >
                            {processing ? 'Updating...' : 'Update Journal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}