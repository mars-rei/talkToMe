// last updated on 06/04 by mars

const Developments = ({ developments = [], onDevelopmentClick, onCreateClick }) => {

  const developmentCount = developments?.length || 0;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (developmentCount === 0) {
    return (
      <div className="flex flex-wrap gap-8">
        <div 
          onClick={onCreateClick}
          className="w-52 h-52 flex flex-col cursor-pointer group"
        >
            <div className="flex-grow bg-[#F6F9FD] shadow-lg rounded-t-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E] transition">
              <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
            </div>
            <div className="h-12 bg-[#F6F9FD] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E] transition">
              <p>Add New Development</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 mt-4">
      {developments.map((development) => (
        <div 
          key={development.id} 
          onClick={() => onDevelopmentClick(development)}
          className="w-52 h-52 flex flex-col cursor-pointer justify-center text-center p-4 space-y-4 items-center bg-[#E6D795] shadow-[8px_8px_20px_grey] hover:-translate-y-1 hover:-translate-x-1 group-hover:bg-[#B5446E] transition "
        >
          <p className="text-xl font-bold ">{development.text_content}</p>
          <p className="text-xs">{formatDate(development.created_at)}</p>
        </div>
      ))}

      <div 
        onClick={onCreateClick}
        className="w-52 h-52 flex flex-col cursor-pointer group shadow-lg"
      >
          <div className="flex-grow bg-[#E6D795]/30 p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
            <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
          </div>
          <div className="h-12 bg-[#E6D795]/30 p-4 flex items-center group-hover:bg-[#B5446E]">
            <p>Add New Development</p>
          </div>
      </div>
    </div>
  );
};

export default Developments;