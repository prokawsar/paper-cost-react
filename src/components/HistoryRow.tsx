import { CostHistoryType } from '@/types'
import { get40Percent } from '@/utils/services'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function HistoryRow({
  cost,
  isTrash = false,
  handleDelete,
  handleRestore,
}: {
  cost: CostHistoryType
  handleDelete: (id: string) => void
  handleRestore?: (id: string) => void
  isTrash?: boolean
}) {
  const [deleteConfirm, setDeleteConfirm] = useState('')

  return (
    <div className="flex flex-col gap-1 items-center w-full p-1 border border-dashed rounded shadow-sm">
      <Link
        to={`/history/${cost.id}`}
        className="flex flex-row items-center pl-1 justify-between w-full"
      >
        {cost.name && <p className="truncate w-[40%]">{cost.name}</p>}
        <p className="text-gray-500 text-sm truncate">
          {cost.final_price.toFixed(2)}
          <span className=" text-teal-600">
            ({(cost.final_price + get40Percent(cost.final_price)).toFixed(2)})
          </span>
        </p>
        <p className="w-fit text-[10px] text-gray-500 truncate">
          {dayjs(cost.created_at).format('DD-MM-YYYY')}
        </p>

        <div className="flex flex-row items-center gap-[2px]">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (handleRestore) handleRestore(cost.id)
            }}
            className={`border border-green-300 rounded text-green-600 p-[3px] w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45
          ${(cost.id == deleteConfirm || !isTrash) && 'hidden'}`}
          >
            <Icon icon="ic:round-settings-backup-restore" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDeleteConfirm(cost.id)
            }}
            className={`border border-red-300 rounded text-red-600 p-[3px] w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45 
              ${cost.id == deleteConfirm && 'hidden'}`}
          >
            <Icon
              icon={isTrash ? 'ic:baseline-delete-forever' : 'ph:trash-light'}
            />
          </button>
          {deleteConfirm == cost.id && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setDeleteConfirm('')
                }}
                className="border border-yellow-300 p-[3px] rounded text-yellow-600 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
              >
                <Icon icon="majesticons:multiply" width="16px" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete(cost.id)
                }}
                className="border border-green-300 p-[3px] rounded text-green-700 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
              >
                <Icon icon="teenyicons:tick-solid" width="15px" />
              </button>
            </>
          )}
        </div>
      </Link>
    </div>
  )
}
