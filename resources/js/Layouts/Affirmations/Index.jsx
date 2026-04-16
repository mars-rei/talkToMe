// last updated on 09/04 by mars

const Affirmations = ({ affirmations = [], onAffirmationClick, onCreateClick }) => {

  const affirmationCount = affirmations?.length || 0;

  const getFileUrl = (filePath) => {
    return `/storage/${filePath}`;
  };


  if (affirmationCount === 0) {
    return (
      <div className="pt-8 grid grid-cols-4 gap-8">
        <div 
          onClick={onCreateClick}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
            <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
              <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
            </div>
            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
              <p>Add New Affirmation</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 grid grid-cols-4 gap-8">
      {affirmations.map((affirmation) => (
           //Jasmine
        <div 
          key={affirmation.id} 
          onClick={() => onAffirmationClick(affirmation)}
          className="w-52 bg-white p-3 shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <div className="w-full h-40 overflow-hidden">
            <img 
              src={getFileUrl(affirmation.file_path)} 
              className="w-full h-full object-cover"
            />
          </div>
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
            <p>Add New Affirmation</p>
          </div>
      </div>
    </div>
  );
};

export default Affirmations;