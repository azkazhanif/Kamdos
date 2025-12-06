import { supabase } from "../lib/supabase";
import type { Task, TaskInsert, TaskStatus } from "../types";

export async function createPost(payload: TaskInsert) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("todos")
    .insert({
      ...payload,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function selectTodo(): Promise<Task[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("No authenticated user");
    return [];
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("created_by", userId)
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
