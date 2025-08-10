import React from "react";
import { nodeConfigs } from "./node-configs";
import { EnhancedTextNode } from "../components/molecules/enhanced-text-node";
import { BaseNode } from "../components/molecules/base-node";
interface NodeFactoryProps {
  id: string;
  data: any;
  type: string;
}

export const NodeFactory: React.FC<NodeFactoryProps> = ({ id, data, type }) => {
  // Special handling for enhanced text node
  if (type === "text") {
    return <EnhancedTextNode id={id} data={data} />;
  }

  // Use base node with configuration for other types
  const config = nodeConfigs[type];
  if (!config) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <p className="text-red-600 text-sm">Unknown node type: {type}</p>
      </div>
    );
  }

  return <BaseNode id={id} data={data} config={config} />;
};

// Export individual node components for backward compatibility
export const InputNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="customInput" />
);
export const OutputNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="customOutput" />
);
export const LLMNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="llm" />
);
export const TextNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="text" />
);
export const CalculatorNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="calculator" />
);
export const DatabaseNode = (props: NodeFactoryProps) => (
  <NodeFactory {...props} type="database" />
);
