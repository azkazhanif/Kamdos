import React, { useState } from "react";
import { TaskStatus, type Task } from "../../types";
import TaskCard from "./TaskCard";
import { updateTaskStatusById } from "../../services/todoService";

interface BoardViewProps {
  tasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ tasks }) => {
  const columns = Object.values(TaskStatus);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    status: TaskStatus
  ) => {
    e.preventDefault();
    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    status: TaskStatus
  ) => {
    e.preventDefault();
    setDragOverColumn(null);

    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === status) return;

    // 2. Update Supabase
    try {
      await updateTaskStatusById(task.id, status);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const onEditTask = () => {};

  return (
    <div className="flex overflow-x-auto h-full pb-4 gap-6">
      {columns.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        const isDragOver = dragOverColumn === status;

        return (
          <div
            key={status}
            className={`shrink-0 w-80 flex flex-col rounded-xl h-full transition-colors duration-200 ${
              isDragOver
                ? "bg-blue-50 ring-2 ring-brand-200 ring-inset"
                : "bg-slate-50/50"
            }`}
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="p-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-700">{status}</h2>
                <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              {/* Placeholder for column actions */}
              <button className="text-slate-400 hover:text-slate-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-3 pt-0 overflow-y-auto space-y-3 custom-scrollbar">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onMove={handleDrop}
                />
              ))}
              {columnTasks.length === 0 && (
                <div
                  className={`text-center py-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragOver
                      ? "border-brand-300 bg-brand-50/50"
                      : "border-slate-200"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isDragOver ? "text-brand-500" : "text-slate-400"
                    }`}
                  >
                    {isDragOver ? "Drop to move" : "No tasks"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardView;
