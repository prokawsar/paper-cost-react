import Button from '@/components/Button'
// import { Button } from 'antd'
import { paperFields } from '@/utils/constants'
import { checkEmptyFields, makeid } from '@/utils/tools'
import Result from '@/components/Result'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Paper } from '@/types/index'
import { fields as paperFieldsName, placeholders } from '@/utils/constants'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { calculateCost } from '@/utils/services'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductName } from '@/components/ProductName'
import { ActionsSection } from '@/components/ActionsSection'
import PerPaperSum from '@/components/PerPaperSum'

export default function Dashboard() {
  document.title = 'Paper Cost'

  const [finalPrice, setFinalPrice] = useState(0)
  const [isCostCalculated, setIsCostCalculated] = useState(false)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const currentFocus = useRef<number | null>(null)

  const {
    handleSubmit,
    control,
    register,
    reset,
    getValues,
    setError,
    watch,
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

  let totalInput = 0

  const addPaper = () => {
    append({ ...paperFields, uid: makeid(5) })
    setIsCostCalculated(false)
  }

  const removePaper = (index: number) => {
    if (fields.length === 1) return
    remove(index)
    inputRefs.current.splice(index, 4)
    totalInput = inputRefs.current.length
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

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const currentInput = inputRefs.current.findIndex(
        (input) => input === document.activeElement,
      )
      if (currentInput < inputRefs.current.length - 1) {
        inputRefs.current[currentInput + 1].focus()
        currentFocus.current = currentInput + 1
      }
    }
  }

  useEffect(() => {
    const { unsubscribe } = watch(() => {
      setIsCostCalculated(false)
    })
    return () => unsubscribe()
  }, [watch])

  useEffect(() => {
    const [results, total] = calculateResult || []
    if (total && total > 0) {
      setFinalPrice(total)
    }
  }, [calculateResult])

  useEffect(() => {
    if (currentFocus.current != null) {
      if (currentFocus.current > fields.length * 4) {
        currentFocus.current = 0
      } else {
        inputRefs.current?.[currentFocus.current]?.focus()
      }
    }
  }, [fields])

  useEffect(() => {
    document.addEventListener('keydown', handleEnterKey)
    return () => {
      document.removeEventListener('keydown', handleEnterKey)
    }
  }, [])

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
                      onClick={() => removePaper(index)}
                      className="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
                    >
                      <Icon icon="ph:trash-light" width="16px" />
                    </Button>

                    {paperFieldsName.map((fieldName, paperIndex) => {
                      const { ref, ...rest } = register(
                        `papers.${index}.${fieldName}`,
                      )
                      return (
                        <input
                          onClick={() =>
                            (currentFocus.current = index * 4 + paperIndex)
                          }
                          ref={(el) => {
                            ref(el)
                            if (el) inputRefs.current[totalInput++] = el
                          }}
                          className={`border ${
                            errors.papers?.[index]?.[fieldName]
                              ? 'border-red-500'
                              : 'border-gray-400'
                          }  w-12 md:w-full p-1 rounded focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none`}
                          type="number"
                          key={`${paper.uid}-${paperIndex}`}
                          placeholder={placeholders[fieldName]}
                          {...rest}
                        />
                      )
                    })}
                  </div>
                  <PerPaperSum
                    paperId={paper.uid}
                    calculateResult={calculateResult?.[0]}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center max-w-3xl w-full gap-4">
          <ActionsSection
            addPaper={addPaper}
            clearAll={clearAll}
            submitCalculate={handleSubmit(calculatePaperCost)}
            fieldsLength={fields.length}
            finalPrice={finalPrice}
          />

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
