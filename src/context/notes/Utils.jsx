import { supabase } from "../../SupabaseClient";

const addNoteHandler = (note, user) =>
  supabase.from("notes").insert([
    {
      title: note.title,
      body: note.body,
      color: note.color,
      userId: user,
      ...note,
    },
  ]);

const deleteNoteHandler = (noteId, userId) =>
  supabase.from("notes").delete().match({ id: noteId }).eq("userId", userId);

const editNoteHandler = (note, userId) =>
  supabase
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

const fetchNotesHandler = (user) =>
  supabase
    .from("notes")
    .select()
    .eq("userId", user)
    .order("updated_at", { ascending: false });

const moveToTrashHandler = (note, userId) =>
  supabase
    .from("notes")
    .update({
      isTrashed: true,
      isArchived: false,
    })
    .match({ id: note?.id })
    .eq("userId", userId)
    .eq("id", note?.id);

const moveToArchiveHandler = (note, userId) =>
  supabase
    .from("notes")
    .update({
      isTrashed: false,
      isArchived: true,
    })
    .match({ id: note?.id })
    .eq("userId", userId)
    .eq("id", note?.id);

const removeFromTrashHandler = (note, userId) =>
  supabase
    .from("notes")
    .update({
      isTrashed: false,
      isArchived: true,
    })
    .match({ id: note?.id })
    .eq("userId", userId)
    .eq("id", note?.id);

const removeFromArchiveHandler = (note, userId) =>
  supabase
    .from("notes")
    .update({
      isTrashed: false,
      isArchived: true,
    })
    .match({ id: note?.id })
    .eq("userId", userId)
    .eq("id", note?.id);

export {
  addNoteHandler,
  deleteNoteHandler,
  editNoteHandler,
  fetchNotesHandler,
  moveToArchiveHandler,
  moveToTrashHandler,
  removeFromArchiveHandler,
  removeFromTrashHandler,
};
