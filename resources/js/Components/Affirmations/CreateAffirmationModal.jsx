// last updated on 09/04 by mars

import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function CreateAffirmationModal({ isOpen, onClose, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null, 
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const submit = (e) => {
        e.preventDefault();
        
        post('/affirmations', {
            forceFormData: true,
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (errors) => {
                console.error('Upload error:', errors);
            },

            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // file type validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only images.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            setData('file', file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">
                        Add New Affirmation
                    </h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F] pb-4">
                            Upload Affirmation
                            <span className="text-[#1E3A5F]"> *</span>
                        </p>
                        
                        {/* File upload area */}
                        <div className="border-2 border-dashed border-[#1E3A5F] rounded-lg p-6 text-center hover:bg-[#EBFFF2]/20 transition">
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <label 
                                htmlFor="file-upload" 
                                className="cursor-pointer block"
                            >
                                <i className="fa fa-camera text-[#1E3A5F] text-5xl pt-4"></i>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium mb-2">
                                    {data.file ? data.file.name : 'Upload affirmation'}
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    JPEG, PNG, or GIF (max 5MB)
                                </p>
                            </label>
                        </div>
                        
                        {errors.file && <div className="text-[#B91C1C] text-sm mt-1">{errors.file}</div>}
                    </div>

                    {data.file && data.file.type.startsWith('image/') && (
                        <div className="space-y-2">
                            <p className="text-xl text-[#EBFFF2]">Preview:</p>
                            <div className="border border-[#EBFFF2] rounded-md p-2">
                                <img 
                                    src={URL.createObjectURL(data.file)} 
                                    alt="Preview" 
                                    className="max-h-48 mx-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

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
                            disabled={processing || !data.file}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#1E3A5F] px-8 py-2 text-md text-white disabled:opacity-25 hover:bg-[#2C4E73] transition"
                        >
                            {processing ? 'Uploading...' : 'Upload Affirmation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}