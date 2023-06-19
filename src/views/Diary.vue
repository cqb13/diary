<template>
  <h1>Diary</h1>
  <h3>This page is for users only</h3>

  <section>
    <DiaryBlock title="My First Entry" description="This is my first entry" />
    <DiaryBlock title="My Second Entry" description="This is my second entry" />
    <DiaryBlock title="My Third Entry" description="This is my third entry" />
  </section>
</template>

<script setup>
import DiaryBlock from "../components/DiaryBlock.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";

const router = useRouter();
const authListener = onAuthStateChanged(getAuth(), function (user) {
  if (!user) {
    alert("you must be logged in to view this. redirecting to the home page");
    router.push("/");
  }
});

onBeforeUnmount(() => {
  authListener();
});
</script>
