import { supabase } from "@/db/supabase";
import { CostHistoryType } from "@/types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { sortedByCreatedAt } from "@/utils/tools";
import HistoryRow from "@/components/HistoryRow";
import { softDeleteHistory } from "@/utils/services";
import { toast } from "sonner";
import { useLoadingStore, useUserStore } from "@/store/index";

export default function History() {
  document.title = "History";
  const { setIsLoading } = useLoadingStore();
  const { userData } = useUserStore();
  const [historyData, setHistoryData] = useState<CostHistoryType[] | null>([]);

  const getHistory = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("history")
      .select()
      .eq("user", userData?.id)
      .is("deleted_at", null);
    setHistoryData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getHistory();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    await softDeleteHistory(id);
    toast.message("History moved to trash!");
    await getHistory();
    setIsLoading(false);
  };

  return (
    <section className="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 pt-5">
      <div className="flex gap-2 items-center justify-center w-full">
        <h1 className="text-xl text-center">History</h1>
        <p className="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
          {historyData?.length || 0}
        </p>
      </div>
      <div className="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

      <div className="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
        <div className="relative flex flex-col justify-between h-full gap-3 w-full max-w-3xl py-2 z-0">
          {historyData?.length ? (
            <div className="flex flex-col gap-2 overflow-y-auto">
              {sortedByCreatedAt(historyData).map((cost: CostHistoryType) => (
                <HistoryRow
                  cost={cost}
                  key={cost.id}
                  handleDelete={(id) => handleDelete(id)}
                />
              ))}
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
        </div>
      </div>
    </section>
  );
}
