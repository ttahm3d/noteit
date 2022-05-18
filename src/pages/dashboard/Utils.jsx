const totalNumberOfNotes = (notes) => notes.length;

const arhivedNotes = (notes) => notes.filter((note) => note.isArchived).length;

const trashedNotes = (notes) => notes.filter((note) => note.isTrashed).length;

const personalNotes = (notes) =>
  notes.filter((note) => note.tag === "Personal").length;
const learningNotes = (notes) =>
  notes.filter((note) => note.tag === "Learning").length;
const workNotes = (notes) => notes.filter((note) => note.tag === "Work").length;
const todoNotes = (notes) =>
  notes.filter((note) => note.tag === "To do").length;
const inprogressNotes = (notes) =>
  notes.filter((note) => note.tag === "In progress").length;
const completedNotes = (notes) =>
  notes.filter((note) => note.tag === "Completed").length;

export {
  arhivedNotes,
  completedNotes,
  inprogressNotes,
  learningNotes,
  personalNotes,
  todoNotes,
  totalNumberOfNotes,
  trashedNotes,
  workNotes,
};
