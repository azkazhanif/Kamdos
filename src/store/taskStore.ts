// src/store/taskStore.ts
import { create } from "zustand";
import { selectTodo } from "../services/todoService";
import type { Task } from "../types";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const data = await selectTodo();
      set({ tasks: data });
    } catch {
      console.log("Failed to fetch tasks");
    } finally {
      set({ loading: false });
    }
  },
}));
