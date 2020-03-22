import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
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
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'} );

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email, photoURL} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                photoURL,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

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

export const getDocument = async (collectionKey, docId) => {
    // group => group.groups.find(x => x.id === collectionUrlParam)
}

export const deleteDocument = async (collection, documentId) => {
    const docRef = await firestore.doc(`${collection}/${documentId}`);
    return docRef.delete();
}

export const listFiles = async (path) => {
    let icons = [];

    return icons;
}

export const convertGroupSnapshotToMap = groups => {
    const transformedGroups = groups.docs.map(doc => {
        const { name, imageUrl } = doc.data();

        return {
            id: doc.id,
            name,
            imageUrl
        }
    });

    console.log("transformed groups: ", transformedGroups);

    return transformedGroups;
}

export const convertNewsSnapshotToMap = news => {
    const transformedItems = news.docs.map(doc => {
        const { title, body, created, user } = doc.data();

        return {
            id: doc.id,
            title,
            body,
            user: user[1],
            created
        }
    });

    console.log("converted news to map");

    return transformedItems;
}



export default firebase;