import { useSortable } from '@dnd-kit/sortable'
import Image from 'next/image'
import React from 'react'

export default function Card({
  id,
  name = 'Name Example',
  symbol = 'Symbol Example',
  image = '',
}: {
  id: string
  name?: string
  symbol?: string
  image?: string
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab touch-none rounded-md border p-3 active:cursor-grabbing ${
        isDragging
          ? 'z-10 opacity-50 shadow-md'
          : 'bg-white dark:border-gray-700 dark:bg-gray-800'
      }`}
      style={style}
    >
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={image}
          width={100}
          height={100}
          className="size-[40px]"
        />
        <div>{name}</div>
      </div>
      <div>{symbol}</div>
    </div>
  )
}
