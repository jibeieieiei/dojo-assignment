import { CoinType } from '@/types/CoinType'
import Card from './Card'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function Column({
  id,
  title,
  coins,
}: {
  id: string
  title: string
  coins: CoinType[]
}) {
  const { setNodeRef } = useDroppable({
    id: id,
  })
  return (
    <div
      className="w-full  bg-gray-200 flex flex-col p-6 gap-4"
      ref={setNodeRef}
    >
      <div className="text-2xl font-bold mb-4">{title}</div>
      <div className="flex flex-col gap-2">
        <SortableContext
          items={coins.map((coin) => coin.id)}
          strategy={verticalListSortingStrategy}
        >
          {coins.map((item) => (
            <Card
              id={item.id}
              key={item.name}
              name={item.name}
              symbol={item.symbol}
              image={item.image}
            />
          ))}
        </SortableContext>
      </div>
      {coins.length === 0 ? (
        <div className="text-xl rounded-md border p-6 bg-white">Drop here</div>
      ) : null}
    </div>
  )
}
