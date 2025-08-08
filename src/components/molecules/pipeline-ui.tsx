"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  MarkerType,
  useReactFlow,
  ConnectionLineType,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Card } from "@atoms";
import { usePipelineStore } from "@hooks";
import { NodeFactory } from "@nodes";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: NodeFactory,
  llm: NodeFactory,
  customOutput: NodeFactory,
  text: NodeFactory,
  calculator: NodeFactory,
  database: NodeFactory,
  filter: NodeFactory,
  transformer: NodeFactory,
  analytics: NodeFactory,
};

export const PipelineUI: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  type PipelineNodeData = { id: string; nodeType: string };

  const [nodes, setNodes, onNodesChange] = useNodesState<
    Node<PipelineNodeData>
  >([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodeIdCounter, setNodeIdCounter] = useState<Record<string, number>>(
    {}
  );
  const { setNodes: setStoreNodes, setEdges: setStoreEdges } =
    usePipelineStore();
  const { screenToFlowPosition } = useReactFlow();

  const getNodeID = useCallback(
    (type: string) => {
      const newCounters = { ...nodeIdCounter };
      if (newCounters[type] === undefined) {
        newCounters[type] = 0;
      }
      newCounters[type] += 1;
      setNodeIdCounter(newCounters);
      return `${type}-${newCounters[type]}`;
    },
    [nodeIdCounter]
  );

  const getInitNodeData = useCallback((nodeID: string, type: string) => {
    return { id: nodeID, nodeType: type };
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep" as ConnectionLineType,
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: 20,
              width: 20,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      if (!data) return;

      try {
        const appData = JSON.parse(data);
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error("Error parsing drag data:", error);
      }
    },
    [screenToFlowPosition, getNodeID, getInitNodeData, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Sync with store
  useEffect(() => {
    setStoreNodes(nodes);
  }, [nodes, setStoreNodes]);

  useEffect(() => {
    setStoreEdges(edges);
  }, [edges, setStoreEdges]);

  return (
    <Card className="shadow-lg h-full w-full">
      <div
        ref={reactFlowWrapper}
        className="h-full w-full rounded-xl shadow-lg bg-white"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapToGrid={true}
          snapGrid={[gridSize, gridSize]}
          // connectionLineType="smoothstep"
          connectionLineType={ConnectionLineType.SmoothStep}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: 20,
              width: 20,
            },
          }}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
        >
          <Background
            size={1}
            variant={BackgroundVariant.Dots}
            color="black"
            gap={gridSize}
          />
          <Controls className="bg-white shadow-lg rounded-lg" />
          <MiniMap
            className="bg-white shadow-lg rounded-lg"
            nodeColor={(node) => {
              switch (node.type) {
                case "customInput":
                  return "#10b981";
                case "customOutput":
                  return "#ef4444";
                case "llm":
                  return "#8b5cf6";
                case "text":
                  return "#ec4899";
                case "calculator":
                  return "#f59e0b";
                case "database":
                  return "#06b6d4";
                case "filter":
                  return "#84cc16";
                case "transformer":
                  return "#ec4899";
                case "analytics":
                  return "#6366f1";
                default:
                  return "#6b7280";
              }
            }}
          />
        </ReactFlow>
      </div>
    </Card>
  );
};
