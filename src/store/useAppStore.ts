import { create } from 'zustand'

interface AppStore {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: 'config' | 'runtime'
  setSelectedApp: (id: string) => void
  setSelectedNode: (id: string | null) => void
  toggleMobilePanel: () => void
  setInspectorTab: (tab: 'config' | 'runtime') => void
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedApp: (id) => set({ selectedAppId: id, selectedNodeId: null }), // Reset node when app changes
  setSelectedNode: (id) => set({ selectedNodeId: id, isMobilePanelOpen: !!id }), // Open panel on mobile when node selected
  toggleMobilePanel: () => set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}))
