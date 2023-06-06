import React, { useCallback, Dispatch, SetStateAction, useState, useEffect } from 'react';
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
import { moveSticky } from '@/utils/apiCalls';
import { toast } from 'react-hot-toast';
import { allDatas } from './datasType';
import useSWRSubscription from 'swr/subscription'
import { subscribeTodaySticky } from '@/utils/service';

type FromToType = {
    sequence: number;
    id: string;
}

type StickyProps = {
    activeData: stickyDataType | null;
    setActiveData: Dispatch<SetStateAction<stickyDataType | null>>;
    initialData: stickyDataType[] | null;
}

function AddNewSticky({ loading = false }: { loading?: boolean }) {
    return (
        <Grid>
            <Item noMenu id="create new" title="Add new to-do" className="relative opacity-20 pointer-events-none" />
            {
                loading
                    ? <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    : null
            }
        </Grid>
    );
}


export default function Container({ activeData, setActiveData, initialData }: StickyProps) {
    const [todos, setTodos] = useState(initialData);
    const [error, setError] = useState(false);

    if (error) {
        toast.error("Error happened when retreiving your sticky. Sorry");
    };
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const currentActiveData = todos!.find((item) => item.id === event.active.id);
        setActiveData(currentActiveData ? currentActiveData : null);
    }, [todos, setActiveData]);

    const moveStickyData = useCallback(async (from: FromToType, to: FromToType) => {
        const res = await moveSticky(from, to);
        if (!res.success) {
            setError(true)
        };
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        const todosCopy = [...todos!]

        if (active.id !== over?.id) {
            const oldIndex = todosCopy.findIndex((item) => item.id === active.id);
            const newIndex = todosCopy.findIndex((item) => item.id === over?.id);

            const oldTodo = todosCopy[oldIndex];
            const oldTodoSequence = oldTodo.sequence;
            const newTodo = todosCopy[newIndex];
            const from = { id: oldTodo.id, sequence: oldTodo.sequence };
            const to = { id: newTodo.id, sequence: newTodo.sequence };
            oldTodo.sequence = newTodo.sequence;
            newTodo.sequence = oldTodoSequence;
            const newArray = arrayMove(todosCopy, oldIndex, newIndex);
            moveStickyData(from, to);
            setTodos(newArray);
        }
        setActiveData(null);
        // Make API call to save data here
    }, [todos, setActiveData, moveStickyData]);

    const handleDragCancel = useCallback(() => {
        setActiveData(null);
    }, [setActiveData]);

    return (
        <>
            {
                todos === null
                    ?
                    <AddNewSticky />
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
