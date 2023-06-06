import { createContext, useState, Dispatch, SetStateAction } from "react";

type ModalContextValues = {
    modalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
    modalData: ModalDataType | null;
    setModalData: Dispatch<SetStateAction<ModalDataType | null>>;
}

export const ModalContext = createContext<ModalContextValues | null>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalDataType | null>(null);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);
    return (
        <ModalContext.Provider value={{
            modalOpen, closeModal, openModal,
            modalData, setModalData,
        }}>
            {children}
        </ModalContext.Provider>
    )
}