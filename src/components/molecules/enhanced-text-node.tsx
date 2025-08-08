import React, { useState, useCallback, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, Textarea, CardHeader, CardContent, Badge } from "@atoms";
import { Type } from "lucide-react";

interface EnhancedTextNodeProps {
  id: string;
  data: any;
  onDataChange?: (field: string, value: any) => void;
}

export const EnhancedTextNode: React.FC<EnhancedTextNodeProps> = ({
  id,
  data,
  onDataChange,
}) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 250, height: 120 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Extract variables from text using regex
  const extractVariables = useCallback((text: string) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches: any[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }

    return matches;
  }, []);

  // Auto-resize functionality
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to get accurate scrollHeight
      textarea.style.height = "auto";

      // Calculate new dimensions
      const newHeight = Math.max(
        120,
        Math.min(400, textarea.scrollHeight + 60)
      );
      const textLength = text.length;
      const newWidth = Math.max(
        250,
        Math.min(500, 250 + Math.floor(textLength / 20) * 10)
      );

      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [text]);

  // Handle text changes
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);
      onDataChange?.("text", newText);

      // Extract variables and update handles
      const newVariables = extractVariables(newText);
      setVariables(newVariables);

      // Auto-resize
      setTimeout(autoResize, 0);
    },
    [extractVariables, autoResize, onDataChange]
  );

  // Initial setup
  useEffect(() => {
    const initialVariables = extractVariables(text);
    setVariables(initialVariables);
    autoResize();
  }, [text, extractVariables, autoResize]);

  return (
    <Card
      className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Dynamic variable handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${30 + index * 25}px`,
            backgroundColor: "#8b5cf6",
            borderColor: "#7c3aed",
          }}
          className="w-3 h-3"
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 bg-blue-500 border-blue-600"
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
        <div className="space-y-2">
          {/* TODO: ref error need to check */}
          <Textarea
            //@ts-ignore
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text with variables like {{input}}"
            className="min-h-[60px] text-xs resize-none border-purple-200 focus:border-purple-400"
            style={{ height: dimensions.height - 80 }}
          />

          {variables.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {variables.map((variable) => (
                <Badge
                  key={variable}
                  variant="outline"
                  className="text-xs bg-purple-100 text-purple-700"
                >
                  {variable}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
