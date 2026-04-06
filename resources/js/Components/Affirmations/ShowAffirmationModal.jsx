// last updated on 02/04 by mars

export default function ShowAffirmationModal({ isOpen, onClose, affirmation, onDelete }) {
    if (!isOpen || !affirmation) return null;

    const getFileUrl = (filePath) => {
        return `/storage/${filePath}`;
    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end mb-6">
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="flex flex-col">
                    <img 
                        src={getFileUrl(affirmation.file_path)} 
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(affirmation)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}