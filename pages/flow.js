import React, { useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow'

import Zapier from '../public/zapier.svg'

import 'reactflow/dist/style.css'
import { Icon, Menu } from '../components'

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Video uploaded',
    },
    position: { x: 400, y: 0 },
  },
  {
    id: '1b',
    data: {
      label: 'Send "Application to rate!" to team members',
    },
    position: { x: 400, y: 130 },
  },
  {
    id: '2',
    data: {
      label: (
        <p className="flex">
          <span>Most of team members voted</span>
          <Icon name="HiThumbDown" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 100, y: 300 },
  },
  {
    id: '3',
    data: {
      label: (
        <p className="flex">
          <span>Most of team members voted</span>
          <Icon name="HiThumbUp" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 400, y: 300 },
  },
  {
    id: '4',
    data: {
      label: (
        <p className="flex">
          <span>Same Votes</span>
          <Icon name="HiThumbDown" size={50} className="text-black" />,
          <Icon name="HiThumbUp" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 700, y: 300 },
  },
  {
    id: '5',
    data: {
      label: 'Notify team members "the candidate is disqualified"',
    },
    position: { x: 100, y: 450 },
  },
  {
    id: '6a',
    data: {
      label: 'Wait 2 days',
    },
    position: { x: 0, y: 600 },
  },
  {
    id: '6b',
    data: {
      label: 'Member clicked "re rate"',
    },
    position: { x: 200, y: 600 },
  },
  {
    id: '7',
    data: {
      label:
        'Send email "Thank you for your application to the ..." to candidate',
    },
    position: { x: 100, y: 750 },
  },
  {
    id: '8',
    data: {
      label: 'Notify team members "New qualified candidate!"',
    },
    position: { x: 400, y: 450 },
  },
  {
    id: '9',
    data: {
      label: (
        <div className="flex flex-col justify-center items-center">
          <p className="mb-2">Configure this step</p>
          <Zapier width={60} height={30} />
        </div>
      ),
    },
    position: { x: 400, y: 600 },
  },
  {
    id: '10',
    data: {
      label: 'Notify team members "the candidate has to be revoted"',
    },
    position: { x: 700, y: 450 },
  },
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '1b', animated: true },
  { id: 'e1-2', source: '1b', target: '2', animated: true },
  { id: 'e1-3', source: '1b', target: '3', animated: true },
  { id: 'e1-4', source: '1b', target: '4', animated: true },
  { id: 'e1-5', source: '2', target: '5', animated: true },
  { id: 'e1-6', source: '5', target: '6a', animated: true },
  { id: 'e1-7', source: '5', target: '6b', animated: true },
  { id: 'e1-8', source: '6b', target: '1b', animated: true },
  { id: 'e1-9', source: '6a', target: '7', animated: true },
  { id: 'e1-10', source: '10', target: '1b', animated: true },
  { id: 'e1-11', source: '3', target: '8', animated: true },
  { id: 'e1-12', source: '8', target: '9', animated: true },
  { id: 'e1-13', source: '4', target: '10', animated: true },
]

const onInit = (reactFlowInstance) =>
  console.log('flow loaded:', reactFlowInstance)

const Settings = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data
        .selects[edge.sourceHandle]
      edge.type = edgeType
    }

    return edge
  })

  return (
    <div className="flex flex-1 flex-col w-full items-center md:pl-[70px]">
      <Menu />

      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  )
}

export default Settings