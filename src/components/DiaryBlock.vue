<template>
  <button
    @click="goToDiary"
    class="h-52 w-52 rounded-3xl bg-light-background p-5 transition-all hover:outline hover:outline-1 hover:outline-primary max-xs:w-full"
  >
    <h2 class="pb-2 text-center font-serif text-xl tracking-wider text-primary">
      {{ title }}
    </h2>
    <p v-if="description">{{ description }}</p>
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  description: String,
  diaryKey: String,
});

const goToDiary = () => {
  router.push(`/diaries/${props.diaryKey}`);
};
</script>
