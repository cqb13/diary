<template>
  <h1>Login to Your Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="signIn">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();

const router = useRouter();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5000;

let loginAttempts = 0;
let lockoutTimer = null;

const signIn = () => {
  if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    errMsg.value = "Too many login attempts. Please try again later.";
    return;
  }

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/diary");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }

      loginAttempts++;

      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        errMsg.value = "Too many login attempts. Please try again later.";
        lockoutTimer = setTimeout(() => {
          loginAttempts = 0;
          lockoutTimer = null;
        }, LOCKOUT_DURATION);
      }
    });
};
</script>
