import { useEffect, useState } from "react";
import Header from "./components/fragments/Header";
import { TaskStatus, ViewMode, type Task } from "./types";
import TaskModal from "./components/fragments/TaskModal";
import BoardView from "./components/fragments/BoardView";
import { initialTasks } from "./lib/data";
import ListView from "./components/fragments/ListView";
import TimelineView from "./components/fragments/TimelineView";
import { supabase } from "./lib/supabase";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Board);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateStatus = (task: Task, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
  };

  const openEditModal = (task: Task) => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("todos").select("*").limit(1);

      if (error) {
        console.error("❌ Supabase connection failed:", error.message);
      } else {
        console.log("✅ Supabase connected!", data);
      }
    };

    testConnection();
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-6 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-brand-50/50 to-transparent -z-10 pointer-events-none"></div>

          <div className="h-full w-full">
            {viewMode === ViewMode.Board && (
              <BoardView
                tasks={tasks}
                onEditTask={openEditModal}
                onUpdateTaskStatus={updateStatus}
              />
            )}
            {viewMode === ViewMode.List && (
              <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                <ListView tasks={tasks} onEditTask={openEditModal} />
              </div>
            )}
            {viewMode === ViewMode.Timeline && (
              <TimelineView tasks={tasks} onEditTask={openEditModal} />
            )}
          </div>
        </main>

        {/* Modal */}
        <TaskModal isOpen={isModalOpen} />
      </div>
    </>
  );
}

export default App;
