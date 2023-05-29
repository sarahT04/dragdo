import React, { useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';

export default function Container() {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()));
    const [activeId, setActiveId] = useState<number | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as number);
    }, []);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        const { id: activeId } = active;
        const { id: overId } = over!;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(activeId);
                const newIndex = items.indexOf(overId);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid>
                    {items.map((id) => (
                        <SortableItem key={id} id={id} />
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
}
