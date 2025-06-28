'use client'
import { CONTAINERS, PRICE } from './data'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { useState } from 'react'
import Column from '@/components/Column'
import { ContainerType } from '@/types/ContainerType'
import Charts from '@/components/Charts'

export default function Home() {
  const [containers, setContainers] = useState<ContainerType[]>(CONTAINERS)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    })
  )

  const findContainerId = (coinId: UniqueIdentifier) => {
    if (containers.some((container) => container.id === coinId)) {
      return coinId
    }
    return containers.find((container) =>
      container.coins.some((item) => item.id === coinId)
    )?.id
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    console.log(event, containers, 'over container')

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainerId(activeId)
    const overContainer = findContainerId(overId) || overId

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setContainers((prev) => {
      const activeContainerIndex = prev.findIndex(
        (container) => container.id === activeContainer
      )
      const overContainerIndex = prev.findIndex(
        (container) => container.id === overContainer
      )

      const activeItems = prev[activeContainerIndex].coins
      const overItems = prev[overContainerIndex].coins

      const activeIndex = activeItems.findIndex((item) => item.id === activeId)
      const overIndex = overItems.findIndex((item) => item.id === overId)

      let newIndex: number
      if (containers.some((container) => container.id === overId)) {
        newIndex = overItems.length
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1
        const modifier = isBelowOverItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length
      }

      const activeCoin = activeItems[activeIndex]
      const updatedCoin = { ...activeCoin, status: overContainer.toString() }

      return prev.map((container, index) => {
        if (index === activeContainerIndex) {
          return {
            ...container,
            coins: container.coins.filter((coin) => coin.id !== activeId),
          }
        } else if (index === overContainerIndex) {
          const newCoins = [...container.coins]
          newCoins.splice(newIndex, 0, updatedCoin)
          return {
            ...container,
            coins: newCoins,
          }
        }
        return container
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainerId(activeId)
    const overContainer = findContainerId(overId) || overId

    if (!activeContainer || !overContainer) {
      return
    }

    if (activeContainer === overContainer) {
      setContainers((prev) => {
        const containerIndex = prev.findIndex(
          (container) => container.id === activeContainer
        )
        const items = prev[containerIndex].coins

        const activeIndex = items.findIndex((item) => item.id === activeId)
        const overIndex = items.findIndex((item) => item.id === overId)

        return prev.map((container, index) => {
          if (index === containerIndex) {
            return {
              ...container,
              coins: arrayMove(container.coins, activeIndex, overIndex),
            }
          }
          return container
        })
      })
    }
  }

  const handleMoveBack = (id: UniqueIdentifier) => {
    const containerId = findContainerId(id)
    const items = containers
      .find((container) => container.id === containerId)
      ?.coins.find((item) => item.id === id)
    if (items) {
      setContainers((prev) => {
        return prev.map((container) =>
          container.id === containerId
            ? {
                ...container,
                coins: container.coins.filter((item) => item.id !== id),
              }
            : {
                ...container,
                coins: [...container.coins, items],
              }
        )
      })
    }
  }

  return (
    <div className="w-full flex h-screen">
      <section className="flex-1 flex h-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full flex gap-6 h-full">
            {containers.map((container) => (
              <SortableContext
                key={container.id}
                items={container.coins.map((coin) => coin.id)}
              >
                <Column
                  id={container.id}
                  title={container.title}
                  coins={container.coins}
                />
              </SortableContext>
            ))}
          </div>
        </DndContext>
      </section>

      <div className="ml-6 w-full flex flex-col items-center gap-4 p-4 bg-blue-400 max-w-[1000px] overflow-y-auto">
        <span className="font-bold text-2xl self-start">Chart</span>
        <div className="flex items-center gap-4 *:bg-white flex-wrap">
          {containers
            .filter((item) => item.id === 'watch')
            .map((item) =>
              item.coins.map((c) => {
                const data = PRICE.find((p) => p.name === c.symbol)

                if (data) {
                  return (
                    <Charts key={c.id} data={data.value} date={data.date} />
                  )
                } else {
                  return (
                    <div
                      className="border border-red-500 text-red-700 w-[450px] h-[225px] flex flex-col justify-center items-center "
                      key={c.id}
                    >
                      <span>no {c.symbol} Data please move back</span>
                      <button
                        onClick={() => {
                          handleMoveBack(c.id)
                        }}
                        className="cursor-pointer hover:bg-red-300 underline mt-2"
                      >
                        Move Back Right Here
                      </button>
                    </div>
                  )
                }
              })
            )}
        </div>
      </div>
    </div>
  )
}
