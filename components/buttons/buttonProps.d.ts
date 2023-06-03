type ButtonsProps = {
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    label: string;
    title?: string;
}