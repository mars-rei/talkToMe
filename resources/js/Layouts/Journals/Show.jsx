export default function JournalShow({ 
    journal, 
    allEntries = [], 
    onBack, 
    onEdit, 
    onDelete,
    onEntryClick,
    onAddEntryClick
}) {
    
    // get all entries for this journal
    const journalEntries = allEntries.filter(item => 
        item.journals?.some(j => j.id === journal.id)
    );

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
                <div className="grid grid-cols-4 gap-8">
                    {journalEntries.map((entry) => (
                        <div 
                            key={entry.id} 
                            onClick={() => onEntryClick(entry)}
                            className="w-full h-52 flex flex-col cursor-pointer group"
                        >      
                            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
                                <p className="text-sm truncate">{entry.date}</p>
                            </div>    
                            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
                                <p className="text-sm truncate">{entry.text_content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}