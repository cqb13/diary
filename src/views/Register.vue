<template>
  <h1 class="mb-5 text-center font-serif text-5xl text-primary">
    Create an Account
  </h1>
  <section class="flex flex-col gap-5">
    <input
      type="text"
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
    <input
      type="password"
      placeholder="Confirm Password"
      class="rounded-lg border-none bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary"
      v-model="passwordConfirm"
    />
    <button
      @click="register"
      class="mx-auto w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full"
    >
      Sign Up
    </button>
    <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const passwordConfirm = ref("");

const router = useRouter();

const updateErrorMessage = (error) => {
  errorMessage.value = error;
  setTimeout(() => {
    errorMessage.value = "";
  }, 3000);
};

const register = () => {
  if (
    email.value === "" ||
    password.value === "" ||
    passwordConfirm.value === ""
  ) {
    updateErrorMessage("Please fill in all fields!");
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email.value)) {
    updateErrorMessage("Please enter a valid email!");
    return;
  }

  if (password.value !== passwordConfirm.value) {
    updateErrorMessage("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/diary");
    })
    .catch((error) => {
      console.log(error.code);
      updateErrorMessage(error.message);
    });
};
</script>
