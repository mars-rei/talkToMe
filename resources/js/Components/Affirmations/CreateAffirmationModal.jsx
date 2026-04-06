// last updated on 02/04 by mars

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

            preserveState: false,
            preserveScroll: false,
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
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Add New Affirmation
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Upload Affirmation
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        
                        {/* File upload area */}
                        <div className="border-2 border-dashed border-[#EBFFF2] rounded-md p-6 text-center hover:border-[#B5446E] transition-colors">
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
                                <i className="fa fa-cloud-upload-alt fa-3x text-[#EBFFF2] mb-3"></i>
                                <p className="text-[#EBFFF2] mb-2">
                                    {data.file ? data.file.name : 'Upload affirmation'}
                                </p>
                                <p className="text-[#EBFFF2] text-sm">
                                    JPEG, PNG, or GIF (max 5MB)
                                </p>
                            </label>
                        </div>
                        
                        {errors.file && <div className="text-[#B5446E] text-sm mt-1">{errors.file}</div>}
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
                            className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.file}
                            className="justify-center flex items-center rounded-full border border-transparent bg-[#B5446E] px-8 py-2 text-md text-[#EBFFF2] disabled:opacity-25"
                        >
                            {processing ? 'Uploading...' : 'Upload Affirmation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}