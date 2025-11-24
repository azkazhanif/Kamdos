import { useEffect, useState } from "react";
import Header from "./components/fragments/Header";
import { TaskStatus, ViewMode, type Task } from "./types";
import TaskModal from "./components/fragments/TaskModal";
import BoardView from "./components/fragments/BoardView";
import { initialTasks } from "./lib/data";
import ListView from "./components/fragments/ListView";
import TimelineView from "./components/fragments/TimelineView";
import { supabase } from "./lib/supabase";
import { selectTodo } from "./services/todoService";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Board);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (task: Task) => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function fetchTodos() {
      const data = await selectTodo(); // <- CALL IT
      setTasks(data as Task[]);
    }

    fetchTodos();
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
              <BoardView tasks={tasks} onEditTask={openEditModal} />
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
