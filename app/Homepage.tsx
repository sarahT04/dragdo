"use client"
import Navbar from "@components/Navbar";
import StickyModal from "@components/modal/Sticky";
import Sticky from "@components/sticky/Container";
import ModalProvider from "@components/context/modal";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

type HomeProps = {
  initialData: stickyDataType[] | null;
  email: string;
}

export default function Homepage({ initialData, email }: HomeProps) {
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
          <main className="flex">
            <Sticky
              todos={todos} setTodos={setTodos}
            />
            <StickyModal
              todos={todos} setTodos={setTodos}
              email={email}
            />
          </main>
      </ModalProvider>
    </>
  )
}