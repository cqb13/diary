<template>
  <header class="flex flex-col">
    <h1 v-if="!isEditing" class="text-center font-serif text-5xl text-primary">
      {{ title }}
    </h1>
    <TextEntry
      v-else
      v-model="editedTitle"
      :value="editedTitle"
      customClass="mb-2 bg-opacity-0 text-center font-serif text-5xl text-primary"
    />
    <p v-if="!isEditing" class="text-lg">{{ description }}</p>
    <textarea
      v-else
      class="rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
      v-model="editedDescription"
    ></textarea>

    <div class="mt-5 flex justify-between rounded-xl bg-light-background p-2">
      <p>Created: {{ createdAt }}</p>
      <p>Last Update: {{ updatedAt }}</p>
    </div>
  </header>

  <main class="mt-5 rounded-xl bg-light-background p-2">
    <DiaryEntry v-for="(entry, index) in entries" :title="entry.title" :description="entry.description" :content="entry.content" :id="index" :key="index"/>
    <button class="text-primary text-center w-full transition-all hover:opacity-50 active:tracking-wider" @click="addEntry">
      Add Entry
    </button>
    <article v-if="isAddingEntry">
      <section class="flex items-center justify-between p-2">
        <div class="flex flex-col justify-center">
          <input v-model="newEntriesTitle" type="text" placeholder="entry name">
          <input v-model="newEntriesDescription" type="text" placeholder="entry desc">
        </div>
        <p></p>
      </section>
      <section class="p-2">
        <textarea v-model="newEntriesContent" cols="30" rows="10" placeholder="entry"></textarea>
      </section>
      <div>
        <button @click="saveEntry(entry)">
          Save
        </button>
        <button @click="cancelEntry(index)">
          Cancel
        </button>
      </div>
    </article>
  </main>

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
import DiaryEntry from "../components/DiaryEntry.vue";
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
const entries = ref([]);
const isAddingEntry = ref(false);

const newEntriesTitle = ref("");
const newEntriesDescription = ref("");
const newEntriesContent = ref("");

const diaryKey = router.currentRoute.value.params.id;

const getInfo = async () => {
  await getDiary(diaryKey).then((diary) => {
    title.value = diary.name;
    description.value = diary.description;
    createdAt.value = dateConverter(diary.createdAt);
    updatedAt.value = dateConverter(diary.updatedAt);
    entries.value = diary.diaryContent;
  });
};

//TODO: add ability to set custom date
//!!!: last updated should also be updated
const saveEntry = () => {
  if (!newEntriesTitle.value || !newEntriesDescription.value || !newEntriesContent.value) {
    return;
  }

  const id = Math.random().toString(32).substring(2);
  
  const newEntry = {
    title: newEntriesTitle.value,
    description: newEntriesDescription.value,
    date: new Date(),
    lastUpdated: new Date(),
    content: newEntriesContent.value,
    id: id,
  };
  entries.value.push(newEntry);
  isAddingEntry.value = false;
  newEntriesTitle.value = "";
  newEntriesDescription.value = "";
  newEntriesContent.value = "";
};

const cancelEntry = () => {
  isAddingEntry.value = false;
};

const addEntry = () => {
  isAddingEntry.value = true;
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
