import { http, delay, HttpResponse } from 'msw'

const APPS = [
  { id: 'supertokens-golang', name: 'supertokens-golang', color: '#00add8' },
  { id: 'supertokens-java', name: 'supertokens-java', color: '#b07219' },
  { id: 'supertokens-python', name: 'supertokens-python', color: '#3572A5' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', color: '#701516' },
  { id: 'supertokens-go', name: 'supertokens-go', color: '#00add8' },
]

const GRAPH_DATA = {
  nodes: [
    {
      id: 'node-postgres',
      type: 'service',
      position: { x: 250, y: 100 },
      data: {
        label: 'Postgres',
        status: 'Healthy',
        cpu: 0.02,
        memory: 0.05,
        disk: 10.0,
        region: 1,
        sliderValue: 80,
        cost: 0.03,
      },
    },
    {
      id: 'node-redis',
      type: 'service',
      position: { x: 500, y: 100 },
      data: {
        label: 'Redis',
        status: 'Healthy',
        cpu: 0.01,
        memory: 0.02,
        disk: 0.0,
        region: 1,
        sliderValue: 20,
        cost: 0.01,
      },
    },
    {
      id: 'node-mongodb',
      type: 'service',
      position: { x: 375, y: 300 },
      data: {
        label: 'MongoDB',
        status: 'Healthy',
        cpu: 0.04,
        memory: 0.1,
        disk: 50.0,
        region: 1,
        sliderValue: 60,
        cost: 0.08,
      },
    },
  ],
  edges: [
    { id: 'e-pg-mongo', source: 'node-postgres', target: 'node-mongodb' },
    { id: 'e-redis-mongo', source: 'node-redis', target: 'node-mongodb' },
  ],
}

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(600)
    return HttpResponse.json(APPS)
  }),

  http.get('/api/apps/:appId/graph', async ({ params }) => {
    const { appId } = params
    await delay(600)

    if (appId === 'supertokens-python') {
      // 30% chance to fail
      if (Math.random() < 0.3) {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error',
        })
      }
      
      // If it doesn't fail, simulate a degraded state for one of the nodes just for flavor
      const pythonGraph = JSON.parse(JSON.stringify(GRAPH_DATA))
      pythonGraph.nodes[0].data.status = 'Degraded'
      pythonGraph.nodes[0].data.sliderValue = 40
      return HttpResponse.json(pythonGraph)
    }

    return HttpResponse.json(GRAPH_DATA)
  }),
]
