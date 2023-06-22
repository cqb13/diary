<template>
  <div class="h-52 w-52 bg-light-background p-5 rounded-3xl hover:outline hover:outline-primary hover:outline-1 transition-all">
    <h2 class="text-xl font-serif text-primary text-center pb-2 tracking-wider">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
  },
};
</script>
