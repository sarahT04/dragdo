// import * as admin from 'firebase-admin';
import { formatDateTime, handleSort } from './utils';
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const sticky = collection(db, "sticky")

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
        await updateDoc(doc(db, "sticky", from.id), {
            sequence: to.sequence,
        });
        await updateDoc(doc(db, "sticky", to.id), {
            sequence: from.sequence,
        });
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function editPinned(id: string, pinned: boolean) {
    try {
        await updateDoc(doc(db, "sticky", id), {
            pinned,
        })
        return true;
    } catch (e) {
        return false;
    }
}

async function setTodoDb(todo: stickyDataType) {
    try {
        await setDoc(doc(db, "sticky", todo.id), {
            ...todo,
        })
        return true;
    } catch (e) {
        console.log(e)
        return false;
    };
}

function subscribeTodaySticky([_, email], { next }) {
    const q = query(collection(db, "sticky"), where("email", "==", email))
    const unsub = onSnapshot(
        q,
        (querySnapshot) => {
            const formattedResult: stickyDataType[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const formattedData = {
                    id: doc.id,
                    ...doc.data(),
                    created: formatDateTime(new Date(data.created.seconds * 1000)),
                    updated: formatDateTime(new Date(data.updated.seconds * 1000)),
                } as stickyDataType;
                formattedResult.push(formattedData);
            })
            const sortedTodos = handleSort(formattedResult, ['sequence', 'pinned']);
            return next(null, sortedTodos);
        },
        (err) => next(err))
    return unsub;
}

async function getTodaySticky({ email }: { email: string | null }) {
    if (email === null) return null;
    try {
        const formattedResult: stickyDataType[] = [];
        const q = query(collection(db, "sticky"), where("email", "==", email))
        const result = await getDocs(q);
        // if result is empty return null
        if (result.empty) throw Error;
        // we format the result
        result.forEach((doc) => {
            const data = doc.data();
            const formattedData = {
                id: doc.id,
                ...doc.data(),
                created: formatDateTime(new Date(data.created.seconds * 1000)),
                updated: formatDateTime(new Date(data.updated.seconds * 1000)),
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