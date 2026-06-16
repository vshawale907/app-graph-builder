import { ReactFlowProvider } from '@xyflow/react'
import { MainLayout } from '@/components/layout/MainLayout'
import { FlowCanvas } from '@/components/canvas/FlowCanvas'
import { AppsList } from '@/components/inspector/AppsList'
import { NodeInspector } from '@/components/inspector/NodeInspector'

function App() {
  return (
    // ReactFlowProvider enables hooks like useReactFlow anywhere inside the app
    <ReactFlowProvider>
      <MainLayout
        canvas={<FlowCanvas />}
        appsList={<AppsList />}
        nodeInspector={<NodeInspector />}
      />
    </ReactFlowProvider>
  )
}

export default App
