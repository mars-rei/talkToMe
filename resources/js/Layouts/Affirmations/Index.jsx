// last updated on 09/04 by mars

const Affirmations = ({ affirmations = [], onAffirmationClick, onCreateClick }) => {

  const affirmationCount = affirmations?.length || 0;

  const getFileUrl = (filePath) => {
    return `/storage/${filePath}`;
  };


  if (affirmationCount === 0) {
    return (
      <div 
        onClick={onCreateClick}
        className="flex flex-wrap gap-8 pt-8 cursor-pointer shadow-md hover:shadow-lg transition bg-white"
      >
        <div className="w-52 cursor-pointer p-6">
          <div className="w-full h-40">
            <div className="h-full flex flex-col items-center justify-between">
              <div className="h-28 flex items-center">
                <i className="fa fa-camera text-[#394A6B] fa-3x mb-2"></i>
              </div>
              <p className="text-center">Add New Affirmation</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 pt-8">
      {/* Jasmine */}
      {affirmations.map((affirmation) => (
        <div
         key={affirmation.id} 
          onClick={() => onAffirmationClick(affirmation)}
          className="w-52 bg-white p-3 shadow-md hover:shadow-lg transition cursor-pointer pb-12"
        >
          <div className="h-40 overflow-hidden">
            <img 
              src={getFileUrl(affirmation.file_path)} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>      
      ))}

      <div 
        onClick={onCreateClick}
        className="flex flex-wrap gap-8 pt-8 cursor-pointer shadow-md hover:shadow-lg transition bg-white"
      >
        <div className="w-52 cursor-pointer p-6">
          <div className="w-full h-40">
            <div className="h-full flex flex-col items-center justify-between">
              <div className="h-28 flex items-center">
                <i className="fa fa-camera text-[#394A6B] fa-3x mb-2"></i>
              </div>
              <p className="text-center">Add New Affirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affirmations;