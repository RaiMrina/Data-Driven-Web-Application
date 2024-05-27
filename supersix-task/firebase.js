import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLfyqLIQJeCsrEFghvTdI6ZqxaR3JMTjA",
    authDomain: "supersix-10a9c.firebaseapp.com",
    projectId: "supersix-10a9c",
    storageBucket: "supersix-10a9c.appspot.com",
    messagingSenderId: "749092861999",
    appId: "1:749092861999:web:6b2512526a338e309b2eda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
