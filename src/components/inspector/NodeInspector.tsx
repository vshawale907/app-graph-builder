import { useCallback } from 'react'
import { useReactFlow, useNodes } from '@xyflow/react'
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react'

import { useAppStore } from '@/store/useAppStore'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ServiceNodeData } from '@/hooks/useAppGraph'

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setInspectorTab, setSelectedNode } = useAppStore()
  const { setNodes } = useReactFlow()
  
  // We use useNodes to get the reactive state of the selected node
  const nodes = useNodes()
  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  // Callback to update node data
  const updateNodeData = useCallback(
    (updates: Partial<ServiceNodeData>) => {
      if (!selectedNodeId) return

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            }
          }
          return node
        })
      )
    },
    [selectedNodeId, setNodes]
  )

  if (!selectedNode) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Select a node on the canvas to view details.</p>
      </div>
    )
  }

  const d = selectedNode.data as ServiceNodeData

  // Status Badge Mapping
  const statusConfig = {
    Healthy: { color: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20', icon: CheckCircle2 },
    Degraded: { color: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20', icon: AlertTriangle },
    Down: { color: 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20', icon: AlertCircle },
  }
  const StatusIcon = statusConfig[d.status]?.icon || CheckCircle2

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/10 relative">
        <button 
          onClick={() => setSelectedNode(null)}
          className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center justify-between mb-4 pr-6">
          <h2 className="text-lg font-semibold text-white truncate">{d.label}</h2>
          <Badge className={statusConfig[d.status]?.color} variant="secondary">
            <StatusIcon className="w-3 h-3 mr-1.5" />
            {d.status}
          </Badge>
        </div>

        <Tabs 
          value={activeInspectorTab} 
          onValueChange={(v) => setInspectorTab(v as 'config' | 'runtime')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10">
            <TabsTrigger value="config" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-white text-gray-400">
              Configuration
            </TabsTrigger>
            <TabsTrigger value="runtime" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-white text-gray-400">
              Runtime
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-1">
        {activeInspectorTab === 'config' ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-400">Service Name</Label>
              <Input
                id="name"
                value={d.label}
                onChange={(e) => updateNodeData({ label: e.target.value })}
                className="bg-black/50 border-white/10 text-gray-200 focus-visible:ring-emerald-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-gray-400">Description</Label>
              <Textarea
                id="desc"
                placeholder="Describe this service..."
                className="bg-black/50 border-white/10 text-gray-200 resize-none h-20 focus-visible:ring-emerald-500/50"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <Label className="text-gray-400">Resource Allocation</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={d.sliderValue}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0
                      updateNodeData({ sliderValue: Math.min(100, Math.max(0, val)) })
                    }}
                    className="w-16 h-8 text-right bg-black/50 border-white/10 text-gray-200 focus-visible:ring-emerald-500/50"
                  />
                  <span className="text-gray-500 text-sm">%</span>
                </div>
              </div>
              
              <Slider
                value={[d.sliderValue]}
                min={0}
                max={100}
                step={1}
                onValueChange={([val]) => updateNodeData({ sliderValue: val })}
                className="py-2"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard label="CPU Usage" value={`${(d.cpu * 100).toFixed(1)}%`} />
              <MetricCard label="Memory" value={`${d.memory} GB`} />
              <MetricCard label="Disk Space" value={`${d.disk} GB`} />
              <MetricCard label="Region" value={`us-east-${d.region}`} />
            </div>

            <div className="p-4 bg-black/40 rounded-lg border border-white/5 space-y-2 mt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Hourly Cost</span>
                <span className="text-emerald-400 font-medium">${d.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Monthly Est.</span>
                <span className="text-gray-200 font-medium">${(d.cost * 730).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-black/30 rounded-lg border border-white/5 flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-200">{value}</span>
    </div>
  )
}
