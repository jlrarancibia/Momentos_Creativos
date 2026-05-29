export default function MapPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4 p-8 text-center">
      <div className="text-5xl">🗺️</div>
      <h2 className="text-xl font-bold text-[#2C3E50]">Interactive Map</h2>
      <p className="text-sm text-[#8B9BAD] max-w-xs">
        Mapbox integration coming next. You'll see all restaurants, experiences, and routes here.
      </p>
      <div className="text-xs text-[#C84B31] font-medium">
        Add NEXT_PUBLIC_MAPBOX_TOKEN to enable
      </div>
    </div>
  )
}
