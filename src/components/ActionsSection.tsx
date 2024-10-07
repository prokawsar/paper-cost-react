import Button from '@/components/Button'
import { MAX_PAPER } from '@/utils/constants'

export function ActionsSection({
  addPaper,
  clearAll,
  submitCalculate,
  fieldsLength,
  finalPrice,
}: {
  addPaper: () => void
  clearAll: () => void
  submitCalculate: () => void
  fieldsLength: number
  finalPrice: number
}) {
  return (
    <div className="flex flex-row justify-between w-full mt-3">
      <Button
        classNames="text-sm"
        onClick={addPaper}
        disabled={fieldsLength == MAX_PAPER}
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
      <Button onClick={submitCalculate}>
        {finalPrice > 0 ? 'Recalculate' : 'Calculate'}
      </Button>
    </div>
  )
}
