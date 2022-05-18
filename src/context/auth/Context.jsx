import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks";
import { supabase } from "../../SupabaseClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useLocalStorage("user-id");
  const user_id = supabase.auth.user()?.id;

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setUserId(user?.id);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user ?? null);
        setUserId(user?.id);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const signUp = (userData, metaData) =>
    supabase.auth.signUp(userData, metaData);

  const signIn = (data) => supabase.auth.signIn(data);

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, user_id, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
