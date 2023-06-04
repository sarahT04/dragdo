const headers = { 'Content-Type': 'application/json' };

async function unpin(id: string) {
    try {
        const response = await fetch("/api/unpin", {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        return result;
    } catch (e) {
        return e;
    }
}

async function pin(id: string) {
    try {
        const response = await fetch("/api/pin", {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        return result;
    } catch (e) {
        return e;
    }
}

export {
    unpin,
    pin
}