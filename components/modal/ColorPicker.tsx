import { Dialog, Transition } from '@headlessui/react'
import { Fragment, SetStateAction } from 'react'
import { ChromePicker } from '@hello-pangea/color-picker';
import Success from '../buttons/Success';
import Alert from '../buttons/Alert';

type ColorPickerModalTypes = {
    color: string | null | undefined;
    open: boolean;
    onClose: () => void;
    setColor: React.Dispatch<SetStateAction<string | null | undefined>>;
}

export default function ColorPickerModal({ color, open, onClose, setColor }: ColorPickerModalTypes) {
    const resetColor = () => { setColor(null); onClose(); };
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex justify-between w-full max-w-md transform overflow-hidden rounded-2xl p-8 text-left align-middle shadow-xl transition-all inverse-dark-mode">
                                    <ChromePicker
                                        color={color ? color : undefined}
                                        onChange={(clr: { hex: string }) => setColor(clr.hex)}
                                    />
                                    <div className="flex flex-col gap-12 justify-center">
                                        <Success title="Set color" label="Set color" onClick={onClose} />
                                        <Alert title="Discard color" onClick={resetColor} label="Cancel" />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
