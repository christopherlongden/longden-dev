import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBnRvRlpXahYh5cvbLiiSbBmRo-x0zVFJY",
    authDomain: "longden-dev.firebaseapp.com",
    databaseURL: "https://longden-dev.firebaseio.com",
    projectId: "longden-dev",
    storageBucket: "longden-dev.appspot.com",
    messagingSenderId: "685984115571",
    appId: "1:685984115571:web:3fdce15fcef947e0ba3306",
    measurementId: "G-8XNHG76705"
}

firebase.initializeApp(config);
//firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    // TODO - Could do this with a batch since it's multiple documents
    // and it should be a transaction
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        newDocRef.set(obj);
    })
}

export const addDocument = async (collectionKey, obj) => {
    const collectionRef = firestore.collection(collectionKey);

    const newDocRef = collectionRef.doc();
    newDocRef.set(obj);
}

export const convertGroupSnapshotToMap = groups => {
    const transformedGroups = groups.docs.map(doc => {
        const { id, name, imageUrl } = doc.data();

        return {
            id,
            name,
            imageUrl
        }
    });

    return transformedGroups;
}

export default firebase;