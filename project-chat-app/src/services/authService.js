import { supabase } from "../supabase/config";

// ------------<<< SIGN UP >>>----------------

export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

// ------------<<< LOGIN >>>----------------

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// ------------<<< Sign In With Google >>>----------------

// const signInWithGoogle = async () => {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//   });
//   if (error) {
//     console.log(error);
//   }
// }

// ------------<<< LOGOUT >>>----------------

export async function signOut() {
  return await supabase.auth.signOut();
}

// ------------<<< GET CURRENT USER >>>----------------

export function getCurrentUser() {
  return supabase.auth.getUser();
}