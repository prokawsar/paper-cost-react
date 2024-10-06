// import Button from '@/components/Button'
import { MAX_PAPER, paperFields } from '@/utils/constants'
import { checkEmptyFields, makeid } from '@/utils/tools'
import Result from '@/components/Result'
import { useEffect, useMemo, useState } from 'react'
import { Paper } from '@/types/index'
import { fields as paperFieldsName, placeholders } from '@/utils/constants'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { calculateCost } from '@/utils/services'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from 'antd'
import { ProductName } from '@/components/ProductName'

export default function Dashboard() {
  document.title = 'Paper Cost'

  const [finalPrice, setFinalPrice] = useState(0)
  const [isCostCalculated, setIsCostCalculated] = useState(false)

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
    defaultValues: { papers: [{ ...paperFields, uid: makeid(5) }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'papers',
  })

  const addPaper = () => {
    append({ ...paperFields, uid: makeid(5) })
    setIsCostCalculated(false)
  }

  const clearAll = () => {
    reset({ papers: [{ ...paperFields, uid: makeid(5) }] })
    setFinalPrice(0)
    setIsCostCalculated(false)
  }

  const calculateResult = useMemo<[Map<string, number>, number] | null>(() => {
    if (isCostCalculated) {
      const results = new Map<string, number>()
      const papers = getValues('papers')

      let total = 0
      papers.forEach((paper) => {
        const totalPerPaper = calculateCost(paper)
        results.set(paper.uid, totalPerPaper)
        total += totalPerPaper
      })
      return [results, total]
    }
    return null
  }, [isCostCalculated, getValues('papers')])

  const calculatePaperCost: SubmitHandler<{ papers: Paper[] }> = (data) => {
    const hasEmptyFields = checkEmptyFields(data, setError)
    if (hasEmptyFields) {
      toast.warning('Please fill in all required fields')
      return
    }
    setIsCostCalculated(true)
  }

  useEffect(() => {
    const [results, total] = calculateResult || []
    if (total && total > 0) {
      setFinalPrice(total)
    }
  }, [calculateResult])

  return (
    <section className="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-3 px-4 py-3">
      <h1 className="text-xl text-center text-teal-500 font-semibold">
        Paper Cost
      </h1>
      <div className="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
      <div className="flex flex-col w-full justify-between gap-2 h-[90%] items-center">
        <ProductName
          finalPrice={finalPrice}
          papers={getValues('papers')}
          showSaveHistory={isCostCalculated}
        />
        <div className="flex flex-col gap-[2px] overflow-y-auto overflow-x-hidden max-w-3xl max-h-[85%] py-2 w-full">
          <AnimatePresence>
            {fields.map((paper: Paper, index) => {
              return (
                <motion.div
                  key={paper.uid}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-row items-center justify-between rounded"
                >
                  <div className="flex flex-row gap-[3px] items-center overflow-x-auto">
                    <Button
                      disabled={fields.length === 1}
                      onClick={() => {
                        if (fields.length === 1) return
                        remove(index)
                      }}
                      className="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
                    >
                      <Icon icon="ph:trash-light" width="16px" />
                    </Button>

                    {paperFieldsName.map((fieldName, paperIndex) => {
                      return (
                        <input
                          className={`border ${
                            errors.papers?.[index]?.[fieldName]
                              ? 'border-red-500'
                              : 'border-gray-400'
                          }  w-12 md:w-full p-1 rounded focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none`}
                          type="number"
                          key={`${paper.uid}-${paperIndex}`}
                          placeholder={placeholders[fieldName]}
                          {...register(`papers.${index}.${fieldName}`)}
                        />
                      )
                    })}
                  </div>
                  <div className="flex flex-grow justify-center px-1">
                    <p
                      className={`pr-[2px] ${
                        calculateResult?.[0]?.has(paper.uid)
                          ? 'font-semibold'
                          : 'font-light text-gray-400'
                      }`}
                    >
                      {calculateResult?.[0]?.get(paper.uid)?.toFixed(2) ||
                        'total'}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center max-w-3xl w-full gap-4">
          <div className="flex flex-row justify-between w-full mt-3">
            <Button
              type="default"
              className="text-sm"
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
