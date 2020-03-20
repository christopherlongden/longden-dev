export function createUserObjectFromState(currentUser) {
    const photoUrl = currentUser.photoURL ? currentUser.photoURL : '';
    return [ currentUser.id, currentUser.displayName, photoUrl ];
}