import React, { useCallback } from 'react';
import { withAuth } from '@/hocs';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ButtonIcon, Icon, Menu } from '../../components';

import Zapier from '../../public/zapier.svg';

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Video uploaded',
    },
    position: { x: 400, y: 0 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '1b',
    data: {
      label: 'Start rating',
    },
    position: { x: 400, y: 130 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '2',
    data: {
      label: (
        <p className="flex items-center">
          <ButtonIcon
            name="HiCog"
            size={30}
            className="absolute -top-8 -right-8 text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out"
          />
          <span>Most of team members downvoted</span>
          <Icon name="HiThumbDown" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 100, y: 300 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '3',
    data: {
      label: (
        <p className="flex items-center">
          <ButtonIcon
            name="HiCog"
            size={30}
            className="absolute -top-8 -right-8 text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out"
          />
          <span>Most of team members upvoted</span>
          <Icon name="HiThumbUp" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 400, y: 300 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '4',
    data: {
      label: (
        <p className="flex items-center">
          <span>Stale votes</span>
          <Icon name="HiThumbDown" size={50} className="text-black" />,
          <Icon name="HiThumbUp" size={50} className="text-black" />,
        </p>
      ),
    },
    position: { x: 700, y: 300 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '6a',
    data: {
      label: (
        <p>
          Wait 2 days
          <ButtonIcon
            name="HiCog"
            size={30}
            className="absolute -top-8 -right-8 text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out"
          />
        </p>
      ),
    },
    position: { x: 0, y: 450 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '6b',
    data: {
      label: 'Member clicked "re rate"',
    },
    position: { x: 200, y: 450 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '7',
    data: {
      label: (
        <p>
          Send email "Thank you for your application to the ..." to candidate
          <ButtonIcon
            name="HiCog"
            size={30}
            className="absolute -top-8 -right-8 text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out"
          />
        </p>
      ),
    },
    position: { x: 100, y: 600 },
    style: {
      borderColor: '#bb86fc',
    },
  },
  {
    id: '9',
    data: {
      label: (
        <div className="flex flex-col justify-center items-center">
          <p className="mb-2">Configure this step</p>
          <ButtonIcon
            name="HiCog"
            size={30}
            className="absolute -top-8 -right-8 text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out"
          />
          <Zapier width={60} height={30} />
        </div>
      ),
    },
    position: { x: 400, y: 450 },
    style: {
      borderColor: '#bb86fc',
    },
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '1b', animated: true },
  { id: 'e1-2', source: '1b', target: '2', animated: true },
  { id: 'e1-3', source: '1b', target: '3', animated: true },
  { id: 'e1-4', source: '1b', target: '4', animated: true },
  { id: 'e1-6', source: '2', target: '6a', animated: true },
  { id: 'e1-6', source: '2', target: '6b', animated: true },
  { id: 'e1-8', source: '6b', target: '1b', animated: true },
  { id: 'e1-9', source: '6a', target: '7', animated: true },
  { id: 'e1-10', source: '4', target: '1b', animated: true },
  { id: 'e1-12', source: '3', target: '9', animated: true },
];

const onInit = (reactFlowInstance) =>
  console.log('flow loaded:', reactFlowInstance);

const Settings = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

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
  );
};

export default withAuth(Settings);
