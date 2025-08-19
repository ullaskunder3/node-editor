import {
  Download,
  Upload,
  Brain,
  Calculator,
  Database,
  // Filter,
  // Shuffle,
  // BarChart3,
  // MessageSquare,
} from "lucide-react";
import { Position } from "@xyflow/react";
import type { BaseNodeConfig } from "@types";

export const nodeConfigs: Record<string, BaseNodeConfig> = {
  customInput: {
    title: "Input",
    description: "Data input node",
    color: "#10b981",
    icon: <Upload className="w-4 h-4 text-green-600" />,
    handles: [
      {
        id: "output",
        type: "source",
        position: Position.Right,
      },
    ],
    fields: [
      {
        key: "inputName",
        label: "Name",
        type: "text",
        defaultValue: "input_1",
        placeholder: "Enter input name",
      },
      {
        key: "inputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
          { value: "Number", label: "Number" },
          { value: "Boolean", label: "Boolean" },
        ],
      },
    ],
  },

  customOutput: {
    title: "Output",
    description: "Data output node",
    color: "#ef4444",
    icon: <Download className="w-4 h-4 text-red-600" />,
    handles: [
      {
        id: "input",
        type: "target",
        position: Position.Left,
      },
    ],
    fields: [
      {
        key: "outputName",
        label: "Name",
        type: "text",
        defaultValue: "output_1",
        placeholder: "Enter output name",
      },
      {
        key: "outputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "Image", label: "Image" },
          { value: "File", label: "File" },
        ],
      },
    ],
  },

  llm: {
    title: "LLM",
    description: "Large Language Model",
    color: "#8b5cf6",
    icon: <Brain className="w-4 h-4 text-purple-600" />,
    handles: [
      {
        id: "system",
        type: "target",
        position: Position.Left,
        style: { top: "33%" },
      },
      {
        id: "prompt",
        type: "target",
        position: Position.Left,
        style: { top: "66%" },
      },
      {
        id: "response",
        type: "source",
        position: Position.Right,
      },
    ],
    fields: [
      {
        key: "model",
        label: "Model",
        type: "select",
        defaultValue: "gpt-3.5-turbo",
        options: [
          { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
          { value: "gpt-4", label: "GPT-4" },
          { value: "claude-3", label: "Claude 3" },
        ],
      },
      {
        key: "temperature",
        label: "Temperature",
        type: "number",
        defaultValue: 0.7,
        placeholder: "0.0 - 1.0",
      },
    ],
  },

  // new node
  calculator: {
    title: "Calculator",
    description: "Mathematical operations",
    color: "#f59e0b",
    icon: <Calculator className="w-4 h-4 text-amber-600" />,
    handles: [
      {
        id: "input1",
        type: "target",
        position: Position.Left,
        style: { top: "25%" },
      },
      {
        id: "input2",
        type: "target",
        position: Position.Left,
        style: { top: "75%" },
      },
      {
        id: "result",
        type: "source",
        position: Position.Right,
      },
    ],
    fields: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "add",
        options: [
          { value: "add", label: "Add (+)" },
          { value: "subtract", label: "Subtract (-)" },
          { value: "multiply", label: "Multiply (×)" },
          { value: "divide", label: "Divide (÷)" },
        ],
      },
    ],
  },

  database: {
    title: "Database",
    description: "Database operations",
    color: "#06b6d4",
    icon: <Database className="w-4 h-4 text-cyan-600" />,
    handles: [
      {
        id: "query",
        type: "target",
        position: Position.Left,
        style: { top: "33%" },
      },
      {
        id: "params",
        type: "target",
        position: Position.Left,
        style: { top: "66%" },
      },
      {
        id: "result",
        type: "source",
        position: Position.Right,
      },
    ],
    fields: [
      {
        key: "connection",
        label: "Connection",
        type: "text",
        defaultValue: "postgresql://localhost:5432/db",
        placeholder: "Database connection string",
      },
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "select",
        options: [
          { value: "select", label: "SELECT" },
          { value: "insert", label: "INSERT" },
          { value: "update", label: "UPDATE" },
          { value: "delete", label: "DELETE" },
        ],
      },
    ],
  },
};
