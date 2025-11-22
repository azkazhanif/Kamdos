import { useState } from "react";
import { ViewMode, type Task } from "../../types";

interface HeaderProps {
  viewMode: string;
  setViewMode: (value: ViewMode) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const openCreateModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 shadow-lg">
          K
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Kambos
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full text-sm outline-none transition-all w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {Object.values(ViewMode).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewMode === mode
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
