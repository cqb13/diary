<template>
  <div class="flex min-h-screen flex-col bg-background text-gray-200 p-20 gap-5">
    <nav class="flex justify-between items-center gap-2">
      <p class="p-1 text-primary">My Online Diary</p>

      <div class="flex items-center gap-2">
        <router-link to="/" class="rounded p-1 text-primary"
          >Home</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/diary"
          class="rounded p-1 text-primary"
          >Diary</router-link
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
    <div class="flex-1 px-3 w-9/12 m-auto">
      <router-view />
    </div>
    <footer class="shrink-0">
      <p>footer</p>
    </footer>
  </div>
</template>

<script setup>
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
