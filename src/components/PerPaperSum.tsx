export default function PerPaperSum({
  paperId,
  calculateResult,
}: {
  paperId: string
  calculateResult: Map<string, number> | undefined
}) {
  return (
    <div className="flex flex-grow justify-center px-1">
      <p
        className={`pr-[2px] ${
          calculateResult?.has(paperId)
            ? 'font-semibold'
            : 'font-light text-gray-400'
        }`}
      >
        {calculateResult?.get(paperId)?.toFixed(2) || 'total'}
      </p>
    </div>
  )
}
