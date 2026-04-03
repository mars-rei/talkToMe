// last updated on 03/04 by mars

export default function ShowEntriesModal({ isOpen, onClose, entry, onDelete }) {
    if (!isOpen || !entry) return null;

    // cba to change the logic of file_type in the db for media
    const getMimeType = (fileType) => {
        const mimeMap = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'mp4': 'video/mp4',
            'mov': 'video/quicktime',
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
                        alt={mediaItem.caption || 'Entry image'}
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
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        {entry.date}
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="flex flex-col">
                    <div>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{entry.text_content}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <p className="text-base text-gray-400">Mood:</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{entry.mood}</p>
                    </div>
                </div>

                <div>
                    {entry.media && entry.media.length > 0 && (
                        <div className="space-y-3 mt-4">
                            <p className="text-xl text-[#EBFFF2] font-fustat-medium">
                                Attached Media ({entry.media.length})
                            </p>
                            <div className="space-y-4">
                                {entry.media.map((mediaItem) => (
                                    <div key={mediaItem.id} className="border border-[#EBFFF2] rounded-md p-3">
                                        {renderMedia(mediaItem)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* form buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(entry)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}