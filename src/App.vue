<template>
  <div class="bg-gray-700 text-gray-200 min-h-screen flex flex-col">
    <nav class="flex gap-2 p-3 text-gray-700">
      <router-link to="/" class="rounded bg-green-400 p-1">Home</router-link>
      <router-link to="/diary" class="rounded bg-green-400 p-1"
        >Diary</router-link
      >
      <span v-if="isLoggedIn">
        <button @click="handleSignOut" class="rounded bg-green-400 p-1">Logout</button>
      </span>
      <span v-else>
        <router-link to="/register">Register</router-link>
        <router-link to="/sign-in">Login</router-link>
      </span>
    </nav>
    <div class="px-3 flex-grow">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue"; // used for conditional rendering
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(true);

// runs after firebase is initialized
onAuthStateChanged(getAuth(), function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

const handleSignOut = () => {
  signOut(getAuth());
  router.push("/");
};
</script>
