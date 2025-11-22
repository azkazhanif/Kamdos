export const TaskStatus = {
  Backlog: "Backlog",
  Todo: "Todo",
  InProgress: "In Progress",
  Done: "Done",
} as const;
export type TaskStatus = keyof typeof TaskStatus;

export const ViewMode = {
  Board: "Board",
  List: "List",
  Timeline: "Timeline",
} as const;

export type ViewMode = keyof typeof ViewMode;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO Date string YYYY-MM-DD
  startDate: string; // ISO Date string YYYY-MM-DD
  tags: string[];
  assignee?: string;
}
