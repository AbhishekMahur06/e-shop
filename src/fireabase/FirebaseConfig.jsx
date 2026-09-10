import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvkZvDVKZWEbPO_AdG9Dcqb0tNK_5Grxg",
  authDomain: "e-shop-fb991.firebaseapp.com",
  projectId: "e-shop-fb991",
  storageBucket: "e-shop-fb991.appspot.com",
  messagingSenderId: "347910393889",
  appId: "1:347910393889:web:cfe61eb291665904ce5360",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
