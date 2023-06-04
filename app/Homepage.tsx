"use client"
import { useState } from "react";
import Navbar from "@components/Navbar";
import StickyModal from "@components/modal/Sticky";
import Sticky from "@components/sticky/Container";
import ModalProvider from "@components/context/modal";
import StickyProvider from "@components/context/todos";

type HomeProps = {
  initialData: stickyDataType[];
}

export default function Homepage({ initialData }: HomeProps) {
  const [todos, setTodos] = useState<stickyDataType[]>(initialData) // useState(Array.from({ length: 4 }, (_, i) => (i + 1).toString()));
  const [activeData, setActiveData] = useState<stickyDataType | null>(null);

  return (
    <>
      <Navbar />
      <ModalProvider>
        <StickyProvider>
          <main className="flex">
            <Sticky
              todos={todos} setTodos={setTodos}
              activeData={activeData} setActiveData={setActiveData}
            />
            <StickyModal />
          </main>
        </StickyProvider>
      </ModalProvider>
    </>
  )
}
