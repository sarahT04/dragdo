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


type StickyProps = {
    todos: stickyDataType[] | null;
    setTodos: Dispatch<SetStateAction<stickyDataType[] | null>>;
    activeData: stickyDataType | null;
    setActiveData: Dispatch<SetStateAction<stickyDataType | null>>;
}

export default function Container({ todos, setTodos, activeData, setActiveData }: StickyProps) {

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const currentActiveData = todos!.find((item) => item.id === event.active.id);
        setActiveData(currentActiveData ? currentActiveData : null);
    }, [todos, setActiveData]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTodos((todos) => {
                const oldIndex = todos!.findIndex((item) => item.id === active.id)
                const newIndex = todos!.findIndex((item) => item.id === over?.id);

                return arrayMove(todos!, oldIndex, newIndex);
            });
        }

        setActiveData(null);
        // Make API call to save data here
    }, [setActiveData, setTodos]);

    const handleDragCancel = useCallback(() => {
        setActiveData(null);
    }, [setActiveData]);

    return (
        <>
            {
                todos === null
                    ?
                    <Grid>
                        <Item noMenu id="create new" title="Add new to-do" />
                    </Grid>
                    :
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
                                    todos.map((item) => {
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

            }
        </>
    );
}
