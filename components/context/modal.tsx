import { createContext, useState } from "react";

type ModalContextValues = {
    modalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
}

export const ModalContext = createContext<ModalContextValues | null>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);
    return (
        <ModalContext.Provider value={{ modalOpen, closeModal, openModal }}>
            {children}
        </ModalContext.Provider>
    )
}