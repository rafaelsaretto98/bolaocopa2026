import { auth } from './firebase.js';

import {
    signInWithEmailAndPassword,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export async function login(email, senha){

    return signInWithEmailAndPassword(
        auth,
        email,
        senha
    );
}

export async function logout(){

    return signOut(auth);

}
