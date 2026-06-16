import { useApps } from '@/hooks/useApps'
import { useAppStore } from '@/store/useAppStore'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Server } from 'lucide-react'

export function AppsList() {
  const { data: apps, isLoading, isError } = useApps()
  const { selectedAppId, setSelectedApp } = useAppStore()

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full bg-white/5" />
        <Skeleton className="h-12 w-full bg-white/5" />
        <Skeleton className="h-12 w-full bg-white/5" />
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-400 text-sm p-4 bg-red-500/10 rounded border border-red-500/20">Failed to load applications.</div>
  }

  if (!apps?.length) {
    return <div className="text-gray-500 text-sm p-4">No apps found.</div>
  }

  return (
    <div className="space-y-1">
      {apps.map((app) => {
        const isSelected = selectedAppId === app.id
        return (
          <button
            key={app.id}
            onClick={() => setSelectedApp(app.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors border",
              isSelected
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-transparent border-transparent text-gray-300 hover:bg-white/5"
            )}
          >
            <div className="w-8 h-8 rounded bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4" style={{ color: app.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-white">{app.name}</p>
              <p className="text-xs opacity-60 truncate font-mono mt-0.5">{app.id}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
