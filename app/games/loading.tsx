export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="h-12 bg-gray-800 rounded animate-pulse mb-8 w-64"></div>

        <div className="h-12 bg-gray-800 rounded animate-pulse mb-8"></div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-700 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
