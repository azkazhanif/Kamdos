import { TaskStatus, type Task } from "../types";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research Competitors",
    description: "Analyze market trends and top 3 competitors.",
    status: TaskStatus.Done,
    dueDate: "2023-10-25",
    startDate: "2023-10-20",
    tags: ["Strategy", "Research"],
    assignee: "Alice",
  },
  {
    id: "2",
    title: "Draft Project Proposal",
    description: "Create the initial scope and budget for the client.",
    status: TaskStatus.InProgress,
    dueDate: "2023-11-05",
    startDate: "2023-10-28",
    tags: ["Planning", "Document"],
    assignee: "Bob",
  },
  {
    id: "3",
    title: "Design UI Mockups",
    description: "Figma screens for the main dashboard and login page.",
    status: TaskStatus.Todo,
    dueDate: "2023-11-15",
    startDate: "2023-11-06",
    tags: ["Design", "UI/UX"],
    assignee: "Charlie",
  },
  {
    id: "4",
    title: "Setup React Repo",
    description: "Initialize Vite, Tailwind, and TypeScript configuration.",
    status: TaskStatus.Backlog,
    dueDate: "2023-11-20",
    startDate: "2023-11-18",
    tags: ["Dev", "Setup"],
    assignee: "Dave",
  },
];
