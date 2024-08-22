import Result from "@components/Result";
import { useState } from "react";

export default function Dashboard() {
  const [finalPrice, setFinalPrice] = useState(0);

  document.title = "Paper Cost";

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
        </div>

        <div className="flex flex-col justify-center max-w-3xl w-full gap-4">
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
