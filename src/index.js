import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context//auth";
import { NotesProvider } from "./context/notes";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
