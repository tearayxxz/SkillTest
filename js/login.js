import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpMFDVUii8spFdRV5_-NhC4epACgM0mHI",
    authDomain: "website-fc967.firebaseapp.com",
    projectId: "website-fc967",
    storageBucket: "website-fc967.appspot.com",
    messagingSenderId: "656174796467",
    appId: "1:656174796467:web:ead4da21532510ae93eac6",
    measurementId: "G-G7WY1CTRFE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email,password)
    .then( async (credentials) =>{
        var ref = doc(db,"UserAuthList",credentials.user.uid);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()){
            sessionStorage.setItem("user-info", JSON.stringify({
                firstname: docSnap.data().firstname,
                lastname: docSnap.data().lastname,
                phonenumber: docSnap.data().phonenumber,
            }))
            sessionStorage.setItem("user-creds",JSON.stringify(credentials.user));
            window.location.href = "Info.html";
        }
    }).catch((error)=>{
        alert(error.message);
    })
})