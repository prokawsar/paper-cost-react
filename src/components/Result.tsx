import { get40Percent } from "@/utils/services";

export default function Result({ total }: { total: number }) {
  return (
    <div className="flex flex-col gap-1 w-full border shadow-md rounded py-1 px-2">
      <div className="flex flex-row justify-between">
        <p className="text-teal-600">Total:</p>
        <p>{total.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-teal-600">Total with (40%):</p>
        <p>{(total + get40Percent(total)).toFixed(2)}</p>
      </div>
    </div>
  );
}
