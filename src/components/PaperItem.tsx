import { Paper } from "@/types/index";
import { fields, placeholders } from "@utils/constants";
import { Icon } from "@iconify/react";
import Input from "./Input";
import { useForm, UseFormRegister } from "react-hook-form";

export default function PaperItem({
  paper,
  totalPaper,
  index,
  perPaperResult,
  removePaper,
}: {
  paper: Paper;
  totalPaper: number;
  index: number;
  perPaperResult: Map<string, number>;
  removePaper: (id: string) => void;
}) {
  return (
    <div
      id={paper.id}
      className="flex flex-row items-center justify-between rounded"
    >
      <div className="flex flex-row gap-[3px] items-center overflow-x-auto">
        <button
          onClick={() => removePaper(paper.id)}
          disabled={totalPaper == 1 && index == 0}
          className="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
        >
          <Icon icon="ph:trash-light" width="16px" />
        </button>
        {fields.map((field: string, index) => {
          return (
            <Input name={field} key={index} placeholder={placeholders[field]} />
          );
        })}
      </div>
      <div className="flex flex-grow justify-center px-1">
        <p
          className={`pr-[2px]
            ${
              perPaperResult.get(paper.id)
                ? "font-semibold"
                : "font-light text-gray-400"
            }`}
        >
          = {perPaperResult.get(paper.id)?.toFixed(2) || "total"}
        </p>
      </div>
    </div>
  );
}
