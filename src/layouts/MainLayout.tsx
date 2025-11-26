import { useState } from "react";
import { ViewMode } from "../types";
import Header from "../components/fragments/Header";
import TaskModal from "../components/fragments/TaskModal";
import { Outlet } from "react-router";

const MainLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Board);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-6 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-brand-50/50 to-transparent -z-10 pointer-events-none"></div>

        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>

      {/* Modal */}
      <TaskModal isOpen={isModalOpen} />
    </div>
  );
};

export default MainLayout;
