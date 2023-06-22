<template>
  <h1 class="mb-5 text-center font-serif text-5xl text-primary">Diaries</h1>
  <section class="flex gap-5">
    <DiaryBlock title="My First Entry" description="This is my first entry" />
    <DiaryBlock title="My Second Entry" description="This is my second entry" />
    <DiaryBlock title="My Third Entry" description="This is my third entry" />
    <button
      class="flex h-52 w-52 flex-col items-center rounded-3xl bg-light-background p-5 transition-all hover:outline hover:outline-1 hover:outline-primary"
    >
      <h2
        class="pb-2 text-center font-serif text-xl tracking-wider text-primary"
      >
        New Diary
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-20 w-20 text-primary transition-all"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </section>
</template>

<script setup>
import DiaryBlock from "../components/DiaryBlock.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import getDiaries from "../utils/diary/getDiaries";
import { ref } from "vue";

const diaries = ref([]);

const router = useRouter();
const authListener = onAuthStateChanged(getAuth(), function (user) {
  if (!user) {
    router.back();
  }

  const retrievedDiaries = getDiaries(user);

  retrievedDiaries.then((data) => {
    diaries.value = data;
  });

  console.log(diaries.value);
});

onBeforeUnmount(() => {
  authListener();
});
</script>
