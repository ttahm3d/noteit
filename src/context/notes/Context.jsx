import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth";
import toast from "react-hot-toast";
import {
  addNoteHandler,
  deleteNoteHandler,
  editNoteHandler,
  fetchNotesHandler,
  moveToArchiveHandler,
  moveToTrashHandler,
  removeFromArchiveHandler,
  removeFromTrashHandler,
} from "./Utils";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user_id } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (user_id) fetchNotes();
  }, [user_id]);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await fetchNotesHandler(user_id);
    if (error) {
      toast.error("Error in fetching notes");
    }
    setNotes(data);
    setLoading(false);
  };

  const addNote = async (note) => {
    const { error } = await addNoteHandler(note, user_id);
    if (error) {
      toast.error("Error in saving note");
    } else {
      toast.success("Note has been saved");
    }
    fetchNotes();
  };

  const deleteNote = async (noteId) => {
    const { error } = await deleteNoteHandler(noteId, user_id);
    if (error) {
      toast.error("Error in Deleteing note");
    } else {
      toast.success("The note has been deleted");
    }
    fetchNotes();
  };

  const editNote = async (note) => {
    const { error } = await editNoteHandler(note, user_id);
    if (error) {
      toast.error("Error in updating note");
    } else {
      toast.success("Your changes have been saved");
    }
    fetchNotes();
  };

  const moveToTrash = async (note) => {
    const { error } = await moveToTrashHandler(note, user_id);
    if (error) {
      toast.error("Something went wrong");
    } else {
      toast.success("Succesfull moved the note to trash");
    }
    fetchNotes();
  };

  const moveToArchive = async (note) => {
    const { error } = await moveToArchiveHandler(note, user_id);
    if (error) {
      toast.error("Something went wrong");
    } else {
      toast.success("Succesfull moved the note to trash");
    }
    fetchNotes();
  };

  const removeFromArchive = async (note) => {
    const { error } = await removeFromArchiveHandler(note, user_id);
    if (error) {
      toast.error("Something went wrong");
    } else {
      toast.success("Succesfull moved the note to trash");
    }
    fetchNotes();
  };

  const removeFromTrash = async (note) => {
    const { error } = await removeFromTrashHandler(note, user_id);
    if (error) {
      toast.error("Something went wrong");
    } else {
      toast.success("Succesfull moved the note to trash");
    }
    fetchNotes();
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        addNote,
        deleteNote,
        editNote,
        moveToArchive,
        moveToTrash,
        removeFromArchive,
        removeFromTrash,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
