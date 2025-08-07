import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
// import { SubmitButton } from "./submit";
// import "@xyflow/react/dist/style.css";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      {/* <SubmitButton /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
