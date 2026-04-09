// last updated on 09/04 by mars

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
                    className="max-h-20 rounded object-contain"
                />
            );
        }
        
        if (mimeType.startsWith('video/')) {
            return (
                <video 
                    controls 
                    className="max-h-20 rounded object-contain"
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
        <div className="w-full min-w-0 pt-8">
            <div className="mb-8">
                <button 
                    onClick={onBack}
                    className="text-[#1E3A5F] hover:text-[#2C4E73] transition-colors flex items-center gap-2 mb-4"
                >
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to all journals</span>
                </button>

                {/* Journal header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div className="flex items-center gap-3 min-w-0">
                            <h1 className="text-3xl font-bold text-black mb-2 break-words">
                                {journal.title}
                            </h1>
                            <button onClick={() => onEdit(journal)}>
                                <i className="fa fa-pencil fa-xl text-black hover:text-[#2C4E73]"></i>
                            </button>
                        </div>
                        
                        <div className="flex gap-4 flex-shrink-0">
                            <button
                                onClick={() => onDelete(journal)}
                                className="rounded-full bg-[#FF383C] text-white px-6 py-2 text-md hover:bg-[#991B1B] transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
                    <h2 className="text-xl text-[#1E3A5F]">Journal Entries</h2>

                    <button
                        onClick={() => onAddEntryClick(journal.id)}
                        className="flex-shrink-0 px-4 py-1 rounded-full bg-white text-[#1E3A5F] border border-[#1E3A5F] text-md hover:bg-[#1E3A5F] hover:text-white transition"
                    >
                        <i className="fa fa-plus mr-2"></i>
                        Add Entry
                    </button>
                </div>
            </div>

            {journalEntries.length === 0 ? (
                <div className="text-center py-12 bg-[#F8FBFD] border border-[#DCE8F2] rounded-xl">
                    <p className="text-[#6B7280] mb-3">
                        No entries in this journal yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 min-w-0 w-full mb-10">
                    {journalEntries.map(entry => (
                        <div 
                            key={entry.id}
                            onClick={() => onEntryClick(entry)}
                            className="min-w-0 flex bg-[#F8FBFD] border border[#DCE8F2] hover:border-[#1E3A5F]/50 shadow-lg rounded-xl w-full flex-col cursor-pointer group overflow-hidden transition hover:-translate-y-0.5"
                        >    
                            {/* Entry date and modd */}  
                            <div className="min-w-0 flex items-center justify-between p-4 border-b border-[#DCE8F2] shadow-sm">
                                <p className="text-xl text-[#1E3A5F] truncate">
                                    {formatDate(entry.created_at)}
                                </p>
                                <div className="min-w-0 flex flex-wrap items-center gap-2">
                                    <p className="text-sm truncate font-medium text-[#1E3A5F]">Mood</p>
                                    <p className="text-sm uppercase bg-white border border-[#DCE8F2] rounded-full px-4 py-1 truncate">{entry.mood}</p>
                                </div>
                            </div>  

                            {/* Entry content */}  
                            <div className="min-w-0 bg-[#F8FBFD] p-4 flex border-b border-[#DCE8F2]">
                                <p className="text-sm text-[#6B7280] line-clamp-3">
                                    {entry.text_content}
                                </p>
                            </div>

                            {/* Entry media */}  
                            {entry.media && entry.media.length > 0 && (
                                <div className="p-4 min-w-0 overflow-hidden">
                                    <p className="text-base text-[#1E3A5F] mb-2">Media</p>
                                    <div className="flex flex-wrap gap-2 min-w-0">
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