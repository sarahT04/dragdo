const headers = { 'Content-Type': 'application/json' };

// async function 

async function moveSticky(from: moveStickyProps, to: moveStickyProps) {
    try {
        const response = await fetch("/api/sticky/move", {
            method: "PATCH",
            headers,
            body: JSON.stringify({ from, to })
        })
        const result = await response.json();
        return result;
    } catch (e) {
        return e;
    }
}

async function fetchTodaySticky(email: string) {
    try {
        const response = await fetch("/api/sticky", {
            method: "POST",
            headers,
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        return result;
    } catch (e) {
        return e;
    }
}

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
    // unpin,
    // pin,
    fetchTodaySticky,
    moveSticky
}