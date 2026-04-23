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
         className="w-52 h-52 bg-white border-2 border-dashed border-[#B5E4C7] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#f8fffb] transition"
         >
          <i className="fa fa-camera text-[#111317] text-3xl mb-2"></i>
          <p className="text-center">Add New Affirmation"</p>
         </div>


      </div>
    );
  }

  return (
    <div className="pt-8 grid grid-cols-4 gap-8">
      {/* Jasmine */}
      {affirmations.map((affirmation) => (
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
        className="w-52 h-52 flex items-center justify-center cursor-pointer"
      >
        <div className="relative w-44 h-36 bg-[#CFE9DC] rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition">
          <div className="absolute -top-6 left-8 w-16 h-6 bg-[#CFE9DC] rounded-t-2xl"></div>
          <div className="w-20 h-20 bg-[#111317] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full">
            </div>

          </div>
           <p className="mt-4 text-sm text-center text-[#111317]">Add new affirmation</p>
        </div>
          </div>
     </div>
  );
};

export default Affirmations;