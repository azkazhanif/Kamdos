import React from "react";

interface ModalHeaderProps {
  showDelete?: boolean;
  lastEdited?: string;
  onClose: () => void;
  onDelete?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  showDelete = false,
  lastEdited,
  onClose,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-white shrink-0">
      {/* Left Section */}
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

        {lastEdited && (
          <span className="text-xs text-slate-400 hidden sm:block">
            {lastEdited}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
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
  );
};

export default ModalHeader;
