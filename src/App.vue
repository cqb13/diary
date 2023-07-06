<template>
  <div
    class="flex min-h-screen flex-col gap-5 bg-dark-background p-20 text-gray-200 max-sm:p-10 max-xs:p-5"
  >
    <nav class="flex items-center justify-between gap-2 max-xs:flex-col">
      <p class="p-1 text-primary">My Online Diary</p>

      <div class="flex items-center gap-2">
        <router-link to="/" class="rounded p-1 text-primary">Home</router-link>
        <router-link
          v-if="isLoggedIn"
          to="/diaries"
          class="rounded p-1 text-primary"
          >Diaries</router-link
        >
        <button
          v-if="isLoggedIn"
          @click="handleSignOut"
          class="rounded p-1 text-primary"
        >
          Logout
        </button>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="rounded p-1 text-primary"
          >Register</router-link
        >
        <router-link
          v-if="!isLoggedIn"
          to="/sign-in"
          class="rounded p-1 text-primary"
          >Login</router-link
        >
      </div>
    </nav>
    <div class="m-auto w-9/12 flex-1 px-3 max-mdl:w-full">
      <router-view />
    </div>
    <footer class="mt-40 shrink-0 max-mds:mt-20">
      <p class="text-center">© 2023 My Online Diary</p>
    </footer>
  </div>
</template>

<script setup>
import Logo from "./components/Logo.vue";

import { ref, watchEffect } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(true);

onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

const handleSignOut = () => {
  signOut(getAuth());
  router.push("/");
};
</script>
