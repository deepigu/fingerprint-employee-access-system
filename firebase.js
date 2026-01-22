
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnjr_HZQcQHHLQRJkagKFuiJIbRkluIqY",
  authDomain: "fingerprint-employee-acc-2431e.firebaseapp.com",
  databaseURL: "https://fingerprint-employee-acc-2431e-default-rtdb.firebaseio.com",
  projectId: "fingerprint-employee-acc-2431e",
  storageBucket: "fingerprint-employee-acc-2431e.firebasestorage.app",
  messagingSenderId: "659940457387",
  appId: "1:659940457387:web:b8d02968310169c77630ee"
};

// ✅ COMPAT INITIALIZATION (THIS IS THE KEY LINE)
firebase.initializeApp(firebaseConfig);

// ✅ GET DATABASE (COMPAT WAY)
const database = firebase.database();

console.log("Firebase initialized OK");