import { supabase } from "../lib/supabase";

export const register = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) console.log(error);

  return data;
  } catch (error) {
    console.log(error)
  }
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
};
