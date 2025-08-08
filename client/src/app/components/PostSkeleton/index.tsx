export default function PostSkeleton() {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-md border-l-4 border-l-gray-300 p-5 animate-pulse min-w-full w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex-1 w-full">
          {/* Title skeleton - same size as Title level={3} */}
          <div className="h-7 bg-gray-300 rounded-md mb-2 w-4/5"></div>
          
          {/* Author skeleton - same structure as original */}
          <div className="flex items-center mb-3 w-full">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
            <div className="h-4 bg-gray-300 rounded w-24 mr-2 flex-shrink-0"></div>
            <div className="h-4 bg-gray-300 rounded w-40 flex-shrink-0"></div>
          </div>

          {/* Content skeleton - same spacing as Paragraph */}
          <div className="mb-3 w-full">
            <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-11/12 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>

          {/* Button and date skeleton - same structure */}
          <div className="flex justify-between items-center w-full">
            <div className="h-7 bg-blue-300 rounded w-20 flex-shrink-0"></div>
            <div className="h-4 bg-gray-300 rounded w-20 flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
