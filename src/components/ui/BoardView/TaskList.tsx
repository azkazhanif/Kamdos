import React from "react";
import type { Task } from "../../../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  isDragOver: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isDragOver }) => {
  return (
    <div className="flex-1 p-3 pt-0 overflow-y-auto space-y-3 custom-scrollbar">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {tasks.length === 0 && (
        <div
          className={`text-center py-8 border-2 border-dashed rounded-lg transition-colors ${
            isDragOver ? "border-blue-400 bg-blue-50" : "border-slate-200"
          }`}
        >
          <p className="text-sm text-slate-400">
            {isDragOver ? "Release to Move" : "No Tasks"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
