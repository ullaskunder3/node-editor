"use client";
import React from "react";
import { usePipelineStore } from "@hooks";
import { Button } from "@atoms";
import { Play } from "lucide-react";
import { parsePipeline } from "@api";
import { analyzePipelineComplexity } from "@lib";

const PipelineSubmit: React.FC = () => {
  const { getPipelineData: getStorePipelineData } = usePipelineStore();

  const handleSubmit = async () => {
    const pipelineData = getStorePipelineData();
    try {
      console.log("getPipelineData", pipelineData);
      const response = await parsePipeline(pipelineData);
      const complexity = analyzePipelineComplexity(pipelineData);
      alert(`
        Pipeline Analysis:
        Nodes: ${response.num_nodes}
        Edges: ${response.num_edges}
        Is DAG: ${response.is_dag}
        Complexity: ${complexity.complexity}
        Message: ${response.message}
      `);
    } catch (error: any) {
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <Button onClick={handleSubmit}>
      <Play className="mr-2 h-4 w-4" />
      Run Pipeline
    </Button>
  );
};

export { PipelineSubmit };
