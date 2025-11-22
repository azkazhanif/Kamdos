import React, { useState } from "react";
import { TaskStatus, type Task } from "../../types";

interface TaskModalProps {
  isOpen: boolean;
  // onDelete: (id: string) => void;
  // handleSave: (data: any) => void;
  // task: any; // or replace with proper Task type
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  // onDelete,
  // handleSave,
  // task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Backlog);
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [task, setTask] = useState({});

  const onClose = () => {
    isOpen = false;
  };
  const onDelete = (id: string) => {
    return id;
  };
  const handleSave = (data: Task) => {
    return data;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Actions */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:bg-slate-100 p-1 rounded transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
            {task && (
              <span className="text-xs text-slate-400 hidden sm:block">
                Last edited today
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {task && (
              <button
                onClick={() => {
                  onDelete(task.id);
                  onClose();
                }}
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                title="Delete Task"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:bg-slate-100 p-1.5 rounded transition-colors"
              title="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12">
            {/* Icon Placeholder */}
            <div className="group relative w-16 h-16 -mt-4 mb-6 flex items-center justify-center text-4xl hover:bg-slate-100 rounded cursor-pointer transition-colors select-none">
              📋
            </div>

            {/* Title (Big) */}
            <input
              type="text"
              placeholder="Untitled"
              className="w-full text-4xl font-bold text-slate-800 placeholder-slate-300 border-none focus:ring-0 p-0 bg-transparent mb-8 leading-tight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Properties Table */}
            <div className="flex flex-col gap-1 mb-10">
              {/* Status */}
              <div className="flex items-center py-1.5 group">
                <div className="w-40 flex items-center gap-2 text-slate-500 text-sm">
                  <span>Status</span>
                </div>
                <div className="flex-1">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="bg-transparent hover:bg-slate-100 transition-colors text-slate-700 text-sm px-2 py-1 rounded border-none focus:ring-0 cursor-pointer w-auto max-w-full"
                  >
                    {Object.values(TaskStatus).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center py-1.5 group">
                <div className="w-40 flex items-center gap-2 text-slate-500 text-sm">
                  <span>Tags</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Empty"
                    className="w-full bg-transparent hover:bg-slate-50 rounded border-none focus:ring-0 text-sm px-2 py-1 text-slate-700 placeholder-slate-300 transition-colors"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-center py-1.5 group">
                <div className="w-40 flex items-center gap-2 text-slate-500 text-sm">
                  <span>Start Date</span>
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent hover:bg-slate-100 rounded border-none focus:ring-0 text-sm px-2 py-1 text-slate-700 font-normal transition-colors"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center py-1.5 group">
                <div className="w-40 flex items-center gap-2 text-slate-500 text-sm">
                  <span>Due Date</span>
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-transparent hover:bg-slate-100 rounded border-none focus:ring-0 text-sm px-2 py-1 text-slate-700 font-normal transition-colors"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 mb-8" />

            {/* Description */}
            <div className="relative min-h-[300px]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-slate-800">
                  Description
                </h3>
              </div>

              <textarea
                placeholder="Type something..."
                className="w-full h-full min-h-[400px] resize-none text-slate-700 leading-7 border-none focus:ring-0 p-0 bg-transparent text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex justify-end items-center gap-3 bg-white shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium shadow-md transition-transform active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
