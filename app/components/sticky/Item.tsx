import React, { forwardRef, HTMLAttributes, useContext, useState } from 'react';
import Importance from '../rating/Importance';
import ItemDropdown from '../dropdown/ItemDropdown';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    item: stickyDataType;
    noMenu?: boolean;
};

function formatDateTime(date: Date) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    } as const;
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(({ id, withOpacity, isDragging, className, noMenu = false, item, ...props }, ref) => {
    const { title, body, created, updated, color, pinned: userPinned, importance } = item;
    // const onEdit = 
    const [pinned, setPinned] = useState(userPinned);
    const formattedUpdate = formatDateTime(updated);
    const formattedCreated = formatDateTime(created);
    // TODO below
    const userId = "";
    const changePin = (userId: string, todoId: string) => null
    const handlePin = () => { setPinned(!pinned); changePin(userId, id); };
    return (
        <section className={`${withOpacity ? "opacity-50" : "opacity-100"} p-2
        h-72 w-full inverse-dark-mode rounded-md drop-shadow-xl group relative
        ${isDragging ? "shadow-2xl scale-105 cursor-grabbing" : "cursor-grab scale-100"} 
        flex flex-col ${className ? className : ''}`}
            ref={ref} {...props}
        >
            {
                noMenu
                    ? null

                    : <div aria-label='pinned and settings dropdown'
                        data-no-dnd="true"
                        className="cursor-pointer inline-flex absolute right-2 top-3"
                    >
                        {/* In the future, we're using pins. If pinned means filled, non is outlined. */}
                        <Transition
                            className="absolute right-0 top-0"
                            show={pinned}
                            enter="transition-all ease-in-out duration-500 delay-[200ms]"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-all ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <LockClosedIcon className='w-6 h-6 mt-1 mr-2' title="Unpin this to-do" onClick={handlePin} />
                        </Transition>
                        <Transition
                            show={!pinned}
                            enter="transition-all ease-in-out duration-500 delay-[200ms]"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-all ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="group-hover:opacity-100 opacity-0 inline-flex transition-opacity">
                                <LockOpenIcon className='w-6 h-6 mt-1' title="Pin this to-do" onClick={handlePin} />
                                <ItemDropdown
                                    created={formattedCreated}
                                />
                            </div>
                        </Transition>
                    </div>
            }
            <div className="px-4 py-2">
                {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
                <p className="mt-1 text-lg">{body}</p>
            </div>
            <div className="mt-auto inline-flex w-full py-2 px-4 items-center justify-between self-end">
                <Importance importance={importance} />
                {formattedUpdate}
            </div>
        </section >);
});

export default Item;
