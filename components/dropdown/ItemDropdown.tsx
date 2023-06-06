import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ModalContext } from '../context/modal';
import { StickyContext } from '../context/todos';

type ItemDropdownProps = {
    created: string;
}

type DropdownItemProps = {
    children: React.ReactNode;
    title: string;
    onClick: () => void;
}

function DropdownItem({ children, title, onClick }: DropdownItemProps) {
    return (
        <Menu.Item title={title} as="div" className="inline-flex items-center gap-1 hover:opacity-80" onClick={onClick}>
            {children}
        </Menu.Item>
    )
}

function ItemDropdown({ created }: ItemDropdownProps) {
    const { openModal } = useContext(ModalContext)!;
    const { setModalData } = useContext(StickyContext!);
    return (
        <div className="block relative">
            <Menu>
                <Menu.Button><EllipsisVerticalIcon className="w-8 h-8" /></Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute right-0 dark-mode py-2 px-3 rounded-lg">
                        <DropdownItem title="Edit to-do" onClick={openModal}>
                            <PencilSquareIcon className="w-4 h-4" /><p>Edit</p>
                        </DropdownItem>
                        <DropdownItem title="Delete to-do" onClick={openModal}>
                            <TrashIcon className="w-4 h-4" /><p>Delete</p>
                        </DropdownItem>
                        <hr className="my-1" />
                        <small title={`Created at ${created}`}
                            className="text-[9px] font-semibold mx-auto">{created}</small>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ItemDropdown