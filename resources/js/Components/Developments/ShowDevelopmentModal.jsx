// last updated on 04/04 by mars

export default function ShowDevelopmentModal({ isOpen, onClose, development, onDelete }) {
    if (!isOpen || !development) return null;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
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
                    <div>
                        <p className="text-sm text-gray-400">{development.text_content}</p>
                    </div>
                    <div>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatDate(development.created_at)}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(development)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}