type GridProps = {
  children: React.ReactNode;
}

export default function Grid({ children }: GridProps) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10`}
    >
      {children}
    </div>
  )
}
