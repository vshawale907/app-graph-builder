import { useQuery } from '@tanstack/react-query'

export type AppData = {
  id: string
  name: string
  color: string
}

export function useApps() {
  return useQuery<AppData[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const res = await fetch('/api/apps')
      if (!res.ok) throw new Error('Failed to fetch apps')
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
