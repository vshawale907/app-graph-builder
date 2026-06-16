import { Share2, Moon, Menu, Maximize, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import { useReactFlow } from '@xyflow/react'

export function TopBar() {
  const { toggleMobilePanel, selectedAppId } = useAppStore()
  const { fitView, setNodes } = useReactFlow()

  const handleAddNode = () => {
    if (!selectedAppId) return

    setNodes((nds) => [
      ...nds,
      {
        id: `node-custom-${Date.now()}`,
        type: 'service',
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          label: 'New Service',
          status: 'Healthy',
          cpu: 0,
          memory: 0,
          disk: 0,
          region: 1,
          sliderValue: 50,
          cost: 0.01,
        },
      },
    ])
  }

  return (
    <div className="h-14 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between px-4 z-10 shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobilePanel}>
          <Menu className="w-5 h-5 text-gray-400" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-sm" />
          <span className="font-semibold text-gray-200 hidden sm:inline">App Graph Builder</span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {selectedAppId && (
          <>
            <Button variant="outline" size="sm" onClick={handleAddNode} className="border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 hidden sm:flex">
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </Button>
            <Button variant="ghost" size="icon" onClick={() => fitView({ duration: 800 })} className="text-gray-400 hover:text-white" title="Fit View">
              <Maximize className="w-4 h-4" />
            </Button>
          </>
        )}
        <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2" />
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
          <Moon className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-xs font-medium ml-2">
          U
        </div>
      </div>
    </div>
  )
}
