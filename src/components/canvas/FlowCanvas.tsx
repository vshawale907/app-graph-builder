import { useEffect, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AlertCircle, RefreshCw } from 'lucide-react'

import { useAppStore } from '@/store/useAppStore'
import { useAppGraph } from '@/hooks/useAppGraph'
import { ServiceNode } from './ServiceNode'
import { Button } from '@/components/ui/button'

const nodeTypes = {
  service: ServiceNode,
}

export function FlowCanvas() {
  const { selectedAppId, setSelectedNode } = useAppStore()
  const { data, isLoading, isError, refetch, isFetching } = useAppGraph(selectedAppId)

  const [nodes, setNodes, onNodesChange] = useNodesState<import('@xyflow/react').Node<import('@/hooks/useAppGraph').ServiceNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<import('@xyflow/react').Edge>([])

  // Re-initialize graph when new data arrives
  useEffect(() => {
    if (data) {
      setNodes(data.nodes)
      setEdges(data.edges)
      // Clear selection when data changes
      setSelectedNode(null)
    }
  }, [data, setNodes, setEdges, setSelectedNode])

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  if (!selectedAppId) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4">
        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-700 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-800 rounded-lg animate-pulse" />
        </div>
        <p>Select an application to view its graph</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-gray-400 font-medium">Loading infrastructure graph...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <h3 className="text-lg font-semibold text-red-200">Failed to load graph</h3>
          <p className="text-sm text-red-300/80 mb-2">
            The server encountered an error while retrieving the infrastructure layout for {selectedAppId}.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* Dimmed overlay when refetching silently in background */}
      {isFetching && !isLoading && (
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#0d0d0d]"
        deleteKeyCode={['Backspace', 'Delete']}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#333"
        />
        <Controls
          className="bg-[#1a1a1a] border-white/10 fill-white text-white"
        />
        <MiniMap
          nodeColor="#10b981"
          maskColor="rgba(0, 0, 0, 0.6)"
          className="bg-[#111] border border-white/10 rounded-lg overflow-hidden"
        />
      </ReactFlow>
    </div>
  )
}
