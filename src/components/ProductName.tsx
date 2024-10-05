import { useEffect, useState } from 'react'
import Button from './Button'
import { toast } from 'sonner'
import { addHistory } from '@/utils/services'
import { CostHistoryType, Paper } from '@/types'
import { useUserStore } from '@/store'

type Props = {
  showSaveHistory: boolean
  papers: Paper[]
  finalPrice: number
}

export function ProductName({ showSaveHistory, papers, finalPrice }: Props) {
  const [productName, setProductName] = useState('')
  const { userData } = useUserStore()

  useEffect(() => {
    if (finalPrice == 0) setProductName('')
  }, [finalPrice])

  const saveHistory = async () => {
    if (!productName.trim()) {
      toast.warning('Please enter a product name')
      return
    }

    if (!papers || papers.length === 0) {
      toast.error('No paper details to save')
      return
    }

    const historyData: CostHistoryType = {
      id: '', // it will not pass to supabase, see addHistory()
      name: productName,
      final_price: finalPrice,
      papers: papers,
      user: userData?.id || '',
    }

    const response = await addHistory(historyData)

    if (response && response?.message.indexOf('TypeError') != -1) {
      toast.error('Failed to save history, you are offline!')
      return
    }
    //TODO: set total history to limit saving history
    // totalHistoryStore = await getTotalHistory()
    toast.success('Cost details saved successfully')
  }

  return (
    <div className="flex w-full gap-1 items-start">
      <input
        type="text"
        placeholder="Product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border-b py-[2px] border-dashed w-full h-full px-2 focus:outline-none focus:border-teal-500"
      />
      {showSaveHistory && (
        <Button
          onClick={saveHistory}
          classNames="text-sm animate-pulse !w-[30%] !px-1"
        >
          Save cost
        </Button>
      )}
    </div>
  )
}
