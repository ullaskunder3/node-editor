# 🛠️ Node Editor – React Flow + FastAPI

A modern **pipeline editor** built with [React Flow](https://reactflow.dev/) on the frontend and [FastAPI](https://fastapi.tiangolo.com/) on the backend.  
It allows drag-and-drop creation of nodes, configurable connections, and backend validation of pipelines as **DAGs**.

---

DEMO:
<img width="1919" height="1047" alt="image" src="https://github.com/user-attachments/assets/25f98903-4252-4495-bdea-0ab0a587bc2d" />

## ✨ Features

- 🎨 **Drag & Drop Nodes** – Build pipelines visually using a customizable palette.
- 🔗 **Reusable Node Types** – Input, Output, LLM, Calculator, Database, Filter, Transformer, Analytics, Text.
- 🧩 **Extensible Architecture** – Easily add new node types via `nodeConfigs`.
- ⚡ **React Flow Powered** – MiniMap, Controls, snapping grid, smooth connections.
- 🔍 **Backend Validation** – FastAPI checks pipelines for DAG (no cycles).
- 🎯 **Frontend–Backend Integration** – Submit pipelines for validation and execution readiness.

---

## 📂 Project Structure

```
node-editor/
├── backend/ # FastAPI backend
│ └── main.py # `/pipelines/parse` DAG validation API
├── frontend/ # React + Vite frontend
│ ├── app/ # App entrypoint & global styles
│ ├── components/ # Reusable UI + pipeline components
│ ├── hooks/ # Custom hooks for pipeline state
│ ├── nodes/ # Node factory & configs
│ ├── package.json # Dependencies
│ └── tailwind.config.ts # Tailwind config

```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/ullaskunder3/node-editor.git
cd node-editor
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run backend
uvicorn main:app --reload
```

Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
pnpm install
pnpm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Setup

Create a `.env` file inside **frontend/**:

```env
# Make sure the backend port matches your FastAPI server
VITE_BASE_URL=http://127.0.0.1:8000
```

---

## 📡 API Endpoints

### `GET /`

Health check

```json
{ "Ping": "Pong" }
```

### `POST /pipelines/parse`

Validate pipeline (nodes + edges).

**Request Body Example:**

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "customInput",
      "position": { "x": 0, "y": 0 },
      "data": {}
    }
  ],
  "edges": []
}
```

**Response Example:**

```json
{
  "num_nodes": 1,
  "num_edges": 0,
  "is_dag": true,
  "message": "Pipeline is valid and ready for execution."
}
```

---

## 🧱 Adding New Nodes

1. Define config in `nodes/node-configs.tsx`.
2. Register in `PipelineUI` → `nodeTypes`.
3. Add to `PipelineToolbar` for drag-and-drop.

---
