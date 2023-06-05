// import * as admin from 'firebase-admin';
import { formatDateTime, handleSort } from './utils';
import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// TODO

// Initialize Firebase
let firebase_app = firebase.getApps().length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.getApps()[0]
const db = getFirestore(firebase_app);



// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//             projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//             clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//             privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
//         })
//     });
// }

// const db = admin.firestore();
// const sticky = db.collection('sticky');

async function editStickySequence(from: moveStickyProps, to: moveStickyProps) {
    try {
        await sticky.doc(from.id).update({
            sequence: to.sequence,
        });
        await sticky.doc(to.id).update({
            sequence: from.sequence,
        })
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function editPinned(id: string, pinned: boolean) {
    try {
        await sticky.doc(id).update({
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

async function subscribeTodaySticky([_, email], { next }) {
    const q = sticky.where('email', '==', email);
    const unsub = q.onSnapshot(
        query => {
            const formattedResult: stickyDataType[] = [];
            query.forEach((doc) => {
                const data = doc.data()
                const formattedData = {
                    id: doc.id,
                    ...doc.data(),
                    created: formatDateTime(doc.createTime.toDate()),
                    updated: formatDateTime(doc.updateTime.toDate()),
                } as stickyDataType;
                formattedResult.push(formattedData);
            })
            return next(null, formattedResult);
        },
        err => next(err)
    )
    return unsub;
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
    sticky,
    subscribeTodaySticky,
    getTodaySticky,
    editPinned,
    editStickySequence,
};