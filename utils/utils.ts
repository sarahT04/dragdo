type sortTypes = 'pinned' | 'sequence';

export function formatDateTime(date: Date | undefined) {
    if (date === undefined) return undefined;
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    } as const;
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export const handleSort = (todos: stickyDataType[], sortTypes: sortTypes[]) => {
    let sortedItems: stickyDataType[] = [...todos!];
    for (const sortType of sortTypes) {
        if (sortType === 'pinned') {
            sortedItems.sort((a, b) => (a.pinned && !b.pinned) ? -1 : 1);
        } else if (sortType === 'sequence') {
            sortedItems.sort((a, b) => b.sequence - a.sequence);
        }
    }
    return sortedItems;
}

export const enterPressed = (e: React.KeyboardEvent) => e.type === 'Enter';