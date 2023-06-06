"use client"
import Navbar from "@components/Navbar";
import StickyModal from "@components/modal/Sticky";
import Sticky from "@components/sticky/Container";
import ModalProvider from "@components/context/modal";
import { Toaster } from "react-hot-toast";
import StickyProvider from "@/components/context/todos";
import { useState } from "react";

type HomeProps = {
  initialData: stickyDataType[] | null;
}

export default function Homepage({ initialData }: HomeProps) {
  const [todos, setTodos] = useState<stickyDataType[] | null>(initialData);
  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName="mb-6"
      />
      <ModalProvider>
        <StickyProvider>
          <main className="flex">
            <Sticky
              todos={todos} setTodos={setTodos}
            />
            <StickyModal
              todos={todos} setTodos={setTodos}
            />
          </main>
        </StickyProvider>
      </ModalProvider>
    </>
  )
}