import React, { useState } from "react";
import { TaskStatus, type Task } from "../../types";
import { updateTaskStatusById } from "../../services/todoService";
import Column from "../ui/BoardView/Column";

interface BoardViewProps {
  tasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ tasks }) => {
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const handleDrop = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    try {
      await updateTaskStatusById(task.id, newStatus);
    } catch (err) {
      console.error("Failed updating status:", err);
    }
  };

  return (
    <div className="flex overflow-x-auto h-full pb-4 gap-6">
      {Object.values(TaskStatus).map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          isDragOver={dragOverColumn === status}
          onDragOver={() => setDragOverColumn(status)}
          onDragLeave={() => setDragOverColumn(null)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default BoardView;
