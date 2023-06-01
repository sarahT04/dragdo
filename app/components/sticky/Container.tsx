import React, { useCallback, SetStateAction } from 'react';
import {
    DndContext,
    closestCenter,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
// Touch sensor might be wrong and might produce errors.
import { MouseSensor, TouchSensor } from '../overrides';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';

type StickyProps = {
    items: stickyDataType[];
    setItems: React.Dispatch<SetStateAction<stickyDataType[]>>;
    activeData: stickyDataType | null;
    setActiveData: React.Dispatch<SetStateAction<stickyDataType | null>>;
}

export default function Container({ items, setItems, activeData, setActiveData }: StickyProps) {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const currentActiveData = items.find((item) => item.id === event.active.id);
        setActiveData(currentActiveData ? currentActiveData : null);
    }, [items, setActiveData]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveData(null);
        // Make API call to save data here
    }, [setActiveData, setItems]);

    const handleDragCancel = useCallback(() => {
        setActiveData(null);
    }, [setActiveData]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy} >
                <Grid>
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} item={item}  />
                    ))}
                    <SortableItem id="create new" item={items[0]} noMenu />
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeData ? <Item id={activeData.id} isDragging item={activeData} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
