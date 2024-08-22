import { supabase } from "@db/supabase";
import { CostHistoryType } from "@/types";
import { useEffect, useState } from "react";
import { sortedByCreatedAt } from "@utils/tools";

export default function Trash() {
  document.title = "History Trash";

  const [historyData, setHistoryData] = useState<CostHistoryType[] | null>([]);
  useEffect(() => {
    const history = supabase
      .from("history")
      .select()
      .not("deleted_at", "is", null);
    history.then((data) => {
      setHistoryData(data.data);
    });
    console.log(historyData);
  }, []);

  return (
    <section className="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 py-5">
      <div className="flex gap-2 items-center justify-center w-full">
        <h1 className="text-xl text-center">History Trash</h1>
        <p className="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
          0
        </p>
      </div>
      <div className="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

      <div className="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
        <div className="relative flex flex-col justify-between h-full gap-3 w-full max-w-3xl py-2 z-0">
          {historyData?.length ? (
            <div className="flex flex-col gap-2 overflow-y-auto">
              {sortedByCreatedAt(historyData).map(() => {
                // <HistoryRow {cost} on:delete={(e) => handleDelete(e.detail)} />
                <p>Hello</p>;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">Trash is empty</p>
          )}

          {/* <div className="fixed flex h-[70%] w-[90%] items-center justify-center">
					<Loader />
				</div> */}
        </div>
      </div>
    </section>
  );
}
