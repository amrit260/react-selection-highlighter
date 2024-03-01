import { Save, Trash } from "lucide-react";
import toast from "react-hot-toast";

import {
  SelectionType,
  PopoverChildrentype,
} from "react-selection-highlighter";
import { defaultSelectionWrapperClassName } from "react-selection-highlighter";
import { cn } from "../lib/utils";
const notify = () =>
  toast.success("Saved locally. Refresh page to see effect.");

const getSavedSelections = () => {
  const dat = localStorage.getItem("selections");
  if (dat) {
    const selections = JSON.parse(dat) as SelectionType[];
    return selections;
  }
  return [];
};
const CustomPopover: PopoverChildrentype = ({
  selection,
  removeSelection,
  updateSelection,
}) => {
  const handleDelete = () => {
    const selections = getSavedSelections();
    const index = selections.findIndex((item) => item.id === selection.id);

    if (index !== -1) {
      selections.splice(index, 1);
      localStorage.setItem("selections", JSON.stringify(selections));
    }

    removeSelection(selection);
  };
  // add to localstorage (selection in state is alredy added while user selects text)
  const handleSave = () => {
    const selections = getSavedSelections();
    const index = selections.findIndex((item) => item.id === selection.id);
    if (index !== -1) {
      selections.splice(index, 1);
    }

    localStorage.setItem(
      "selections",
      JSON.stringify([...selections, selection])
    );

    notify();
  };

  const changeColor = (colorClassName: string) => {
    let className = selection.className || defaultSelectionWrapperClassName;

    updateSelection(selection.id, {
      ...selection,
      className: cn(className, colorClassName),
    });
  };

  return (
    <div className="p-4 shadow-lg  bg-white rounded-md flex flex-col items-center justify-center gap-2">
      <p style={{ fontSize: "12px" }}>
        {selection.text.length} characters selected
      </p>
      <div className="flex w-full min-w-48 gap-3 items-center justify-center">
        <div
          onClick={handleSave}
          className=" text-[24px] font-bold cursor-pointer"
        >
          {" "}
          <Save />
        </div>
        <div
          onClick={() => changeColor("bg-rose-500 ")}
          className="bg-rose-500 cursor-pointer h-6 w-6 rounded-full"
        >
          {" "}
        </div>
        <div
          onClick={() => changeColor("bg-[#F5DD61]")}
          className="bg-[#F5DD61] cursor-pointer h-6 w-6 rounded-full"
        >
          {" "}
        </div>
        <div
          onClick={() => changeColor("bg-[#59D5E0]")}
          className="bg-[#59D5E0] cursor-pointer h-6 w-6 rounded-full"
        >
          {" "}
        </div>

        <div
          onClick={handleDelete}
          className="text-red-700 text-[24px] font-bold cursor-pointer"
        >
          {" "}
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default CustomPopover;
