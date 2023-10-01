<template>
  <h1 class="mb-5 text-center font-serif text-5xl text-primary">Login</h1>
  <main class="flex flex-col gap-5">
    <input
      type="email"
      placeholder="Email"
      class="rounded-lg border-none bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary"
      v-model="email"
    />
    <input
      type="password"
      placeholder="Password"
      class="rounded-lg border-none bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary"
      v-model="password"
    />
    <div class="flex justify-center gap-2">
      <button
        @click="signIn"
        class="w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full"
      >
        Login
      </button>
      <button
        @click="googleSingIn"
        class="w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full"
      >
        Login With Google
      </button>
    </div>
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
  </main>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import signInWithGoogle from "../utils/account/googleSignIn";
import { useRouter } from "vue-router";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errMsg = ref();

const router = useRouter();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5000;

let loginAttempts = 0;
let lockoutTimer = null;

const googleSingIn = async () => {
  const user = await signInWithGoogle();
  if (user) {
    router.push("/diaries");
  }
};

const signIn = () => {
  if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    errMsg.value = "Too many login attempts. Please try again later.";
    return;
  }

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/diaries");
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
