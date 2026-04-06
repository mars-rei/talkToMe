// last updated on 05/04 by valeria

export default function JournalShow({ 
    journal, 
    allEntries = [], 
    onBack, 
    onEdit, 
    onDelete,
    onEntryClick,
    onAddEntryClick
}) {
    
    const journalEntries = allEntries.filter(item => 
        item.journals?.some(j => j.id === journal.id)
    );

    return (
        <div>
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
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-black mb-2">
                                {journal.title}
                            </h1>
                            <button onClick={() => onEdit(journal)}>
                                <i className="fa fa-pencil fa-xl text-black hover:text-[#2C4E73]"></i>
                            </button>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => onDelete(journal)}
                                className="rounded-full bg-[#FF383C] text-white px-6 py-2 text-md hover:bg-[#991B1B] transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-[#1E3A5F]">Journal Entries</h2>

                    <button
                        onClick={() => onAddEntryClick(journal.id)}
                        className="rounded-full bg-[#1E3A5F] text-white px-6 py-2 text-md hover:bg-[#2C4E73] transition"
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
                <div className="grid grid-cols-4 gap-8">
                    {journalEntries.map((entry) => (
                        <div 
                            key={entry.id} 
                            onClick={() => onEntryClick(entry)}
                            className="w-full h-52 flex flex-col cursor-pointer group"
                        >      
                            <div className="h-12 bg-[#F8FBFD] border border-[#DCE8F2] rounded-t-xl p-4 flex items-center group-hover:bg-[#EEF4F8]">
                                <p className="text-sm text-[#1F2937] truncate">
                                    {entry.date}
                                </p>
                            </div>    

                            <div className="h-12 bg-[#F8FBFD] border border-[#DCE8F2] rounded-b-xl p-4 flex items-center group-hover:bg-[#EEF4F8]">
                                <p className="text-sm text-[#6B7280] truncate">
                                    {entry.text_content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}