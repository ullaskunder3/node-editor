import React, { useState, useCallback, useEffect, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { Card, Textarea, CardHeader, CardContent, Badge } from "@atoms";
import { Type } from "lucide-react";

interface EnhancedTextNodeProps {
  id: string;
  data: { text?: string };
}

export const EnhancedTextNode: React.FC<EnhancedTextNodeProps> = ({
  id,
  data,
}) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState<string[]>([]);
  const [size, setSize] = useState({ width: 250 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const extractVariables = useCallback((value: string) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const uniqueVars: string[] = [];
    let match;
    while ((match = regex.exec(value)) !== null) {
      if (!uniqueVars.includes(match[1])) {
        uniqueVars.push(match[1]);
      }
    }
    return uniqueVars;
  }, []);

  const autoResize = useCallback(() => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "auto";

    setSize((prev) => ({
      width: prev.width,
    }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);

      const newVars = extractVariables(value);
      setVariables(newVars);

      // Ensure handles reposition after DOM updates
      setTimeout(autoResize, 0);
    },
    [autoResize, extractVariables]
  );

  // Initial setup
  useEffect(() => {
    setVariables(extractVariables(text));
    setTimeout(autoResize, 0);
    updateNodeInternals(id);
  }, [text, extractVariables, autoResize]);

  return (
    <Card
      className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50"
      style={{ width: size.width }}
    >
      {/* Dynamic variable handles */}
      {variables.map((v, i) => (
        <Handle
          key={`${id}-${v}`}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            top: `${30 + i * 25}px`,
            backgroundColor: "#8b5cf6",
            borderColor: "#7c3aed",
          }}
          className="w-5 h-5"
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-5 h-5 bg-blue-500 border-blue-600"
      />

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-purple-600" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Enhanced Text</h3>
            <p className="text-xs text-gray-500">Dynamic text with variables</p>
          </div>
          <Badge
            variant="secondary"
            className="text-xs bg-purple-100 text-purple-700"
          >
            Text
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Enter text like {{input}}"
          className="min-h-[60px] text-xs resize-none border-purple-200 focus:border-purple-400"
        />
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 max-w-full">
            {variables.map((v) => (
              <Badge
                key={`badge-${id}-${v}`}
                variant="outline"
                className="text-xs bg-purple-100 text-purple-700 break-all max-w-full"
              >
                {v}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
