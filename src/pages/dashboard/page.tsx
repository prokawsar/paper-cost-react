import Button from "@components/Button";
import { MAX_PAPER, paperFields } from "@utils/constants";
import { makeid } from "@utils/tools";
import Result from "@components/Result";
import { useState } from "react";
import PaperItem from "@components/PaperItem";
import { Paper } from "@/types/index";

export default function Dashboard() {
  document.title = "Paper Cost";

  const [finalPrice, setFinalPrice] = useState(0);
  const [showSaveHistory, setShowSaveHistory] = useState(false);
  const [paperCount, setPaperCount] = useState([
    { ...paperFields, id: makeid(5) },
  ]);

  const addPaper = () => {};
  const clearAll = () => {};
  const calculatePaperCost = () => {};

  return (
    <section className="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-3 px-4 py-3">
      <h1 className="text-xl text-center text-teal-500 font-semibold">
        Paper Cost
      </h1>
      <div className="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
      <div className="flex flex-col w-full justify-between gap-2 h-[90%] items-center">
        <div className="flex w-full gap-1 items-start">
          <input
            type="text"
            placeholder="Product name"
            className="border-b py-[2px] border-dashed w-full h-full px-2 focus:outline-none focus:border-teal-500"
          />
          {showSaveHistory && (
            <Button classNames="text-sm animate-pulse !w-[30%] !px-1">
              Save cost
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-[2px] overflow-y-auto max-w-3xl max-h-[85%] py-2 w-full">
          {paperCount.map((paper: Paper, index) => {
            return (
              <PaperItem
                key={index}
                index={index}
                paper={paper}
                totalPaper={paperCount.length}
              />
            );
          })}
        </div>

        <div className="flex flex-col justify-center max-w-3xl w-full gap-4">
          <div className="flex flex-row justify-between w-full mt-3">
            <Button
              classNames="text-sm"
              onClick={addPaper}
              disabled={paperCount.length == MAX_PAPER}
            >
              Add paper
            </Button>

            {finalPrice > 0 && (
              <button
                className="border border-red-200 rounded-md px-3 py-1 text-red-400 w-fit"
                onClick={clearAll}
              >
                Clear
              </button>
            )}
            {/* TODO: Set disabled state */}
            <Button onClick={calculatePaperCost}>Calculate </Button>
          </div>

          {finalPrice > 0 && (
            <div className="font-bold text-lg flex w-full">
              <Result total={finalPrice} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
