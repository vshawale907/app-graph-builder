import { useAppStore } from '@/store/useAppStore'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import type { ReactNode } from 'react'

export function RightPanel({ appsList, nodeInspector }: { appsList: ReactNode; nodeInspector: ReactNode }) {
  const { isMobilePanelOpen, toggleMobilePanel } = useAppStore()

  const panelContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#111] text-sm">
      {/* App List Section (Always visible on top) */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10 shrink-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3 uppercase text-xs tracking-wider">Apps</h3>
        {appsList}
      </div>

      {/* Node Inspector Section (Fills remaining space) */}
      <div className="flex-1 overflow-y-auto">
        {nodeInspector}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Panel */}
      <div className="w-72 shrink-0 border-l border-gray-200 dark:border-white/10 hidden md:block h-full overflow-hidden">
        {panelContent}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isMobilePanelOpen} onOpenChange={toggleMobilePanel}>
        <SheetContent side="right" className="w-[85vw] sm:w-80 p-0 border-l-gray-200 dark:border-l-white/10 bg-white dark:bg-[#111]">
          {panelContent}
        </SheetContent>
      </Sheet>
    </>
  )
}
