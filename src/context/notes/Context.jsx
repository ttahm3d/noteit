import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import { useAuth } from "../auth";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks";
import {
  addNoteHandler,
  deleteNoteHandler,
  editNoteHandler,
  fetchNotesHandler,
} from "./Utils";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [userId] = useLocalStorage("user-id");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await fetchNotesHandler(userId);
    if (error) {
      throw new Error(error);
    }
    setNotes(data);
    setLoading(false);
  };

  const addNote = async (note) => {
    const { error } = await addNoteHandler(note, user);
    if (error) {
      toast.error("Error in saving note");
    } else {
      toast.success("Note has been saved");
    }
    fetchNotes();
  };

  const deleteNote = async (noteId) => {
    const { error } = await deleteNoteHandler(noteId, userId);
    if (error) {
      toast.error("Error in Deleteing note");
    } else {
      toast.success("The note has been deleted");
    }
    fetchNotes();
  };

  const editNote = async (note) => {
    const { error } = await editNoteHandler(note, userId);
    if (error) {
      toast.error("Error in updating note");
    } else {
      toast.success("Your changes have been saved");
    }
    fetchNotes();
  };

  return (
    <NotesContext.Provider
      value={{ notes, loading, addNote, deleteNote, editNote }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
