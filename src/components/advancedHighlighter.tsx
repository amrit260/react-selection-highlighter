import React from "react";
import { Highlighter, SelectionProvider } from "react-selection-highlighter";
import { text } from "../text";

const SimpleHighlighter = () => {
  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <h2 className="text-xl font-extrabold p-10 text-center">
        {" "}
        Advanced example of react-selection-highlighter
      </h2>
      <div className="w-7/12">
        <SelectionProvider>
          <Highlighter
            rootClassName="tracking-wide space-y-5 leading-6"
            selectionWrapperClassName="bg-orange-500"
            htmlString={text}
          />
        </SelectionProvider>
      </div>
    </div>
  );
};
export default SimpleHighlighter;
