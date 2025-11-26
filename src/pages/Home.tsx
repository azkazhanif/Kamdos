import React from "react";
import { ViewMode } from "../types";
import BoardView from "../components/fragments/BoardView";
import ListView from "../components/fragments/ListView";
import TimelineView from "../components/fragments/TimelineView";

const Home = () => {
  return (
    <div>
      {/* {viewMode === ViewMode.Board && (
        <BoardView tasks={tasks} onEditTask={openEditModal} />
      )}
      {viewMode === ViewMode.List && (
        <div className="h-full overflow-y-auto custom-scrollbar pr-2">
          <ListView tasks={tasks} onEditTask={openEditModal} />
        </div>
      )}
      {viewMode === ViewMode.Timeline && (
        <TimelineView tasks={tasks} onEditTask={openEditModal} />
      )} */}
      text
    </div>
  );
};

export default Home;
