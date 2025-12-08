import React from "react";
import type { Task, TaskStatus } from "../../../types";
import TaskList from "./TaskList";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  isDragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: (taskId: string, status: TaskStatus) => void;
}

const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId");
    onDrop(taskId, status);
  };

  return (
    <div
      className={`shrink-0 w-80 flex flex-col rounded-xl h-full transition-colors ${
        isDragOver ? "bg-blue-50 ring-2 ring-blue-400" : "bg-slate-50/50"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-bold text-slate-700">
          {status} ({tasks.length})
        </h2>
      </div>

      {/* Tasks */}
      <TaskList tasks={tasks} isDragOver={isDragOver} />
    </div>
  );
};

export default Column;
