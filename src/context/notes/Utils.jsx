import { supabase } from "../../SupabaseClient";

const addNoteHandler = (note, user) =>
  supabase.from("notes").insert([
    {
      title: note.title,
      body: note.body,
      color: note.color,
      userId: user?.id,
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

const fetchNotesHandler = (userId) =>
  supabase
    .from("notes")
    .select()
    .eq("userId", userId)
    .order("updated_at", { ascending: false });

export {
  addNoteHandler,
  deleteNoteHandler,
  editNoteHandler,
  fetchNotesHandler,
};
