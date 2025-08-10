import React from "react";
import { DraggableNode } from "./draggable-node";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms";
import {
  Upload,
  Download,
  Brain,
  Type,
  Calculator,
  Database,
} from "lucide-react";

export const PipelineToolbar: React.FC = () => {
  const nodeTypes = [
    {
      type: "customInput",
      label: "Input",
      icon: <Upload className="w-4 h-4" />,
      color: "#10b981",
      description: "Data input",
    },
    {
      type: "customOutput",
      label: "Output",
      icon: <Download className="w-4 h-4" />,
      color: "#ef4444",
      description: "Data output",
    },
    {
      type: "llm",
      label: "LLM",
      icon: <Brain className="w-4 h-4" />,
      color: "#8b5cf6",
      description: "Language model",
    },
    {
      type: "text",
      label: "Text",
      icon: <Type className="w-4 h-4" />,
      color: "#ec4899",
      description: "Enhanced text with variables",
    },
    {
      type: "calculator",
      label: "Calculator",
      icon: <Calculator className="w-4 h-4" />,
      color: "#f59e0b",
      description: "Math operations",
    },
    {
      type: "database",
      label: "Database",
      icon: <Database className="w-4 h-4" />,
      color: "#06b6d4",
      description: "Database queries",
    },
  ];

  return (
    <Card className="shadow-lg max-h-screen overflow-y-auto px-5 h-full">
      <CardHeader className="!pl-0">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Node Palette
        </CardTitle>
      </CardHeader>
      <CardContent className="!p-0">
        <div className="grid grid-cols-1 gap-4">
          {nodeTypes.map((nodeType) => (
            <DraggableNode
              key={nodeType.type}
              type={nodeType.type}
              label={nodeType.label}
              icon={nodeType.icon}
              color={nodeType.color}
              description={nodeType.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
