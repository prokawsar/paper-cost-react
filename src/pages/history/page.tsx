import { supabase } from "@db/supabase";
import { CostHistoryType } from "@/types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { sortedByCreatedAt } from "@utils/tools";

export default function History() {
  document.title = "History";

  const [historyData, setHistoryData] = useState<CostHistoryType[] | null>([]);
  useEffect(() => {
    const history = supabase.from("history").select().is("deleted_at", null);
    history.then((data) => {
      setHistoryData(data.data);
    });
    console.log(historyData);
  }, []);

  return (
    <section className="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 pt-5">
      <h1 className="text-xl text-center">History</h1>
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
            <p className="text-center text-gray-500">No history yet</p>
          )}
          <Link
            to="/history/trash"
            className="py-1 flex items-center justify-center gap-1 w-full text-center border rounded text-gray-600"
          >
            <Icon icon="ph:trash-light" width="16px" />
            History Trash
          </Link>

          {/* <div className="fixed flex h-[70%] w-[90%] items-center justify-center">
					<Loader />
				</div> */}
        </div>
      </div>
    </section>
  );
}
