import React, { useState, useCallback, useMemo } from "react";
import { Handle } from "@xyflow/react";
import type { BaseNodeProps, NodeField } from "@types";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Input,
  Label,
  Select,
  Textarea,
} from "@atoms";

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  data,
  config,
  onDataChange,
  className = "",
  style = {},
}) => {
  const [localData, setLocalData] = useState(() => {
    const initialData = { ...data };
    config.fields.forEach((field) => {
      if (initialData[field.key] === undefined) {
        initialData[field.key] = field.defaultValue || "";
      }
    });
    return initialData;
  });

  const handleFieldChange = useCallback(
    (field: string, value: any) => {
      setLocalData((prev: any) => ({ ...prev, [field]: value }));
      onDataChange?.(field, value);
    },
    [onDataChange]
  );

  const nodeStyle = useMemo(
    () => ({
      minWidth: config.minWidth || 200,
      minHeight: config.minHeight || 120,
      ...style,
    }),
    [config.minWidth, config.minHeight, style]
  );

  const renderField = (field: NodeField) => {
    const value = localData[field.key] || field.defaultValue || "";

    switch (field.type) {
      case "select":
        return (
          <div key={field.key} className="space-y-1">
            <Label
              htmlFor={`${id}-${field.key}`}
              className="text-xs font-medium"
            >
              {field.label}
            </Label>
            <Select
              value={value}
              onValueChange={(val) => handleFieldChange(field.key, val)}
              options={field.options || []} // Pass options directly
              placeholder={field.placeholder}
              triggerClassName="h-8 text-xs" // Apply trigger specific styles
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.key} className="space-y-1">
            <Label
              htmlFor={`${id}-${field.key}`}
              className="text-xs font-medium"
            >
              {field.label}
            </Label>
            <Textarea
              id={`${id}-${field.key}`}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="min-h-[60px] text-xs resize-none"
            />
          </div>
        );

      case "number":
        return (
          <div key={field.key} className="space-y-1">
            <Label
              htmlFor={`${id}-${field.key}`}
              className="text-xs font-medium"
            >
              {field.label}
            </Label>
            <Input
              id={`${id}-${field.key}`}
              type="number"
              value={value}
              onChange={(e) =>
                handleFieldChange(field.key, parseFloat(e.target.value) || 0)
              }
              placeholder={field.placeholder}
              className="h-8 text-xs"
            />
          </div>
        );

      default:
        return (
          <div key={field.key} className="space-y-1">
            <Label
              htmlFor={`${id}-${field.key}`}
              className="text-xs font-medium"
            >
              {field.label}
            </Label>
            <Input
              id={`${id}-${field.key}`}
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="h-8 text-xs"
            />
          </div>
        );
    }
  };

  return (
    <Card className={`shadow-lg border-2 ${className}`} style={nodeStyle}>
      {/* Render handles */}
      {config.handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className={`w-3 h-3 ${
            handle.type === "source"
              ? "bg-blue-500 border-blue-600"
              : "bg-green-500 border-green-600"
          }`}
        />
      ))}

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {config.icon}
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{config.title}</h3>
            {config.description && (
              <p className="text-xs text-gray-500 mt-1">{config.description}</p>
            )}
          </div>
          <Badge
            variant="secondary"
            className="text-xs"
            style={{ backgroundColor: config.color }}
          >
            {config.title}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {config.customContent
          ? config.customContent({
              id,
              data: localData,
              onDataChange: handleFieldChange,
            })
          : config.fields.map(renderField)}
      </CardContent>
    </Card>
  );
};
