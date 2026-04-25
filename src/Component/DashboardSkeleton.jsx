function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 animate-pulse">
      <div className="h-12 bg-slate-300 rounded-lg mb-6"></div>

      <div className="flex gap-6">
        <div className="w-60 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-300 rounded"></div>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-300 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
