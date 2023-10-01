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
    <DiaryEntry
      v-for="(entry, index) in entries"
      :title="entry.title"
      :description="entry.description"
      :content="entry.content"
      :date="entry.date"
      :id="index"
      :key="index"
      :deleteEntry="deleteEntry"
    />
    <button
      class="w-full text-center text-primary transition-all hover:opacity-50 active:tracking-wider"
      @click="addEntry"
    >
      Add Entry
    </button>
    <article v-if="isAddingEntry">
      <section class="flex items-center justify-between p-2">
        <div class="flex w-full flex-col justify-center gap-2">
          <TextEntry
            placeholder="Entry Name"
            v-model="newEntriesTitle"
            custom-class="w-full"
          />
          <TextEntry
            placeholder="Entry Description"
            v-model="newEntriesDescription"
            custom-class="w-full"
          />
        </div>
        <div>
          <input
            type="date"
            v-model="newEntriesDate"
            class="rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
          />
        </div>
      </section>
      <section class="p-2">
        <textarea
          v-model="newEntriesContent"
          cols="30"
          rows="10"
          placeholder="entry"
          class="w-full rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
        ></textarea>
      </section>
      <div class="flex gap-2">
        <button
          @click="saveEntry()"
          class="text-primary transition-all hover:opacity-50 active:tracking-wider"
        >
          Create
        </button>
        <button
          @click="cancelEntry()"
          class="text-red-500 transition-all hover:opacity-50 active:tracking-wider"
        >
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
import sortDiaryEntriesByData from "../utils/diary/sortDiaryEntriesByDate";
import saveMainDiaryChanges from "../utils/diary/saveMainDiaryChanges";
import updateDiaryEntry from "../utils/diary/updateDiaryEntry";
import DiaryEntry from "../components/DiaryEntry.vue";
import dateConverter from "../utils/db/dateConverter";
import deleteDiary from "../utils/diary/deleteDiary";
import TextEntry from "../components/TextEntry.vue";
import getDiary from "../utils/diary/getDiary";
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

const showConfirmationModal = ref(false);
const deleteConfirmationInput = ref("");
const entryOrderReverse = ref(false);
const editedDescription = ref("");
const isAddingEntry = ref(false);
const isEditing = ref(false);
const description = ref("");
const editedTitle = ref("");
const router = useRouter();
const createdAt = ref("");
const updatedAt = ref("");
const entries = ref([]);
const title = ref("");

const newEntriesDescription = ref("");
const newEntriesContent = ref("");
const newEntriesTitle = ref("");
const newEntriesDate = ref("");

const diaryKey = router.currentRoute.value.params.id;

const getInfo = async () => {
  if (!diaryKey.endsWith("0u")) {
    router.push("/diaries");
    return;
  }

  await getDiary(diaryKey.slice(0, -2)).then((diary) => {
    title.value = diary.name;
    description.value = diary.description;
    createdAt.value = dateConverter(diary.createdAt);
    updatedAt.value = dateConverter(diary.updatedAt);

    if (diary.diaryContent === undefined || diary.diaryContent === null) {
      entries.value = [];
    } else {
      let sortedEntries = sortDiaryEntriesByData(
        diary.diaryContent,
        entryOrderReverse.value,
      );
      entries.value = sortedEntries;
    }
  });
};

const saveEntry = () => {
  if (
    !newEntriesTitle.value ||
    !newEntriesDescription.value ||
    !newEntriesContent.value
  ) {
    return;
  }

  const id = Math.random().toString(32).substring(2);

  const newEntry = {
    title: newEntriesTitle.value,
    description: newEntriesDescription.value,
    date: new Date(newEntriesDate.value).getTime(),
    lastUpdated: new Date(),
    content: newEntriesContent.value,
    id: id,
  };
  entries.value.push(newEntry);
  entries.value = sortDiaryEntriesByData(
    entries.value,
    entryOrderReverse.value,
  );
  updateDiaryEntry(diaryKey.slice(0, -2), entries.value);
  isAddingEntry.value = false;
  newEntriesTitle.value = "";
  newEntriesDescription.value = "";
  newEntriesContent.value = "";
  newEntriesDate.value = "";
};

const cancelEntry = () => {
  isAddingEntry.value = false;
};

const addEntry = () => {
  isAddingEntry.value = true;
  newEntriesDate.value = new Date().toISOString().slice(0, 10);
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
    await deleteDiary(diaryKey.slice(0, -2));
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
  saveMainDiaryChanges(diaryKey.slice(0, -2), title.value, description.value);
};

const deleteEntry = (id) => {
  entries.value.splice(id, 1);
  updateDiaryEntry(diaryKey.slice(0, -2), entries.value);
};

const cancelEditing = () => {
  isEditing.value = false;
};

onBeforeMount(() => {
  getInfo();
});
</script>
