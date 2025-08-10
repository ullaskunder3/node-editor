import { create } from 'zustand';

interface PipelineStore {
  nodes: any[];
  edges: any[];
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  getPipelineData: () => { nodes: any[]; edges: any[] };
}

export const usePipelineStore = create<PipelineStore>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  getPipelineData: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
}));
