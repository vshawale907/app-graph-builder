import { create } from 'zustand'

interface AppStore {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: 'config' | 'runtime'
  theme: 'light' | 'dark'
  setSelectedApp: (id: string) => void
  setSelectedNode: (id: string | null) => void
  toggleMobilePanel: () => void
  setInspectorTab: (tab: 'config' | 'runtime') => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>((set) => {
  // Initialize dark mode if not present
  if (!document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
  }

  return {
    selectedAppId: null,
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: 'config',
    theme: 'dark',
    setSelectedApp: (id) => set({ selectedAppId: id, selectedNodeId: null }), // Reset node when app changes
    setSelectedNode: (id) => set({ selectedNodeId: id, isMobilePanelOpen: !!id }), // Open panel on mobile when node selected
    toggleMobilePanel: () => set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
    setInspectorTab: (tab) => set({ activeInspectorTab: tab }),
    toggleTheme: () => set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme }
    })
  }
})
