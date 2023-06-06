import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useMemo } from 'react'
import { PlayCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import Importance from '../rating/Importance';
import ColorPickerModal from './ColorPicker';
import Alert from '../buttons/Alert';
import Success from '../buttons/Success';
import { useTheme } from 'next-themes';
import { ModalContext } from '../context/modal';
import { enterPressed } from '@/utils/utils';
import { StickyContext } from '../context/todos';

const DARK_COLOR = "#1e293b";
const LIGHT_COLOR = "#cbd5e1";
const shouldChangeColor = (color: string | null | undefined) => typeof color === 'string' && (color !== DARK_COLOR && color !== LIGHT_COLOR);
const makeSureItsString = (str: string | null | undefined) => typeof str !== 'string' ? "" : str;

type StickyModalProps = {}

export default function StickyModal() {
    const { modalOpen, closeModal } = useContext(ModalContext)!;
    const { modalData } = useContext(StickyContext)!;
    const { pTitle, pBody, pImportance, pColor, pPinned, pDeadline } = modalData || {};
    const { theme } = useTheme();
    const [pickerVisible, setPickerVisible] = useState(false);
    // Form states
    const [title, setTitle] = useState(pTitle);
    const [body, setBody] = useState(pBody);
    const [importance, setImportance] = useState(pImportance);
    const [color, setColor] = useState(pColor);
    const [pinned, setPinned] = useState(pPinned);
    const [deadline, setDeadline] = useState(pDeadline);

    // Utilities below
    const openPicker = () => {
        if (theme === 'dark') {
            setColor(DARK_COLOR);
        } else {
            setColor(LIGHT_COLOR);
        }
        setPickerVisible(true)
    };
    const closePicker = () => setPickerVisible(false);
    const resetColor = () => setColor(null);

    useMemo(() => {
        // reinitialize due to modalData not being changed during first initialization. 
        const { pTitle, pBody, pImportance, pColor, pPinned, pDeadline } = modalData || {};
        setTitle(pTitle);
        setBody(pBody);
        setImportance(pImportance);
        setColor(pColor);
        setPinned(pPinned);
        setDeadline(pDeadline);
    }, [modalData])

    return (
        <>
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center relative">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    id='sticky-modal-panel'
                                    className={`
                                w-full max-w-md transform overflow-hidden rounded-2xl 
                                dark-mode p-6 text-left align-middle shadow-xl transition-all
                                `}
                                    style={shouldChangeColor(color) ? { backgroundColor: color! } : undefined}
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6"
                                    >
                                        Add new to-do
                                    </Dialog.Title>
                                    <input
                                        className="mt-2 w-full p-2 border-2 rounded-md my-1 inverse-dark-mode placeholder:inverse-dark-mode"
                                        placeholder="Title (optional)"
                                        id="sticky-title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={makeSureItsString(title)}
                                    />
                                    <textarea
                                        className="mt-2 w-full p-2 h-40 border-2 rounded-lg my-1 resize-none inverse-dark-mode placeholder:inverse-dark-mode"
                                        placeholder="What should you put on your sticky?"
                                        id="sticky-body"
                                        onChange={(e) => setBody(e.target.value)}
                                        value={makeSureItsString(body)}
                                    />
                                    <div className="flex justify-between mt-3">
                                        <Importance importance={0} />
                                        <div className="flex gap-2">
                                            {
                                                shouldChangeColor(color)
                                                    ? <MinusCircleIcon
                                                        tabIndex={0}
                                                        onKeyDown={(e: React.KeyboardEvent) => enterPressed(e) ? resetColor() : null}
                                                        className="w-6 h-6 text-red-200"
                                                        onClick={resetColor}
                                                        title="Reset color"
                                                    />
                                                    : null
                                            }
                                            <PlayCircleIcon
                                                tabIndex={0}
                                                onKeyDown={(e: React.KeyboardEvent) => enterPressed(e) ? openPicker() : null}
                                                className="w-6 h-6"
                                                onClick={openPicker} />
                                        </div>
                                        <ColorPickerModal
                                            color={color}
                                            open={pickerVisible}
                                            onClose={closePicker}
                                            setColor={setColor} />
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <Alert onClick={closeModal} label="Cancel" title="Discard to-do" />
                                        {/* TBD */}
                                        <Success onClick={closeModal} label="Add" title="Add to-do" />
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
