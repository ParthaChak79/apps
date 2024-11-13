import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface MECEFlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

const nodeTypes = {
  input: ({ data }: { data: { label: string } }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold min-w-[200px] text-center">
      {data.label}
    </div>
  ),
  default: ({ data }: { data: { label: string } }) => (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-gray-200 min-w-[180px] text-center">
      {data.label}
    </div>
  ),
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2 },
  type: 'smoothstep',
  animated: true,
  markerEnd: {
    type: 'arrowclosed',
    color: '#6B7280',
  },
};

export const MECEFlow: React.FC<MECEFlowProps> = ({ initialNodes, initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance: any) => {
    reactFlowInstance.fitView({ padding: 0.2 });
  }, []);

  const handleResetView = useCallback((instance: any) => {
    instance.fitView({ padding: 0.2 });
  }, []);

  return (
    <div className="h-[600px] w-full bg-gray-50 rounded-lg shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        attributionPosition="bottom-right"
      >
        <Background color="#6B7280" gap={16} />
        <Controls />
        <MiniMap 
          nodeStrokeColor="#666"
          nodeColor="#fff"
          nodeBorderRadius={12}
        />
        <Panel position="top-right">
          <button
            onClick={(event) => {
              const instance = (event.target as any)?.closest('.react-flow')
                ?._reactFlowInstance;
              if (instance) {
                handleResetView(instance);
              }
            }}
            className="px-3 py-1 bg-white rounded shadow hover:bg-gray-50 text-sm"
          >
            Reset View
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};