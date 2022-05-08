import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import { useAuth } from "../auth";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [userId] = useLocalStorage("user-id");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("userId", userId);

    if (error) {
      throw new Error(error);
    }
    setNotes(data);
  };

  const addNote = async (note) => {
    const { error } = await supabase.from("notes").insert([
      {
        title: note.title,
        body: note.body,
        color: note.color,
        userId: user?.id,
      },
    ]);
    if (error) {
      toast.error("Error in saving note");
    } else {
      toast.success("Note has been saved");
    }
    fetchNotes();
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
