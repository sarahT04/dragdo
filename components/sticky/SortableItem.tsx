import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item, { ItemProps } from "./Item";

type SortableItemProps = ItemProps & { noMenu?: boolean };

const SortableItem: FC<SortableItemProps> = (props) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };
    return (
        <Item
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortableItem;
