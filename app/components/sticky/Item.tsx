import React, { forwardRef, HTMLAttributes } from 'react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
};

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(({ id, withOpacity, isDragging, className, ...props }, ref) => {
    return <div className={`${withOpacity ? "opacity-50" : "opacity-100"} h-72 w-96 ${isDragging ? "dark:border-slate-600 border-slate-200 scale-105 cursor-grabbing" : "cursor-grab scale-100"} border-2 flex justify-center items-center inverse-dark-mode rounded-md ${className}`}
        ref={ref} {...props} > {id}</div >;
});

export default Item;
