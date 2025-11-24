import { supabase } from "../lib/supabase";
import type { Task, TaskInsert, TaskStatus } from "../types";

export async function createPost(payload: TaskInsert) {
  const { data, error } = await supabase
    .from("todos")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function selectTodo(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*") // or list specific columns
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Task[];
}

export async function selectTodoById(id: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateTaskStatusById(id: string, status: TaskStatus) {
  const { data, error } = await supabase
    .from("todos")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
