import { Paper } from '@/types'
import type { UseFormSetError } from 'react-hook-form'

export function makeid(length: number) {
  let str = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return str
}

export const sortedByCreatedAt = (data: any) => {
  return data.sort((a: any, b: any) => {
    // Convert 'created_at' strings to Date objects
    let dateA = new Date(a.created_at)
    let dateB = new Date(b.created_at)

    if (dateA > dateB) return -1
    if (dateA < dateB) return 1
    return 0
  })
}

export const checkEmptyFields = (
  data: { papers: Paper[] },
  setError: UseFormSetError<{ papers: Paper[] }>,
) => {
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
