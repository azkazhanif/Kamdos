import { useViewStore } from "../../store/useViewStore";
import { ViewMode } from "../../types";

const ViewSwitcher = () => {
  const { viewMode, setViewMode } = useViewStore();

  return (
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
  );
};

export default ViewSwitcher;
