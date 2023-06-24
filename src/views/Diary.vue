<template>
  <header class="flex flex-col">
    <h1 v-if="!isEditing" class="text-center font-serif text-5xl text-primary">
      {{ title }}
    </h1>
    <TextEntry
      v-else
      v-model="editedTitle"
      :value="editedTitle"
      class="mb-2 bg-opacity-0 text-center font-serif text-5xl text-primary"
    />
    <p v-if="!isEditing" class="text-lg">{{ description }}</p>
    <textarea
      v-else
      class="rounded-lg border-none bg-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
      v-model="editedDescription"
    ></textarea>

    <div class="mt-5 flex justify-between rounded-xl bg-light-background p-2">
      <p>Created: {{ createdAt }}</p>
      <p>Last Update: {{ updatedAt }}</p>
    </div>
  </header>
  <main></main>
  <div class="mt-5 flex justify-between rounded-xl bg-light-background p-2">
    <button
      v-if="!isEditing"
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
    <button
      class="text-red-500 transition-all hover:opacity-50 active:tracking-wider"
      @click="confirmDelete"
    >
      Delete
    </button>
  </div>

  <Modal
    :show="showConfirmationModal"
    title="Confirm Deletion"
    message="Please enter the diary name to confirm deletion:"
    :inputVisible="true"
    :expectedValue="title"
    @cancel="cancelDelete"
    @confirm="deleteDiaryCheck"
  />
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import getDiary from "../utils/diary/getDiary";
import TextEntry from "../components/TextEntry.vue";
import dateConverter from "../utils/db/dateConverter";
import saveMainDiaryChanges from "../utils/diary/saveMainDiaryChanges";
import deleteDiary from "../utils/diary/deleteDiary";
import Modal from "../components/Modal.vue";

const router = useRouter();

const title = ref("");
const description = ref("");
const createdAt = ref("");
const updatedAt = ref("");
const editedTitle = ref("");
const editedDescription = ref("");
const isEditing = ref(false);
const showConfirmationModal = ref(false);

const diaryKey = router.currentRoute.value.params.id;

const getInfo = async () => {
  await getDiary(diaryKey).then((diary) => {
    title.value = diary.name;
    description.value = diary.description;
    createdAt.value = dateConverter(diary.createdAt);
    updatedAt.value = dateConverter(diary.updatedAt);
  });
};

const confirmDelete = () => {
  showConfirmationModal.value = true;
};

const cancelDelete = () => {
  showConfirmationModal.value = false;
  deleteConfirmationInput.value = "";
};

const deleteDiaryCheck = async (inputValue) => {
  if (inputValue === title.value) {
    showConfirmationModal.value = false;
    await deleteDiary(diaryKey);
    router.push("/diaries");
  }
};

const startEditing = () => {
  editedTitle.value = title.value;
  editedDescription.value = description.value;
  isEditing.value = true;
};

const saveChanges = () => {
  if (
    editedTitle.value === title.value &&
    editedDescription.value === description.value
  ) {
    isEditing.value = false;
    return;
  }
  title.value = editedTitle.value;
  description.value = editedDescription.value;
  isEditing.value = false;
  saveMainDiaryChanges(diaryKey, title.value, description.value);
};

const cancelEditing = () => {
  isEditing.value = false;
};

getInfo();
</script>
