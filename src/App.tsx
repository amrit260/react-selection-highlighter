import React from "react";
import SimpleHighlighter from "./components/simpleHighlighter";
import AdvancedHighlighter from "./components/advancedHighlighter";
function App() {
  return (
    <div className="roboto-regular">
      <SimpleHighlighter />
      <AdvancedHighlighter />
    </div>
  );
}

export default App;
