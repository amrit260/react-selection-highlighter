import React, { useEffect } from "react";
import {
  Highlighter,
  useSelections,
  SelectionType,
} from "react-selection-highlighter";
import toast, { Toaster } from "react-hot-toast";

import { text } from "../lib/text";
import CustomPopover from "./customPopover";

const AdvancedHighlighter = () => {
  const { setSelections, selections } = useSelections();

  useEffect(() => {
    const data = localStorage.getItem("selections");
    if (data) {
      const parsedSelections = JSON.parse(data) as SelectionType[];
      setSelections(parsedSelections);
    }
  }, []);

  console.log(selections);
  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <Toaster />
      <h2 className="text-xl font-extrabold p-10 text-center">
        {" "}
        Advanced example of react-selection-highlighter
      </h2>
      <div className="w-7/12">
        <Highlighter
          className="tracking-wide  space-y-5 leading-6"
          selectionWrapperClassName=" bg-[#15F5BA] select-none relative group"
          PopoverClassName="absolute bottom-0 transition-opacity rounded-lg group-hover:visible invisible  rounded-lg z-10 bg-transparent text-center pb-[32px]"
          htmlString={text}
          PopoverChildren={CustomPopover}
          // disablePopover={true}
        />
      </div>
    </div>
  );
};
export default AdvancedHighlighter;
