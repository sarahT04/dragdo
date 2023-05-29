"use client"
import Navbar from "./components/Navbar";
import Sticky from "./components/sticky/Sticky";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex">
        <Sticky />
      </main>
    </>
  )
}
