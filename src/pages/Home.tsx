import React, { useEffect } from "react";
import { ViewMode } from "../types";
import BoardView from "../components/fragments/BoardView";
import ListView from "../components/fragments/ListView";
import TimelineView from "../components/fragments/TimelineView";
import { useViewStore } from "../store/useViewStore";
import { useTaskStore } from "../store/taskStore";

const Home = () => {
  const { tasks, fetchTasks, loading } = useTaskStore();
  const { viewMode } = useViewStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="h-full">
      {viewMode === ViewMode.Board && <BoardView tasks={tasks} />}
      {viewMode === ViewMode.List && <ListView tasks={tasks} />}
      {viewMode === ViewMode.Timeline && <TimelineView tasks={tasks} />}
    </div>
  );
};

export default Home;
