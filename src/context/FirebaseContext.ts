import React from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: process.env.APP_ID,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  storageBucket: process.env.STORAGE_BUCKET,
};

class Firebase {
  constructor() {
    // const app = initializeApp(firebaseConfig);
    // this.auth = getAuth(app);
    // this.db = getFirestore(app);
    // const app = {};
    // this.auth = () => ({
    //   onAuthStateChanged: () => ({}),
    // });
    // this.db = {};
  }
}

export const firebase = new Firebase();

export const FirebaseContext = React.createContext(firebase);
