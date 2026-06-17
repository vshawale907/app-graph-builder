import { GitBranch, Database, Server, Box, Leaf, LayoutGrid, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { icon: GitBranch, label: 'Source' },
  { icon: Database, label: 'Database' },
  { icon: Server, label: 'Compute' },
  { icon: Box, label: 'Storage' },
  { icon: Leaf, label: 'Environment' },
  { icon: LayoutGrid, label: 'Apps' },
  { icon: Network, label: 'Networking' },
]

export function LeftRail() {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-12 shrink-0 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0d0d0d] flex flex-col items-center py-4 gap-4 hidden md:flex">
      {NAV_ITEMS.map((item, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => onDragStart(e, 'service', item.label)}
          className="cursor-grab active:cursor-grabbing"
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 pointer-events-none"
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        </div>
      ))}
    </div>
  )
}
