import React from "react";
import SimpleHighlighter from "./components/simpleHighlighter";
import AdvancedHighlighter from "./components/advancedHighlighter";
import { SelectionProvider } from "react-selection-highlighter";
function App() {
  return (
    <div className="roboto-regular">
      <SelectionProvider>
        {/* <SimpleHighlighter /> */}
        <AdvancedHighlighter />
      </SelectionProvider>
    </div>
  );
}

export default App;
