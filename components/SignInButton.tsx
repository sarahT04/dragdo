"use client"

import { enterPressed } from '@/utils/utils';
import { Popover, Transition } from '@headlessui/react';
import { signIn } from 'next-auth/react'
import React, { Fragment, useRef } from 'react'

export default function SignInButton() {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const timeoutDuration = 200;
    let timeout: number;

    const closePopover = () => {
        return buttonRef.current?.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true
            })
        );
    }

    const onMouseEnter = (open: boolean) => {
        window.clearTimeout(timeout);
        if (open) return;
        return buttonRef.current?.click();
    }

    const onMouseLeave = (open: boolean) => {
        if (!open) return;
        timeout = window.setTimeout(() => closePopover(), timeoutDuration);
    }
    return (
        <Popover className="relative">
            {({ open }) => {
                return (
                    <>
                        <div onMouseLeave={onMouseLeave.bind(null, open)}>
                            <Popover.Button
                                ref={buttonRef}
                                onMouseEnter={onMouseEnter.bind(null, open)}
                                onMouseLeave={onMouseLeave.bind(null, open)}
                            >
                                <span
                                    className="inline-flex justify-center items-center gap-1 rounded-md border border-transparent px-4 py-2 text-sm font-medium inverse-dark-mode dark:hover:bg-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2"

                                >
                                    Sign up or login with google.
                                </span>

                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-10 w-full mt-0">
                                    <div
                                        className="w-full mt-3 p-5 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 inverse-dark-mode"
                                        onMouseEnter={onMouseEnter.bind(null, open)}
                                        onMouseLeave={onMouseLeave.bind(null, open)}
                                    >
                                        <p
                                        >
                                            Although inconvenient, we need to save your progress.
                                        </p>
                                        <p
                                            title="Login to google"
                                            className="text-center mt-4 underline cursor-pointer"
                                            tabIndex={0}
                                            onClick={() => signIn('google')}
                                            onKeyDown={(e: React.KeyboardEvent) => enterPressed(e) ? signIn('google') : undefined}
                                        >
                                            OK, take me there.
                                        </p>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </div>
                    </>
                )
            }}
        </Popover>
    )
}
