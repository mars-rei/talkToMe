// last updated on 06/04 by valeria

export default function ShowDevelopmentModal({ isOpen, onClose, development, onDelete }) {
    if (!isOpen || !development) return null;

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#FFEE8C] border-[#DCE8F2] border-2 p-4 shadow-2xl rounded-lg rotate-[-1deg] sm:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end mb-6">
                    <button onClick={onClose} className="text-[#1E3A5F] hover:text-[#2C4E73] transition">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <div>
                        <p className="text-3xl text-black">{development.text_content}</p>
                    </div>
                    <div>
                        <p className="text-[#1E3A5F] text-base font-fustat-medium">{development.date}</p>
                    </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(development)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#FF383C] hover:bg-[#991B1B] px-8 py-2 text-md text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}