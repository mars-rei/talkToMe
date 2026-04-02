// last updated on 02/04 by mars

import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CreateEntriesModal({ isOpen, onClose, onSuccess, selectedJournalId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        journal_id: selectedJournalId,
        date:'',
        text_content: '',
        mood: '',
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    useEffect(() => {
        setData('journal_id', selectedJournalId);
    }, [selectedJournalId]);

    const submit = (e) => {
        e.preventDefault();
        post('/entries', {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Write A New Entry
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Date
                            <span className="text-[#B5446E]"> *</span>
                        </p>
                        <input
                            type="date"
                            value={data.date}
                            onChange={e => setData('date', e.target.value)}
                            className="text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                        />
                        {errors.date && <div className="text-[#B5446E] text-sm mt-1">{errors.date}</div>}
                    </div>

                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Journal Entry
                        </p>
                        <textarea
                            type="text"
                            value={data.text_content}
                            onChange={e => setData('text_content', e.target.value)}
                            className="flex align-text-top text-[#EBFFF2] text-base font-fustat-medium bg-[#1F1F1F] w-full h-48 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2] px-3"
                            placeholder="Write a journal entry..."
                            maxLength="5000"
                            style={{
                                verticalAlign: 'top',
                                resize: 'vertical' // to align the text properly
                            }}
                        />
                        {errors.text_content && <div className="text-[#B5446E] text-sm mt-1">{errors.text_content}</div>}
                        <div className="text-right text-[#EBFFF2] text-sm">
                            {data.text_content?.length || 0}/5000
                        </div>
                    </div>

                    {/* mood - to add later on */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Mood
                        </p>
                        
                        {/* maybe add emojis here instead of the text later on? */}
                        <select 
                            value={data.mood} 
                            onChange={e => setData('mood', e.target.value)}
                        >
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="angry">Angry</option>
                            <option value="anxious">Anxious</option>
                            <option value="content">Content</option>
                            <option value="overwhelmed">Overwhelmed</option>
                            <option value="energised">Energised</option>
                            <option value="irritable">Irritable</option>
                        </select>
                    </div>

                    {/* file upload - to add later on */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#EBFFF2]">
                            Choose File - to add later!!
                        </p>
                    </div>

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
                            disabled={processing}
                            className="justify-center flex items-center rounded-full border border-transparent px-8 py-2 text-md text-[#EBFFF2] bg-[#B5446E] hover:bg-[#9a3a5e]"
                        >
                            {processing ? 'Uploading...' : 'Upload Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}