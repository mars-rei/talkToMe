// last updated on 09/04 by valeria

export default function ShowEntriesModal({ isOpen, onClose, entry, onDelete }) {
    if (!isOpen || !entry) return null;

    const date = new Date(entry.created_at)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = date.getUTCDate() 
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let month = months[date.getUTCMonth()]
    const year = date.getFullYear()
    const formattedDate = time + ' ' + day + ' ' + month + ' ' + year

    // cba to change the logic of file_type in the db for media
    const getMimeType = (fileType) => {
        const mimeMap = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'mp4': 'video/mp4',
            'mov': 'video/quicktime',
            'webm': 'audio/webm', // voice note type from built in voice recording
        };
        return mimeMap[fileType.toLowerCase()] || fileType;
    };

    const renderMedia = (mediaItem) => {
        const filePath = `/storage/${mediaItem.file_path}`;

        // convert file_type to mime
        const mimeType = mediaItem.file_type.includes('/') 
            ? mediaItem.file_type 
            : getMimeType(mediaItem.file_type);
        
        if (mimeType.startsWith('image/')) {
            return (
                <div className="relative group">
                    <img 
                        src={filePath} 
                        className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(filePath, '_blank')}
                    />
                    {mediaItem.caption && (
                        <p className="text-sm text-[#EBFFF2] mt-1 italic">{mediaItem.caption}</p>
                    )}
                </div>
            );
        }
        
        if (mimeType.startsWith('video/')) {
            return (
                <div>
                    <video 
                        src={filePath} 
                        controls 
                        className="max-w-full h-auto rounded-lg"
                    />
                    {mediaItem.caption && (
                        <p className="text-sm text-[#EBFFF2] mt-1 italic">{mediaItem.caption}</p>
                    )}
                </div>
            );
        }

        if (mimeType.startsWith('audio/')) {
            return (
                <div>
                    <audio 
                        controls 
                        className="w-full max-h-32"
                    >
                        <source src={filePath} type={mimeType} />
                    </audio>
                    {mediaItem.caption && (
                        <p className="text-sm text-[#EBFFF2] mt-1 italic">{mediaItem.caption}</p>
                    )}
                </div>
            );
        }
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 rounded-3xl sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/*Entry date */}
                <div className="flex justify-between border-b border-[#DCE8F2] items-center pb-4 mb-6">
                    <h2 className="font-fustat-medium text-3xl text-[#1E3A5F]">
                        {formattedDate}
                    </h2>
                    <button onClick={onClose} className="text-[#1E3A5F]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                {/*Entry mood and content */}
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <p className="text-base text-gray-400">Mood</p>
                        <p className="text-[#1E3A5F] border border-[#DCE8F2] uppercase px-4 py-1 rounded-full bg-[#EEF4F8] text-base font-fustat-medium">{entry.mood}</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#DCE8F2]"></div>
                        <div className="pl-5">
                        <p className="text-[#1E3A5F] text-base leading-8 font-fustat-medium">{entry.text_content}</p>
                        </div>
                    </div>
                </div>

                {/*Entry media */}
                <div>
                    {entry.media && entry.media.length > 0 && (
                        <div className="space-y-3 mt-4">
                            <p className="text-xl text-[#1E3A5F] font-fustat-medium">
                                Attached Media ({entry.media.length})
                            </p>
                            <div className="grid grid-cols-2 gap-4 sm-grid-cols-3">
                                {entry.media.map((mediaItem) => (
                                    <div key={mediaItem.id} className="border border-[#DCE8F2] rounded-md p-3 items-center justify-center">
                                        {renderMedia(mediaItem)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* form buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        onClick={() => onDelete(entry)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#1E3A5F] px-8 py-2 text-md text-white hover:bg-[#1E3A5F]/90"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}