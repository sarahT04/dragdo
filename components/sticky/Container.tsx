import React, { useCallback, SetStateAction, useContext } from 'react';
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
import { StickyContext } from '../context/todos';

export default function Container() {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const { todos, setTodos, activeData, setActiveData } = useContext(StickyContext)!;

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const currentActiveData = todos!.find((item) => item.id === event.active.id);
        setActiveData(currentActiveData ? currentActiveData : null);
    }, [todos, setActiveData]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTodos((todos: stickyDataType[]) => {
                const oldIndex = todos.findIndex((item: stickyDataType) => item.id === active.id)
                const newIndex = todos.findIndex((item: stickyDataType) => item.id === over?.id);

                return arrayMove(todos, oldIndex, newIndex);
            });
        }

        setActiveData(null);
        // Make API call to save data here
    }, [setActiveData, setTodos]);

    const handleDragCancel = useCallback(() => {
        setActiveData(null);
    }, [setActiveData]);

    const handleSort = (sortType: string) => {
        if (sortType === 'pinned') {
            const sortedtodos = todos!.sort((a) => a.pinned ? -1 : 1);
            setTodos(sortedtodos);
            return sortedtodos;
        } else if (sortType === 'sequence') {
            const sortedtodos = todos!.sort((a, b) => a.sequence > b.sequence ? 1 : -1);
            setTodos(sortedtodos);
            return sortedtodos;
        }
        return todos;
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={todos!} strategy={rectSortingStrategy} >
                <Grid>
                    {
                        handleSort('sequence')!
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
                    <Item id="create new" noMenu title="Add new to-do" />
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeData ? <Item id={activeData.id} isDragging item={activeData} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
