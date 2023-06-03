"use client"
import { useState } from "react";
import Navbar from "@components/Navbar";
import StickyModal from "@components/modal/Sticky";
import Sticky from "@components/sticky/Container";
import { allDatas } from "@components/sticky/datasType";
import ModalProvider from "@components/context/modal";
import StickyProvider from "@components/context/todos";

export default function Home() {
  const [items, setItems] = useState<stickyDataType[]>(allDatas) // useState(Array.from({ length: 4 }, (_, i) => (i + 1).toString()));
  const [activeData, setActiveData] = useState<stickyDataType | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex">
        <ModalProvider>
          <StickyProvider>
            <Sticky items={items} setItems={setItems} />
            <StickyModal />
          </StickyProvider>
        </ModalProvider>
      </main>
    </>
  )
}
