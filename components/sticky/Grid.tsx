type GridProps = {
  children: React.ReactNode;
}

export default function Grid({ children }: GridProps) {
  return (
    <div
      className={`grid gap-5 w-full grid-cols-fluid m-10 z-[5]`}
    >
      {children}
    </div>
  )
}
