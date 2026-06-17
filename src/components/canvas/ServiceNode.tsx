import { memo, useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Settings, CheckCircle2, AlertTriangle, Cloud } from 'lucide-react'
import type { ServiceNodeData } from '@/hooks/useAppGraph'
import { cn } from '@/lib/utils'

export const ServiceNode = memo(({ data, selected }: NodeProps) => {
  const [activeTab, setActiveTab] = useState<'cpu' | 'memory' | 'disk' | 'region'>('cpu')
  const d = data as ServiceNodeData

  const isHealthy = d.status === 'Healthy'
  
  // Mapping tabs to values
  const tabValues = {
    cpu: { value: d.cpu, label: 'CPU', unit: '', max: 1 },
    memory: { value: d.memory, label: 'Memory', unit: ' GB', max: 8 },
    disk: { value: d.disk, label: 'Disk', unit: ' GB', max: 100 },
    region: { value: d.region, label: 'Region', unit: '', max: 5 },
  }

  const currentTab = tabValues[activeTab]

  return (
    <div
      className={cn(
        "w-[320px] rounded-xl bg-white dark:bg-[#161616] border transition-colors",
        selected ? "border-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,1)]" : "border-gray-200 dark:border-[#2a2a2a] hover:border-gray-400 dark:hover:border-white/20"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 border-2 border-white dark:border-[#161616] bg-emerald-500" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
            <DatabaseIcon name={d.label} />
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">{d.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${d.cost.toFixed(2)}/HR
          </div>
          <Settings className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-white/5 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#111]">
        {Object.entries(tabValues).map(([key, item]) => (
          <div key={key} className="flex flex-col items-center justify-center py-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</span>
            <span className="text-xs font-medium text-gray-900 dark:text-gray-300">
              {item.value}{item.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex px-4 pt-3 pb-2 gap-4 text-xs font-medium border-b border-gray-100 dark:border-white/5">
        {(['cpu', 'memory', 'disk', 'region'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-2 border-b-2 transition-colors uppercase tracking-wider",
              activeTab === tab 
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            )}
          >
            {tabValues[tab].label}
          </button>
        ))}
      </div>

      {/* Main Metric Visualization */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {currentTab.value.toFixed(2)}{currentTab.unit}
          </span>
          <span className="text-xs text-gray-500">of {currentTab.max}{currentTab.unit}</span>
        </div>
        
        {/* Progress Bar mapped to sliderValue (0-100) */}
        <div className="h-2 w-full bg-gray-200 dark:bg-black rounded-full overflow-hidden border border-gray-300 dark:border-white/5 relative">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isHealthy 
                ? "bg-gradient-to-r from-blue-500 to-emerald-500" 
                : "bg-gradient-to-r from-blue-500 to-rose-500"
            )}
            style={{ width: `${Math.min(100, Math.max(0, d.sliderValue))}%` }}
          />
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-black/40 rounded-b-xl border-t border-gray-100 dark:border-white/5">
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-medium",
          isHealthy ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
        )}>
          {isHealthy ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          {isHealthy ? 'Success' : 'Error'}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-amber-500/80 font-bold tracking-widest">
          <Cloud className="w-3.5 h-3.5" />
          AWS
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2 border-white dark:border-[#161616] bg-emerald-500" />
    </div>
  )
})

// Simple icon selector based on name
function DatabaseIcon({ name }: { name: string }) {
  const n = name.toLowerCase()
  if (n.includes('postgres')) return <span className="font-bold text-indigo-400">Pg</span>
  if (n.includes('redis')) return <span className="font-bold text-rose-400">Re</span>
  if (n.includes('mongo')) return <span className="font-bold text-emerald-400">Mg</span>
  return <span className="font-bold text-gray-400">Svc</span>
}
