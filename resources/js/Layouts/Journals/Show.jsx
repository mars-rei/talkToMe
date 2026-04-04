// last updated on 04/04 by mars

export default function JournalShow({ 
    journal, 
    entries = [],
    onBack, 
    onEdit, 
    onDelete,
    onEntryClick,
    onAddEntryClick
}) {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getMimeType = (fileType) => {
        const mimeMap = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'mp4': 'video/mp4',
            'mov': 'video/quicktime',
            'webm': 'audio/webm',
        };
        return mimeMap[fileType.toLowerCase()] || fileType;
    };
    
    const renderMediaPreview = (media) => {
        const filePath = `/storage/${media.file_path}`;

        const mimeType = media.file_type?.includes('/') 
            ? media.file_type 
            : getMimeType(media.file_type);
        
        if (mimeType.startsWith('image/')) {
            return (
                <img 
                    src={filePath} 
                    className="max-h-40 rounded object-contain"
                />
            );
        }
        
        if (mimeType.startsWith('video/')) {
            return (
                <video 
                    controls 
                    className="max-h-40 rounded object-contain"
                >
                    <source src={filePath} type={mimeType} />
                </video>
            );
        }
        
        // for audio files
        if (mimeType.startsWith('audio/')) {
            return (
                <div className="w-fit">
                    <audio 
                        controls 
                    >
                        <source src={filePath} type={mimeType} />
                    </audio>
                </div>
            );
        }
        
        return null;
    };

    // get all entries for this journal
    const journalEntries = entries;

    return (
        <div>
            <div className="mb-8">
                <button 
                    onClick={onBack}
                    className="text-[#EBFFF2] hover:text-[#B5446E] transition-colors flex items-center gap-2 mb-4"
                >
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to all journals</span>
                </button>

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl text-[#EBFFF2] mb-2">{journal.title}</h1>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => onEdit(journal)}
                                className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                            >
                                Edit Details
                            </button>
                            <button
                                onClick={() => onDelete(journal)}
                                className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white">Journal Entries</h2>
                    <button
                        onClick={() => onAddEntryClick(journal.id)}
                        className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        <i className="fa fa-plus mr-2"></i>
                        Add Entry
                    </button>
                </div>
            </div>

            {journalEntries.length === 0 ? (
                <div className="text-white text-center py-12 bg-[#1E1E24] rounded-lg">
                    <p className="mb-4">No entries in this journal yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {journalEntries.map(entry => (
                        <div 
                            key={entry.id}
                            onClick={() => onEntryClick(entry)}
                            className="w-full flex flex-col bg-slate-300 rounded-md cursor-pointer p-4"
                        >
                            <div>
                                <p className="text-sm truncate">{formatDate(entry.created_at)}</p>
                            </div>    
                            <div>
                                <p className="text-sm truncate">{entry.text_content}</p>
                            </div>
                            <div>
                                <p className="text-sm truncate">Mood: {entry.mood}</p>
                            </div>

                            {entry.media && entry.media.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    <p className="text-sm font-semibold">Media:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.media.map(media => (
                                            <div key={media.id} className="relative">
                                                {renderMediaPreview(media)}
                                                {media.caption && (
                                                    <p className="text-xs text-gray-600 mt-1">{media.caption}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}