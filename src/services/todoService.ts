import { supabase } from "../lib/supabase";
import type { Task } from "../types";

export async function createPost(payload: Task) {
  const { data, error } = await supabase
    .from("todos")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}
