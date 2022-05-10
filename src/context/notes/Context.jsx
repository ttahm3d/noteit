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
      .eq("userId", userId)
      .order("updated_at", { ascending: false });

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

  const deleteNote = async (noteId) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .match({ id: noteId })
      .eq("userId", userId);
    if (error) {
      toast.error("Error in Deleteing note");
    } else {
      toast.success("The note has been deleted");
    }
    fetchNotes();
  };

  const editNote = async (note) => {
    const { error } = await supabase
      .from("notes")
      .update({
        title: note?.title,
        body: note?.body,
        color: note?.color,
        updated_at: new Date(),
      })
      .match({ id: note?.id })
      .eq("userId", userId)
      .eq("id", note?.id);
    if (error) {
      toast.error("Error in Deleteing note");
    } else {
      toast.success("The note has been deleted");
    }
    fetchNotes();
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
