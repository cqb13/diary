<template>
  <article :key="key" :id="id">
    <section class="flex items-center justify-between p-2 gap-5">
      <div class="flex flex-col justify-center flex-1">
        <h2 v-if="!editingDiaryEntry" class="font-serif text-xl text-primary">
          {{ title }}
        </h2>
        <TextEntry v-else v-model="editedTitle" :value="editedTitle" customClass="text-primary font-serif text-xl bg-dark-background mb-1" />
        <p v-if="!editingDiaryEntry">{{ description }}</p>
        <TextEntry v-else v-model="editedDescription" :value="editedDescription" customClass="bg-dark-background" />
      </div>
      <div class="flex flex-col items-end">
        <p>June 23, 2023</p>
        <button
          v-if="!editingDiaryEntry"
          class="text-primary transition-all hover:opacity-50 active:tracking-wider"
          @click="startEditing"
        >
          Edit
        </button>
        <div v-else class="flex gap-2">
          <button
            class="text-primary transition-all hover:opacity-50 active:tracking-wider"
            @click="saveChanges"
          >
            Save
          </button>
          <button
            class="text-red-500 transition-all hover:opacity-50 active:tracking-wider"
            @click="cancelEditing"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
    <section class="p-2">
      <span v-if="!editingDiaryEntry">{{ content }}</span>
      <textarea
      v-else
      class="rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0 w-full"
      v-model="editedContent"
    ></textarea>
    </section>
  </article>
</template>

<script setup>
import { defineProps, ref } from "vue";
import TextEntry from "./TextEntry.vue";

const title = ref(props.title);
const description = ref(props.description);
const content = ref(props.content);
const editingDiaryEntry = ref(false);
const editedTitle = ref("");
const editedDescription = ref("");
const editedContent = ref("");

const startEditing = () => {
  editedTitle.value = title.value;
  editedDescription.value = description.value;
  editedContent.value = content.value;
  editingDiaryEntry.value = true;
};

const saveChanges = () => {
  title.value = editedTitle.value;
  description.value = editedDescription.value;
  content.value = editedContent.value;
  editingDiaryEntry.value = false;
};

const cancelEditing = () => {
  editingDiaryEntry.value = false;
};

const props = defineProps({
  key: String,
  id: String,
  title: String,
  description: String,
  date: String,
  content: String,
});
</script>
