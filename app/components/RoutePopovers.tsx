import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import ThemeSwitcher from "@components/ThemeSwitcher";

const popoverLinks = [
    { id: 'popover1', label: 'To-dos', title: "See today's to-dos", href: "/" },
    { id: 'popover2', label: 'Calendar', title: "See this month's to-dos", href: "/" },
    { id: 'popover3', label: 'Grids', title: "Clutter your todos", href: "/" },
]

export default function RoutePopovers() {
    return (
        <Popover className="p-2">
            <Popover.Button className="inline-flex items-center">
                <span>Go to</span>
                <ChevronDownIcon
                    className="h-5 w-5 ui-open:transform ui-open:rotate-180 ui-open:duration-200 ui-open:transition-transform transform transition-transform rotate-0 duration-200" />
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel
                    className="absolute shadow-2xl z-10 p-2 inverse-dark-mode rounded-md flex flex-col space-y-2 [&>*]:py-1 [&>*]:px-2"
                >
                    {
                        popoverLinks.map((popover) => {
                            const { id, label, title, href } = popover;
                            return (
                                <Link href={href} title={title} key={id}
                                    className="hover:opacity-80 rounded-md transition-colors"
                                >
                                    {label}
                                </Link>
                            )
                        })
                    }
                    <ThemeSwitcher />
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}