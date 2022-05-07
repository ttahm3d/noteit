import { createContext, useContext } from "react";
import { supabase } from "../../SupabaseClient";
import { useAuth } from "../auth";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const { user } = useAuth();

  const addNote = async (note) => {
    const { data, error } = await supabase.from("notes").insert([
      {
        title: note.title,
        body: note.body,
        color: note.color,
        userId: user?.id,
      },
    ]);
    console.log(data, error);
  };

  return (
    <NotesContext.Provider value={{ addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
