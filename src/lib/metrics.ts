import type { PipelineData } from "@types";

export const analyzePipelineComplexity = (pipelineData: PipelineData) => {
  const { nodes, edges } = pipelineData;

  // Calculate various metrics
  const nodeTypes = new Set(nodes.map((node) => node.type));
  const avgConnectionsPerNode =
    nodes.length > 0 ? edges.length / nodes.length : 0;

  // Find source and sink nodes
  const sourceNodes = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id)
  );
  const sinkNodes = nodes.filter(
    (node) => !edges.some((edge) => edge.source === node.id)
  );

  return {
    uniqueNodeTypes: nodeTypes.size,
    avgConnectionsPerNode: Math.round(avgConnectionsPerNode * 100) / 100,
    sourceNodes: sourceNodes.length,
    sinkNodes: sinkNodes.length,
    complexity: calculateComplexityScore(
      nodes.length,
      edges.length,
      nodeTypes.size
    ),
  };
};

function calculateComplexityScore(
  nodeCount: number,
  edgeCount: number,
  typeCount: number
): "Low" | "Medium" | "High" {
  const score = nodeCount + edgeCount * 0.5 + typeCount * 2;

  if (score < 10) return "Low";
  if (score < 25) return "Medium";
  return "High";
}
