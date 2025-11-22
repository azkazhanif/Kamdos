import React from "react";
import { TaskStatus, type Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onMove?: (task: Task, newStatus: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onMove }) => {
  const statusColors = {
    [TaskStatus.Backlog]: "bg-slate-100 text-slate-600 border-slate-200",
    [TaskStatus.Todo]: "bg-blue-50 text-blue-600 border-blue-200",
    [TaskStatus.InProgress]: "bg-amber-50 text-amber-600 border-amber-200",
    [TaskStatus.Done]: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
    // Optional: Set a custom drag image or just rely on the browser's default ghost image
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
      onClick={() => onEdit(task)}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
        {task.dueDate && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(task.dueDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-slate-800 mb-2 leading-tight">
        {task.title}
      </h3>

      <p className="text-sm text-slate-500 line-clamp-2 mb-3">
        {task.description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200"
          >
            #{tag}
          </span>
        ))}
      </div>

      {onMove && (
        <div
          className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-slate-50 mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <select
            className="text-xs border-none bg-transparent text-slate-400 hover:text-brand-600 focus:ring-0 cursor-pointer"
            value={task.status}
            onChange={(e) => onMove(task, e.target.value as TaskStatus)}
          >
            {Object.values(TaskStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
