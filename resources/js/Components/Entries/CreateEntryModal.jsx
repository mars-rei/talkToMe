// last updated on 09/04 by valeria

import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// for voice recordings - from https://www.npmjs.com/package/react-audio-voice-recorder
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function CreateEntriesModal({ isOpen, onClose, onSuccess, selectedJournalId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        journal_id: selectedJournalId,
        text_content: '',
        mood: '',

        // media
        media_files: [],
        captions: [],
    });

    // for voice notes
    const recorderControls = useAudioRecorder();
    
    // for previewing media when making entry
    const [previewUrls, setPreviewUrls] = useState([]);
    const [voicePreviewUrl, setVoicePreviewUrl] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setPreviewUrls([]);

            // for voice recording
            setVoicePreviewUrl(null); 
            recorderControls.stopRecording(); 
        }
    }, [isOpen]);

    useEffect(() => {
        setData('journal_id', selectedJournalId);
    }, [selectedJournalId]);

    const handleVoiceNotes = (blob) => {
        if (!blob) return;
        
        // create voice note media object
        const voiceNote = new File([blob], `voice_${Date.now()}.webm`, { type: blob.type });
        
        const currentMedia = data.media_files || [];
        const newMedia = [...currentMedia, voiceNote];
        setData('media_files', newMedia);
        
        const currentCaptions = data.captions || [];
        const newCaptions = [...currentCaptions];
        setData('captions', newCaptions);
        
        const url = URL.createObjectURL(blob);
        setPreviewUrls([...previewUrls, url]);
        setVoicePreviewUrl(url); 
        
        // store for form submission
        setData('voice_recording', blob);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/entries', {
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

    // for non-voice-notes from built-in function
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // file type validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];

        // set file size
        const maxSize = 50 * 1024 * 1024; // 50mb maximum

        const validMedia = files.filter(file => {
            if (!allowedTypes.includes(file.type)) {
                alert(`Media type not allowed: ${file.name}`);
                return false;
            }
            if (file.size > maxSize) {
                alert(`Media size too large: ${file.name} (max 50MB)`);
                return false;
            }
            return true;
        });

        // update media array when new ones are added
        const currentMedia = data.media_files || [];
        const newMedia = [...currentMedia, ...validMedia];
        setData('media_files', newMedia);

        // update media captions array when new ones are added
        const currentCaptions = data.captions || [];
        const newCaptions = [...currentCaptions, ...validMedia.map(() => '')];
        setData('captions', newCaptions);
        
        // preview media
        const newPreviewUrls = validMedia.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    };

    const removeMedia = (index) => {
        // free cache by removing preview of media
        if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
        }
        
        // remove media from arrays
        const newMedia = [...data.media_files];
        newMedia.splice(index, 1);
        setData('media_files', newMedia);
        
        const newCaptions = [...data.captions];
        newCaptions.splice(index, 1);
        setData('captions', newCaptions);
        
        const newPreviews = [...previewUrls];
        newPreviews.splice(index, 1);
        setPreviewUrls(newPreviews);

        // same with voice notes
        const removedFile = data.media_files[index];
        if (removedFile && removedFile.name && removedFile.name.includes('voice_')) {
            setVoicePreviewUrl(null);
            setData('voice_recording', null);
        }
    };

    const updateCaption = (index, caption) => {
        const newCaptions = [...data.captions];
        newCaptions[index] = caption;
        setData('captions', newCaptions);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-6">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 sm:rounded-3xl sm:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#DCE8F2]">
                    <h2 className="font-fustat-medium text-2xl text-[#1E3A5F]">
                        Write A New Entry
                    </h2>
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#DCE8F2]/10">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Journal Entry
                        </p>
                        <textarea
                            type="text"
                            value={data.text_content}
                            onChange={e => setData('text_content', e.target.value)}
                            className="flex align-text-top text-[#1E3A5F] text-base font-fustat-medium bg-[#F8FBFD] w-full h-48 border-[#DCE8F2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#DCE8F2] px-3"
                            placeholder="Write a journal entry..."
                            maxLength="5000"
                            style={{
                                verticalAlign: 'top',
                                resize: 'vertical' // to align the text properly
                            }}
                        />
                        {errors.text_content && <div className="text-[#B5446E] text-sm mt-1">{errors.text_content}</div>}
                        <div className="text-right text-[#1E3A5F] text-sm">
                            {data.text_content?.length || 0}/5000
                        </div>
                    </div>

                    {/* mood */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Mood
                        </p>
                        
                        {/* maybe add emojis here instead of the text later on? */}
                        <select className='rounded-2xl'
                            value={data.mood} 
                            onChange={e => setData('mood', e.target.value)}
                        >
                            <option value="">Select your mood</option>
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

                    {/* file upload */}
                    <div className="space-y-2">
                        <p className="text-xl text-[#1E3A5F]">
                            Attach Media
                        </p>

                        <div className=" space-y-2 border-2 border-dashed border-[#DCE8F2] rounded-md p-6 text-start hover:border-[#1E3A5F] transition-colors">
                            <p className="text-[#1E3A5F] text-lg">Voice Recording</p>
                            <div className="flex flex-row items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                    <AudioRecorder 
                                        onRecordingComplete={(blob) => handleVoiceNotes(blob)}
                                        recorderControls={recorderControls}
                                        showVisualizer={true}
                                    />
                                    {recorderControls.isRecording && (
                                        <button 
                                            type="button"
                                            onClick={recorderControls.stopRecording}
                                            className="text-[#1E3A5F] bg-[#DCE8F2] hover:bg-[#C0D6E8] px-3 py-1 rounded text-sm"
                                        >
                                            Stop Recording
                                        </button>
                                    )}
                                </div>
                                <p className="text-[#1E3A5F] text-md">
                                    {recorderControls.isRecording ? 'Recording...' : 'Start recording'}
                                </p>
                            </div>
                        </div>

                        <div className="border-2 border-dashed border-[#DCE8F2] rounded-md p-6 text-center hover:border-[#1E3A5F] transition-colors">
                            <input
                                type="file"
                                id="media-upload"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,video/*"
                                multiple
                            />
                            <label 
                                htmlFor="media-upload" 
                                className="cursor-pointer block"
                            >
                                <i className="fa fa-cloud-upload-alt fa-3x text-[#DCE8F2] mb-3"></i>
                                <p className="text-[#1E3A5F] mb-2">
                                    Click to upload images or videos.
                                </p>
                                <p className="text-[#1E3A5F] text-sm">
                                    Max file size: 50MB per file
                                </p>
                            </label>
                        </div>

                        {/* showing of attached media */}
                        {data.media_files && data.media_files.length > 0 && (
                            <div className="space-y-3 mt-4">
                                <p className="text-lg text-[#1E3A5F]">Attached Files:</p>
                                {data.media_files.map((file, index) => (
                                    <div key={index} className="border border-[#DCE8F2] rounded-md p-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-[#1E3A5F] text-sm">{file.name}</span>
                                                    <span className="text-[#1E3A5F] text-xs">
                                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                    </span>
                                                </div>
                                                
                                                {/* images */}
                                                {file.type.startsWith('image/') && previewUrls[index] && (
                                                    <div className="mb-2">
                                                        <img 
                                                            src={previewUrls[index]} 
                                                            alt={`Preview ${index}`}
                                                            className="max-h-32 rounded object-contain bg-black"
                                                        />
                                                    </div>
                                                )}
                                                
                                                {/* videos */}
                                                {file.type.startsWith('video/') && previewUrls[index] && (
                                                    <div className="mb-2">
                                                        <video 
                                                            src={previewUrls[index]} 
                                                            controls 
                                                            className="max-h-32 rounded"
                                                        />
                                                    </div>
                                                )}

                                                {/* voice notes - different logic used - may pass on invalid files starting with 'voice_' */}
                                                {file.name.includes('voice_') && previewUrls[index] && (
                                                    <div className="mb-2">
                                                        <audio 
                                                            src={previewUrls[index]} 
                                                            controls 
                                                            className="w-full"
                                                        />
                                                    </div>
                                                )}
                                                
                                                <input
                                                    type="text"
                                                    value={data.captions[index] || ''}
                                                    onChange={(e) => updateCaption(index, e.target.value)}
                                                    placeholder="Add a caption (optional)"
                                                    className="mt-2 text-[#1E3A5F] text-sm font-fustat-medium bg-white w-full border-[#DCE8F2] border rounded-md px-2 py-1"
                                                />
                                            </div>
                                            
                                            <button
                                                type="button"
                                                onClick={() => removeMedia(index)}
                                                className="text-[#1E3A5F] ml-2"
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {errors.media_files && <div className="text-[#1E3A5F] text-sm mt-1">{errors.media_files}</div>}
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
                            className="justify-center flex items-center rounded-full border border-transparent px-8 py-2 text-md text-[#EBFFF2] bg-[#1E3A5F] hover:bg-[#1E3A5F]/90"
                        >
                            {processing ? 'Uploading...' : 'Upload Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}