import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./style.css";

const firebaseConfig = {
  apiKey: "AIzaSyB8beR0mrBJqI95H5Suy38UE_a8CEp1uhk",
  authDomain: "diary-dc092.firebaseapp.com",
  projectId: "diary-dc092",
  storageBucket: "diary-dc092.appspot.com",
  messagingSenderId: "987860403415",
  appId: "1:987860403415:web:db337310aee55987689c92",
  measurementId: "G-LP2EVT2516",
};

initializeApp(firebaseConfig);
let init = initializeApp(firebaseConfig);
getAnalytics(init);

const app = createApp(App);

app.use(router);

app.mount("#app");
