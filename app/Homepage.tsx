"use client"
import { useState } from "react";
import Navbar from "@components/Navbar";
import StickyModal from "@components/modal/Sticky";
import Sticky from "@components/sticky/Container";
import ModalProvider from "@components/context/modal";
import { Toaster } from "react-hot-toast";

type HomeProps = {
  email: string;
}

export default function Homepage({ email }: HomeProps) {
  const [activeData, setActiveData] = useState<stickyDataType | null>(null);

  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName="mb-6"
      />
      <ModalProvider>
          <main className="flex">
            <Sticky
              email={email}
              activeData={activeData} setActiveData={setActiveData}
            />
            <StickyModal />
          </main>
      </ModalProvider>
    </>
  )
}