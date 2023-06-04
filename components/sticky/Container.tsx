import React, { useCallback, Dispatch, SetStateAction, useEffect } from 'react';
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

type sortTypes = 'pinned' | 'sequence';

type StickyProps = {
    todos: stickyDataType[];
    setTodos: Dispatch<SetStateAction<stickyDataType[]>>;
    activeData: stickyDataType | null;
    setActiveData: Dispatch<SetStateAction<stickyDataType | null>>;
}

export default function Container({ todos, setTodos, activeData, setActiveData }: StickyProps) {

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const handleSort = useCallback((sortTypes: sortTypes[]) => {
        let sortedItems: stickyDataType[] = [...todos!];

        for (const sortType of sortTypes) {
            if (sortType === 'pinned') {
                sortedItems.sort((a, b) => (a.pinned && !b.pinned) ? -1 : 1);
            } else if (sortType === 'sequence') {
                sortedItems.sort((a, b) => a.sequence - b.sequence);
            }
        }
        setTodos(sortedItems);
        return sortedItems;
    }, [setTodos, todos])

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const currentActiveData = todos!.find((item) => item.id === event.active.id);
        setActiveData(currentActiveData ? currentActiveData : null);
    }, [todos, setActiveData]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTodos((todos) => {
                const oldIndex = todos.findIndex((item) => item.id === active.id)
                const newIndex = todos.findIndex((item) => item.id === over?.id);

                return arrayMove(todos, oldIndex, newIndex);
            });
        }

        setActiveData(null);
        // Make API call to save data here
    }, [setActiveData, setTodos]);

    const handleDragCancel = useCallback(() => {
        setActiveData(null);
    }, [setActiveData]);

    useEffect(() => {
        handleSort(['sequence', 'pinned']);
    }, [handleSort])


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={todos} strategy={rectSortingStrategy} >
                <Grid>
                    {
                        todos
                            .map((item) => {
                                const { pinned } = item;
                                if (pinned) {
                                    return (
                                        <Item key={item.id} id={item.id} item={item} />
                                    )
                                }
                                return (
                                    <SortableItem key={item.id} id={item.id} item={item} />
                                )
                            })}
                    <Item noMenu id="create new" title="Add new to-do" />
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeData ? <Item id={activeData.id} isDragging item={activeData} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
