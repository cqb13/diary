<template>
  <header>
    <h1 class="font-serif text-5xl text-primary text-center">{{ title }}</h1>
    <p class=" text-lg">{{ description }}</p>
    <div class="flex justify-between p-2 bg-light-background rounded-xl mt-5">
      <p>Created: {{ createdAt }}</p>
      <p>Last Update: {{ updatedAt }}</p>
    </div>
  </header>
  <main>

  </main>
  <div class="flex justify-between p-2 bg-light-background rounded-xl mt-5">
    <button class="text-primary transition-all hover:opacity-50 active:tracking-wider">
        Edit
    </button>
    <button class="text-red-500 transition-all hover:opacity-50 active:tracking-wider">
        Delete
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import getDiary from "../utils/diary/getDiary";
import dateConverter from "../utils/db/dateConverter";

const router = useRouter();

const title = ref("");
const description = ref("");
const createdAt = ref("");
const updatedAt = ref("");

const diaryKey = router.currentRoute.value.params.id;

const getInfo = async () => {
  await getDiary(diaryKey).then((diary) => {
    title.value = diary.name;
    description.value = diary.description;
    createdAt.value = dateConverter(diary.createdAt);
    updatedAt.value = dateConverter(diary.updatedAt);
  });
};

getInfo();
</script>
