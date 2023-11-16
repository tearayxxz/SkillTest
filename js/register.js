import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const auth = getAuth(app);

const form = document.getElementById("registerForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    createUserWithEmailAndPassword(auth,email,password)
    .then( async (credentials) =>{
        var ref = doc(db,"UserAuthList",credentials.user.uid)
        await setDoc(ref, {
            firstname:form.Firstname.value,
            lastname:form.Lastname.value,
            phonenumber:form.PhoneNumber.value,
        })
        alert("สร้างบัญชีผู้ใช้เรียบร้อย")
        window.location.href = 'login.html'
    }).catch((error)=>{
        alert(error.message)
    })
})
