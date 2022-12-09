import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCJ6SAkGk1eqzWJnWJdJuLbroOEJLCW2uA',
  authDomain: 'eshop-77949.firebaseapp.com',
  projectId: 'eshop-77949',
  storageBucket: 'eshop-77949.appspot.com',
  messagingSenderId: '782695379127',
  appId: '1:782695379127:web:e4e5383133697b633e5d32',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
