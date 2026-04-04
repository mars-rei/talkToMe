// last updated on 04/04 by mars

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
      <div className="grid grid-cols-4 gap-8">
        <div 
          onClick={onCreateClick}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
            <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
              <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
            </div>
            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
              <p>Add New Development</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {developments.map((development) => (
        <div 
          key={development.id} 
          onClick={() => onDevelopmentClick(development)}
          className="w-64 h-64 flex flex-col cursor-pointer justify-center text-center p-4 space-y-4 items-center bg-slate-500 rounded-md"
        >
          <p>{development.text_content}</p>
          <p>{formatDate(development.created_at)}</p>
        </div>
      ))}

      <div 
        onClick={onCreateClick}
        className="w-full h-52 flex flex-col cursor-pointer group"
      >
        <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
          <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
            <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
          </div>
          <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
            <p>Add New Development</p>
          </div>
      </div>
    </div>
  );
};

export default Developments;