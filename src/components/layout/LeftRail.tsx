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
  return (
    <div className="w-12 shrink-0 border-r border-white/10 bg-[#0d0d0d] flex flex-col items-center py-4 gap-4 hidden md:flex">
      {NAV_ITEMS.map((item, i) => (
        <Button
          key={i}
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-gray-500 hover:text-white hover:bg-white/5"
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  )
}
