import { type PipelineData, type PipelineResponse } from "@types";
const BASE_URL = import.meta.env.BASE_URL;
console.log(BASE_URL);
export const parsePipeline = async (
  pipelineData: PipelineData
): Promise<PipelineResponse> => {
  const res = await fetch(`${BASE_URL}/pipelines/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pipelineData),
  });

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
