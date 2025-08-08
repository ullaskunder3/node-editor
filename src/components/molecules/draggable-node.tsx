import { Badge, Card } from "@atoms";
import React from "react";

interface DraggableNodeProps {
  type: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({
  type,
  label,
  icon,
  color = "#6366f1",
  description,
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.cursor = "grab";
  };

  return (
    <Card
      className="cursor-grab hover:shadow-md transition-all duration-200 hover:scale-105 border-2"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <div className="p-3 flex flex-col items-center gap-2 min-w-[100px]">
        <div className="flex items-center gap-2">
          {icon}
          <Badge
            variant="secondary"
            style={{ backgroundColor: color, color: "white" }}
          >
            {label}
          </Badge>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground text-center">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};
