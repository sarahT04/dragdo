import React, { forwardRef, HTMLAttributes, useCallback, useState } from 'react';
import Importance from '../rating/Importance';
import ItemDropdown from '../dropdown/ItemDropdown';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { pin, unpin } from '@/utils/apiCalls';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/utils/utils';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    item?: stickyDataType;
    noMenu?: boolean;
};

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(({ id, withOpacity, isDragging, className, noMenu = false, item, ...props }, ref) => {
    const { title, body, created, updated, color, pinned: userPinned, importance } = item || {};
    const [pinned, setPinned] = useState(userPinned);
    const [updatedUpdated, setUpdatedUpdated] = useState(updated);

    const handlePinApi = useCallback(async (id: string) => {
        if (!pinned) {
            return await unpin(id);
        }
        return await pin(id);
    }, [pinned]);

    const handlePin = () => {
        if (!pinned) {
            setPinned(false);
        }
        setPinned(true);
        handlePinApi(id);
    };

    const handleEditApi = useCallback

    return (
        <section className={`${withOpacity ? "opacity-50" : "opacity-100"} p-2
        h-72 w-full inverse-dark-mode rounded-md drop-shadow-xl group relative
        ${isDragging ? "shadow-2xl scale-105 cursor-grabbing" : "cursor-grab scale-100"} 
        ${noMenu ? "cursor-pointer" : ""}
        flex flex-col ${className ? className : ''}`}
            ref={ref} {...props}
        >
            {
                noMenu || item === undefined
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
                                    created={created!}
                                />
                            </div>
                        </Transition>
                    </div>
            }
            {
                noMenu || item === undefined
                    ? <div className="mx-auto text-center mt-auto"
                        tabIndex={0}

                    >
                        <PlusIcon className="w-2/3 h-2/3 mx-auto" />
                        <h3>Add new to-do</h3>
                    </div>
                    :
                    <>
                        <div className="px-4 py-2">
                            {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
                            <p className="mt-1 text-lg">{body}</p>
                        </div>
                        <div className="mt-auto inline-flex w-full py-2 px-4 items-center justify-between self-end">
                            <Importance importance={importance!} />
                            {updatedUpdated}
                        </div>
                    </>
            }
        </section>
    );
});

export default Item;
