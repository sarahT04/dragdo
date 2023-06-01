export default function Alert({ type = 'button', onClick, label, title }: ButtonsProps) {
    return (
        <button
            title={title}
            type={type}
            className="inline-flex justify-center items-center gap-1 rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-red-300 text-red-700 hover:bg-red-200 dark:bg-red-100 dark:text-red-900 dark:hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
