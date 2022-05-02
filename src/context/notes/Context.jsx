import { createContext } from "react";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  return <NotesContext.Provider>{children}</NotesContext.Provider>;
};
