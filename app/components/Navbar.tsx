import Link from "next/link";
import RoutePopovers from "./RoutePopovers";

export default function Navbar() {
  return (
    <nav className="pt-8 inline-flex justify-around items-center w-full">
        <Link href="/" title="DragoDo"><h1 className="font-bold text-lg">DragoDo</h1></Link>
        <RoutePopovers />
    </nav>
  )
}
