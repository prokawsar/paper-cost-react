import Button from '@/components/Button'
import { MAX_PAPER, paperFields } from '@/utils/constants'
import { makeid } from '@/utils/tools'
import Result from '@/components/Result'
import { useState } from 'react'
import { CostHistoryType, Paper } from '@/types/index'
import { fields as paperFieldsName, placeholders } from '@/utils/constants'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { addHistory, calculateCost } from '@/utils/services'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import { useUserStore } from '@/store'

export default function Dashboard() {
  document.title = 'Paper Cost'

  const [finalPrice, setFinalPrice] = useState(0)
  const [productName, setProductName] = useState('')
  const [showSaveHistory, setShowSaveHistory] = useState(false)
  const [perPaperResult, setPerPaperResult] = useState<Map<string, number>>(
    new Map(),
  )
  const { userData } = useUserStore()

  const {
    handleSubmit,
    control,
    register,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<{
    papers: Paper[]
  }>({
    defaultValues: { papers: [{ ...paperFields, id: makeid(5) }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'papers',
  })

  const addPaper = () => {
    append({ ...paperFields, id: makeid(5) })
    setShowSaveHistory(false)
  }

  const clearAll = () => {
    reset({ papers: [{ ...paperFields, id: makeid(5) }] })
    setFinalPrice(0)
    setProductName('')
    setShowSaveHistory(false)
    perPaperResult.clear()
  }

  const checkEmptyFields = (data: { papers: Paper[] }) => {
    const fieldNames = Object.keys(data.papers[0]).filter((key) => key !== 'id')

    let emptyState = false
    data.papers.forEach((paper, index) => {
      fieldNames.forEach((fieldName) => {
        if (paper[fieldName as keyof Paper] === '') {
          emptyState = true
          setError(`papers.${index}.${fieldName}`, {
            type: 'manual',
            message: 'This field is required',
          })
        }
      })
    })
    return emptyState
  }

  const calculatePaperCost: SubmitHandler<{ papers: Paper[] }> = (data) => {
    // TODO: Fix Map integration
    // perPaperResult.clear();

    const hasEmptyFields = checkEmptyFields(data)
    if (hasEmptyFields) {
      toast.warning('Please fill in all required fields')
      return
    }

    const { papers } = data
    const results = new Map<string, number>()

    let total = 0
    papers.forEach((paper) => {
      const totalPerPaper = calculateCost(paper)
      results.set(paper.id, totalPerPaper)
      total += totalPerPaper
    })

    // setPerPaperResult(new Map(results))
    setPerPaperResult((prevState) => {
      const newState = new Map(prevState)
      results.forEach((value, key) => {
        newState.set(key, value)
      })
      return newState
    })
    console.log('Per paper results:', Object.fromEntries(results))
    setFinalPrice(total)
    setShowSaveHistory(true)
  }

  const saveHistory = async () => {
    if (!productName.trim()) {
      toast.warning('Please enter a product name')
      return
    }

    const papers = getValues('papers')

    if (!papers || papers.length === 0) {
      toast.error('No paper details to save')
      return
    }

    const historyData: CostHistoryType = {
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

        <div className="flex flex-col gap-[2px] overflow-y-auto max-w-3xl max-h-[85%] py-2 w-full">
          {fields.map((paper: Paper, index) => {
            return (
              <div
                key={paper.id}
                className="flex flex-row items-center justify-between rounded"
              >
                <div className="flex flex-row gap-[3px] items-center overflow-x-auto">
                  <button
                    disabled={fields.length === 1}
                    onClick={() => {
                      if (fields.length === 1) return
                      remove(index)
                    }}
                    className="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
                  >
                    <Icon icon="ph:trash-light" width="16px" />
                  </button>

                  {paperFieldsName.map((fieldName, paperIndex) => {
                    return (
                      <input
                        className={`border ${
                          errors.papers?.[index]?.[fieldName]
                            ? 'border-red-500'
                            : 'border-gray-400'
                        }  w-12 md:w-full p-1 rounded focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none`}
                        type="number"
                        key={`${paper.id}-${paperIndex}`}
                        placeholder={placeholders[fieldName]}
                        {...register(`papers.${index}.${fieldName}`)}
                      />
                    )
                  })}
                </div>
                <div className="flex flex-grow justify-center px-1">
                  <p
                    className={`pr-[2px] ${
                      perPaperResult.has(paper.id)
                        ? 'font-semibold'
                        : 'font-light text-gray-400'
                    }`}
                  >
                    = {perPaperResult.get(paper.id)?.toFixed(2) || 'total'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col justify-center max-w-3xl w-full gap-4">
          <div className="flex flex-row justify-between w-full mt-3">
            <Button
              classNames="text-sm"
              onClick={addPaper}
              disabled={fields.length == MAX_PAPER}
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
            <Button onClick={handleSubmit(calculatePaperCost)}>
              {finalPrice > 0 ? 'Recalculate' : 'Calculate'}
            </Button>
          </div>

          {finalPrice > 0 && (
            <div className="font-bold text-lg flex w-full">
              <Result total={finalPrice} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
