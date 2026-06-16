import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { LeftRail } from './LeftRail'
import { RightPanel } from './RightPanel'

interface MainLayoutProps {
  canvas: ReactNode
  appsList: ReactNode
  nodeInspector: ReactNode
}

export function MainLayout({ canvas, appsList, nodeInspector }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0d0d0d] overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftRail />
        <main className="flex-1 relative overflow-hidden">
          {canvas}
        </main>
        <RightPanel appsList={appsList} nodeInspector={nodeInspector} />
      </div>
    </div>
  )
}
