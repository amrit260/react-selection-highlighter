import React from "react";
import ReactDOM from "react-dom/client";
import { Highlighter, SelectionProvider } from "react-selection-highlighter";
import { text } from "./text";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h4 style={{ padding: "20px", textAlign: "center" }}>
        {" "}
        Select text below to see effect.
      </h4>
      <div style={{ width: "60%" }}>
        <SelectionProvider>
          <Highlighter htmlString={text} />
        </SelectionProvider>
      </div>
    </div>
  </React.StrictMode>
);
