import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg3goejVyykQ02axr9oGpNrhRx0Zo53Ew",
  authDomain: "bolaocopa2026-a9e2c.firebaseapp.com",
  projectId: "bolaocopa2026-a9e2c",
  storageBucket: "bolaocopa2026-a9e2c.firebasestorage.app",
  messagingSenderId: "105427818133",
  appId: "1:105427818133:web:6c5e74dea878eca4552d9c",
  measurementId: "G-RJJT36QB00"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);