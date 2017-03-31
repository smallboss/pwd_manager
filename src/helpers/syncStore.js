export function saveUserToLocal( userData ) {
    if(!userData) localStorage.removeItem('user');
    else
        localStorage.setItem('user', JSON.stringify(userData));
}


export function getLocalUser() {
    return JSON.parse(localStorage.getItem('user'));
}