import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBy-y84wCziFrunkFfhDbVo4M735VORuvY",
  authDomain: "suite-flow.firebaseapp.com",
  projectId: "suite-flow",
  storageBucket: "suite-flow.appspot.com",
  messagingSenderId: "389198383641",
  appId: "1:389198383641:web:53739d42b5a482000eb888"
};

const app = initializeApp(firebaseConfig);

export default app;