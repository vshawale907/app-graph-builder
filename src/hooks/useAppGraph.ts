import { useQuery } from '@tanstack/react-query'
import type { Node, Edge } from '@xyflow/react'

export type ServiceNodeData = {
  label: string
  status: 'Healthy' | 'Degraded' | 'Down'
  cpu: number
  memory: number
  disk: number
  region: number
  sliderValue: number
  cost: number
}

export type AppGraphData = {
  nodes: Node<ServiceNodeData>[]
  edges: Edge[]
}

export function useAppGraph(appId: string | null) {
  return useQuery<AppGraphData>({
    queryKey: ['appGraph', appId],
    queryFn: async () => {
      const res = await fetch(`/api/apps/${appId}/graph`)
      if (!res.ok) throw new Error('Failed to fetch graph data')
      return res.json()
    },
    enabled: !!appId, // Only fetch if we have an appId
    staleTime: 0, // Always fetch fresh graph data when switching apps
  })
}
