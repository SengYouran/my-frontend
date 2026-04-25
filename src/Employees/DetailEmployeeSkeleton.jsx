function DetailEmployeeSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* Body */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Profile Card Skeleton */}
        <div className="border rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-36 h-36 rounded-full bg-gray-200 mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-20 bg-gray-100 rounded mb-3" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>

        {/* Right Detail Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Info */}
          <SkeletonSection />

          {/* Work Info */}
          <SkeletonSection />

        </div>
      </div>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div>
      <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
            <div className="h-9 w-full bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailEmployeeSkeleton;
