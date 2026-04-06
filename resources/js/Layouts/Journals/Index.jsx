// last updated on 05/04 by valeria

const Journals = ({ journals = [], onJournalClick, onCreateClick }) => {

  const journalCount = journals?.length || 0;

  if (journalCount === 0) {
    return (
      <div className="flex flex-wrap gap-8">
        <div 
          onClick={onCreateClick}
          className="w-52 h-52 flex flex-col cursor-pointer group"
        >
            <div className="flex-grow relative bg-[#F8FBFD] shadow-xl rounded-2xl p-6 flex items-center justify-center group-hover:bg-[#EEF4F8] transition">
              <div className="absolute -left-1 top-6 flex flex-col gap-12 items-center">
                <div className="w-4 h-1 bg-black rounded"></div>
                <div className="w-4 h-1 bg-black rounded"></div>
                <div className="w-4 h-1 bg-black rounded"></div>
                <div className="w-4 h-1 bg-black rounded"></div>
              </div>
              <i className="absolute inset-0 flex items-center justify-center text-black fa fa-plus fa-2x"></i>
              <p className="text-black font-lg font-bold text-center">Create new journal</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {journals.map((journal) => (
        <div 
          key={journal.id} 
          onClick={() => onJournalClick(journal)}
          className="w-52 h-52 flex flex-col cursor-pointer group"
        >
          <div className="flex-grow relative bg-[#394A6B] shadow-xl rounded-2xl p-6 flex items-end group-hover:bg-[#394A6B]/80 shadow-[6px_6px_15px_grey] hover:translate-x-1 hover:translate-y-1 transition">
            <div className="absolute top-0 right-4 w-8 h-full bg-[#A8C3BC] "></div>
            <div className="absolute -left-1 top-6 flex flex-col gap-12 items-center">
              <div className="w-4 h-1 bg-black rounded"></div>
              <div className="w-4 h-1 bg-black rounded"></div>
              <div className="w-4 h-1 bg-black rounded"></div>
              <div className="w-4 h-1 bg-black rounded"></div>
            </div>
            <p className="text-white text-xl font-bold -mb-3">{journal.title}</p>
          </div>
        </div>
      ))}

      <div 
        onClick={onCreateClick}
        className="w-52 h-52 flex flex-col cursor-pointer group"
      >
        <div className="flex-grow relative bg-[#F6F9FD] border border-[#394A6B] shadow-lg rounded-2xl p-6 flex items-end justify-center group-hover:bg-[#394A6B]/40 transition">
          <div className="absolute -left-1 top-6 flex flex-col gap-12 items-center">
            <div className="w-4 h-1 bg-black rounded"></div>
            <div className="w-4 h-1 bg-black rounded"></div>
            <div className="w-4 h-1 bg-black rounded"></div>
            <div className="w-4 h-1 bg-black rounded"></div>
          </div>
          <i className="absolute inset-0 flex items-center justify-center text-black fa fa-plus fa-2x"></i>
          <p className="text-black font-lg font-bold text-center">Create new journal</p>
        </div>
      </div>
    </div>
  );
};

export default Journals;