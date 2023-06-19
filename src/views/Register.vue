<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><input type="password" placeholder="Confirm Password" v-model="passwordConfirm" /></p>
  <p><button @click="register">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const router = useRouter();
const register = () => {
  if (email.value === "" || password.value === "" || passwordConfirm.value === "") {
    alert("Please fill out all fields!");
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email.value)) {
    alert("Please enter a valid email!");
    return;
  }

  if (password.value !== passwordConfirm.value) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/diary");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
