// last updated on 02/04 by mars

export default function ShowEntriesModal({ isOpen, onClose, entry, onDelete }) {
    if (!isOpen || !entry) return null;

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