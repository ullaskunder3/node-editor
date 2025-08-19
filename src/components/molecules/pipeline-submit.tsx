"use client";
import React, { useTransition } from "react";
import { usePipelineStore } from "@hooks";
import { Button } from "@atoms";
import { Play, Loader2 } from "lucide-react";
import { parsePipeline } from "@api";
import { analyzePipelineComplexity } from "@lib";

const PipelineSubmit: React.FC = () => {
  const { getPipelineData: getStorePipelineData } = usePipelineStore();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const pipelineData = getStorePipelineData();

    startTransition(async () => {
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
    });
  };

  return (
    <Button onClick={handleSubmit} disabled={isPending}>
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Play className="mr-2 h-4 w-4" />
      )}
      {isPending ? "Running..." : "Run Pipeline"}
    </Button>
  );
};

export { PipelineSubmit };
