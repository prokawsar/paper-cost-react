import Input from "@/components/Input";
import Result from "@/components/Result";
import { CostHistoryType, Paper } from "@/types/index";
import { calculateCost, getHistory } from "@/utils/services";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoadingStore } from "@/store/index";

export default function HistoryDetail() {
  const params = useParams();
  const [history, setHistory] = useState<CostHistoryType | null>(null);
  const { setIsLoading } = useLoadingStore();

  const fetchHistory = async () => {
    if (params.id) {
      setIsLoading(true);
      const data = await getHistory(params.id);
      if (data) {
        setHistory(data[0]);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <section className="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 pt-5">
      <div className="flex gap-2 items-center justify-center w-full">
        <h1 className="text-xl text-center">Cost Detail</h1>
      </div>
      <div className="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
      {history && (
        <>
          <div className="flex flex-row justify-between px-1 gap-2 items-center">
            <div className="flex flex-row gap-1 justify-between flex-grow">
              <p className="truncate max-w-44">{history.name || ""}</p>
            </div>
            <h1 className="text-sm text-center flex text-gray-500">
              {dayjs(history.created_at).format("DD-MM-YYYY hh:mmA")}
            </h1>
          </div>

          <div className="flex flex-col w-full justify-between gap-3 h-[85%] items-center">
            <div className="flex flex-col overflow-y-auto w-full max-w-3xl py-2">
              {history.papers.map((paper: Paper, index) => {
                return (
                  <div className="w-full" key={index}>
                    <div className="flex flex-row w-full gap-1 items-center justify-between overflow-y-auto p-[2px]">
                      <Input name="length" value={paper.length} disabled />
                      <Input name="width" value={paper.width} disabled />
                      <Input
                        name="thickness"
                        value={paper.thickness}
                        disabled
                      />
                      <Input name="rate" value={paper.rate} disabled />
                      <div className="flex justify-center">
                        <p className="font-semibold">
                          = {calculateCost(paper).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="font-bold text-lg mt-2 flex w-full">
                <Result total={history.final_price} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
