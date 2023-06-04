import * as admin from 'firebase-admin';
import { formatDateTime, handleSort } from './utils';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
        })
    });
}

const db = admin.firestore();
const sticky = db.collection('sticky');

async function editPinned(id: string, pinned: boolean) {
    try {
        const res = await sticky.doc(id).update({
            pinned,
        });
        return true;
    } catch (e) {
        return false;
    }
}

function editTodoDb(todo: stickyDataType) {
    return (
        null
    );
}

async function getTodaySticky({ email }: { email: string | null }) {
    if (email === null) return null;
    try {
        const formattedResult: stickyDataType[] = [];
        const result = await sticky.where('email', '==', email).get();
        // if result is empty return null
        if (result.empty) throw Error;
        // we format the result
        result.forEach((doc) => {
            const formattedData = {
                id: doc.id,
                ...doc.data(),
                created: formatDateTime(doc.createTime.toDate()),
                updated: formatDateTime(doc.updateTime.toDate()),
            } as stickyDataType;
            formattedResult.push(formattedData);
        })
        // then sort it :)
        const sortedTodos = handleSort(formattedResult, ['sequence', 'pinned']);
        return sortedTodos;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export {
    getTodaySticky,
    editPinned,
};