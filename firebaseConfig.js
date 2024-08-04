// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAk5D8KN_tPgzx3rjVkJa9tu1Ti3_C-zXY",
    authDomain: "cab-booking-app-cc459.firebaseapp.com",
    projectId: "cab-booking-app-cc459",
    storageBucket: "cab-booking-app-cc459.appspot.com",
    messagingSenderId: "730165193139",
    appId: "1:730165193139:web:2b3b62539bc2fde11103c6"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


export async function load() {
  const data = [];
  try {
    const cabsCollection = await getDocs(collection(db, 'AvailableCabs'));
    const cabs = cabsCollection.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
    });
    return cabs;
  } catch (error) {
      console.log(error);
      return data;
  }
}

export async function bookCab(id) {
  console.log('bookCab');
  try {
    const cabRef = doc(db, 'AvailableCabs', id);
    await updateDoc(cabRef,{
        booked: true
    });
  } catch (error) {
      console.log(error);
  }
}

export async function unBookCab(id) { 
  console.log('unBookCab');
  try {
    const cabRef = doc(db, 'AvailableCabs', id);
    await updateDoc(cabRef,{
        booked: false
    });
  } catch (error) {
      console.log(error);
  }
}

export async function bookedCabs() {
  try {
    const cabsCollection = await getDocs(collection(db, 'AvailableCabs'));
    const cabs = cabsCollection.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
    });
    return cabs.filter(cab => cab.booked);
  } catch (error) {
      console.log(error);
      return [];
  }
}