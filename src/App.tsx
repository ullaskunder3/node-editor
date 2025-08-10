import { useEffect, useRef } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Button } from "@atoms";
import { PipelineUI, PipelineToolbar, PipelineSubmit } from "@molecules";

export default function App() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !sidebarRef.current) return;
    const newWidth = Math.min(Math.max(e.clientX, 200), 500);
    sidebarRef.current.style.width = `${newWidth}px`;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-2 border-b bg-white shadow-sm">
        <div className="w-full flex items-center justify-between gap-2">
          <Button
            size="sm"
            onClick={() => sidebarRef.current?.classList.toggle("hidden")}
          >
            Toggle Tools
          </Button>
          <PipelineSubmit />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        <div
          ref={sidebarRef}
          style={{ width: 260 }}
          className="border-r bg-white flex flex-col"
        >
          <PipelineToolbar />
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="w-2 cursor-col-resize bg-blue-200 hover:bg-blue-400 transition-colors"
        />

        {/* Canvas */}
        <div className="flex-1 min-w-0 min-h-0 relative p-5">
          <ReactFlowProvider>
            <PipelineUI />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
