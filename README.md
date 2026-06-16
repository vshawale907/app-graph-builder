# App Graph Builder

A modern, responsive cloud infrastructure dashboard UI built as a take-home frontend assignment. It visualizes service dependencies using an interactive canvas and provides a synced inspector to manage configuration and runtime metrics.

## 🚀 Tech Stack

- **Framework**: React 19 + Vite + TypeScript (Strict Mode)
- **State Management**: Zustand v5
- **Data Fetching**: TanStack Query v5
- **Canvas/Graph**: ReactFlow (`@xyflow/react`)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Mocking**: MSW (Mock Service Worker)
- **Code Quality**: ESLint (Flat Config) + Prettier

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vshawale907/app-graph-builder.git
   cd app-graph-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`. MSW will automatically intercept API requests and serve mocked data.

## 📐 Architecture & Key Decisions

- **Zustand over Context API**: Used Zustand for global UI state (selected app, selected node, mobile panel state) to avoid prop-drilling and re-render cascades. Selectors ensure that components only re-render when the specific slice of state they care about changes.
- **TanStack Query + MSW**: Real-world apps need robust data fetching. TanStack Query handles caching, stale states, and automatic background refetches. MSW intercepts at the network layer, providing a hyper-realistic environment (including simulated 600ms latency and a 30% failure rate on specific endpoints to test error boundaries) without needing a real backend.
- **Custom ReactFlow Nodes**: Instead of keeping node data in a separate store and trying to sync it with ReactFlow, we lean into ReactFlow's architecture by storing all UI-specific data inside the `data` prop of each node. The `NodeInspector` uses `useReactFlow().setNodes` to mutate this state, ensuring the canvas and the inspector are always in perfect sync.
- **Unstyled Primitives (shadcn/ui)**: Using Radix UI primitives via shadcn allows for rapid development of accessible components (Tabs, Sliders, Sheets) while retaining complete control over the dark theme aesthetics via Tailwind.

## ⚠️ Known Limitations

- **Local State Only**: Changes made in the Node Inspector (like dragging the resource slider or renaming a service) only persist in the local ReactFlow state. Switching apps or refreshing the page will reset the data to the MSW mock defaults.
- **Mocked Edges**: The "Add Node" functionality drops a new node onto the canvas, but it does not automatically draw edges to existing nodes.
- **Responsive Canvas**: While the app shell and inspector are fully responsive (using a slide-over drawer on mobile), manipulating the complex graph canvas on very small touch screens can be tricky.
