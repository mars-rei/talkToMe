// last updated on 02/04 by mars

export default function ShowAffirmationModal({ isOpen, onClose, affirmation, onDelete }) {
    if (!isOpen || !affirmation) return null;

    const getFileUrl = (filePath) => {
        return `/storage/${filePath}`;
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#F8FBFD] border-[#DCE8F2] border-2 p-4 rounded-3xl sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end mb-6">
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73] transition">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="flex flex-col">
                    <img 
                        src={getFileUrl(affirmation.file_path)} 
                        className="object-contain h-96"
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-8">
                    <button
                        onClick={() => onDelete(affirmation)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#FF383C] hover:bg-[#991B1B] px-8 py-2 text-md text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}