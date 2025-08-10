import type { Position } from "reactflow";

export interface NodeHandle {
  id: string;
  type: "source" | "target";
  position: Position;
  label?: string;
  style?: React.CSSProperties;
}

export interface NodeField {
  key: string;
  label: string;
  type: "text" | "select" | "textarea" | "number";
  defaultValue?: any;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface BaseNodeConfig {
  title: string;
  description?: string;
  color: string;
  icon?: React.ReactNode;
  handles: NodeHandle[];
  fields: NodeField[];
  minWidth?: number;
  minHeight?: number;
  customContent?: (props: any) => React.ReactNode;
}

export interface BaseNodeProps {
  id: string;
  data: any;
  config: BaseNodeConfig;
  onDataChange?: (field: string, value: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface PipelineData {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: any;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }>;
}

export interface PipelineResponse {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
  message?: string;
}
