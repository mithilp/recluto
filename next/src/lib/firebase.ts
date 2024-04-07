import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
	authDomain: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseapp.com`,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: `${process.env.NEXT_PUBLIC_PROJECT_ID}.appspot.com`,
	messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
