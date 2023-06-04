
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

export const enterPressed = (e: React.KeyboardEvent) => e.type === 'Enter';