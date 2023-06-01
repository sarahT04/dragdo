export default function Success({ type = "button", onClick, label, title }: ButtonsProps) {
    return (
        <button
            title={title}
            type={type}
            className="inline-flex justify-center items-center gap-1 rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-green-300 text-green-700 hover:bg-green-200 dark:bg-green-100 dark:text-green-900 dark:hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
