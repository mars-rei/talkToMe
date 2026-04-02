const Journals = ({ journals = [], onJournalClick, onCreateClick }) => {

  const journalCount = journals?.length || 0;

  if (journalCount === 0) {
    return (
      <div className="grid grid-cols-4 gap-8">
        <div 
          onClick={onCreateClick}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#DCE8F2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#2C4E73]"></div>
            <div className="flex-grow bg-[#F8FBFD] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#EEF4F8]">
              <i className="text-[#1E3A5F] fa fa-plus fa-2x -mb-6"></i>
            </div>
            <div className="h-12 bg-[#F8FBFD] border border-[#DCE8F2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#EEF4F8]">
              <p className="text-[#1F2937]">Create new journal</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {journals.map((journal) => (
        <div 
          key={journal.id} 
          onClick={() => onJournalClick(journal)}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#DCE8F2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#2C4E73]"></div>
          <div className="flex-grow bg-[#F8FBFD] rounded-b-2xl rounded-tr-2xl p-6 flex items-end group-hover:bg-[#EEF4F8]">
            <p className="text-[#1F2937] -mb-3">{journal.title}</p>
          </div>
        </div>
      ))}

      <div 
        onClick={onCreateClick}
        className="w-full h-52 flex flex-col cursor-pointer group"
      >
        <div className="w-1/2 h-6 bg-[#DCE8F2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#2C4E73]"></div>
          <div className="flex-grow bg-[#F8FBFD] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#EEF4F8]">
            <i className="text-[#1E3A5F] fa fa-plus fa-2x -mb-6"></i>
          </div>
          <div className="h-12 bg-[#F8FBFD] border border-[#DCE8F2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#EEF4F8]">
            <p className="text-[#1F2937]">Create new journal</p>
          </div>
      </div>
    </div>
  );
};

export default Journals;