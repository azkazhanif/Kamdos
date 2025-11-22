import React from "react";

const ButtonAIGenerate = () => {
  return (
    <button
      onClick={handleAIGenerate}
      disabled={isGenerating || !title}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        isGenerating
          ? "bg-slate-50 text-slate-400 border-slate-200"
          : "bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm"
      }`}
    >
      {isGenerating ? (
        <span className="flex items-center gap-1">Thinking...</span>
      ) : (
        <>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          AI Assist
        </>
      )}
    </button>
  );
};

export default ButtonAIGenerate;
