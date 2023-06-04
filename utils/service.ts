import { allDatas } from "@components/sticky/datasType";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
});

const db = getFirestore(app)

function editTodoDb(todo: stickyDataType) {
    return (
        null
    );
}

async function getTodaySticky() {
    return allDatas;
}

export {
    getTodaySticky,
};