import React from "react";
import { type Task, TaskStatus } from "../../types";

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const ListView: React.FC<ListViewProps> = ({ tasks, onEditTask }) => {
  const statusStyles = {
    [TaskStatus.Backlog]: "bg-slate-100 text-slate-700",
    [TaskStatus.Todo]: "bg-blue-100 text-blue-700",
    [TaskStatus.InProgress]: "bg-amber-100 text-amber-700",
    [TaskStatus.Done]: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Task
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Tags
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Due Date
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => onEditTask(task)}
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="flex flex-col">
                    <span>{task.title}</span>
                    <span className="text-xs text-slate-400 font-normal truncate max-w-xs">
                      {task.description}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${
                      statusStyles[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-100 px-1.5 rounded text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-4">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold">
                        {task.assignee.charAt(0)}
                      </div>
                      <span>{task.assignee}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Unassigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tasks.length === 0 && (
        <div className="text-center py-12 text-slate-400">No tasks found.</div>
      )}
    </div>
  );
};

export default ListView;
