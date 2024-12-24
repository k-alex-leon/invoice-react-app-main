import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import InvoiceApp from "./InvoiceApp";
import AuthProvider from "./auth/providers/AuthProvider";
import DataProvider from "./context/DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // strictmode = revisa el codigo ejecutando diferentes pruebas.(Modo enfocado al desarrollo)
  // se podrá remover al pasar el proyecto a producción
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <InvoiceApp />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
