<template>
  <h1 class="mb-5 text-center font-serif text-5xl text-primary">
    Create Diary
  </h1>
  <main class="flex flex-col gap-5">
    <TextEntry placeholder="Diary Name" v-model="diaryName" />
    <TextEntry placeholder="Diary Description" v-model="diaryDescription" />
    <Checkbox label="Locked" v-model="locked" />
    <TextEntry
      placeholder="Password"
      v-if="locked"
      v-model="diaryPassword"
      type="password"
    />
    <TextEntry
      placeholder="Confirm Password"
      v-if="locked"
      v-model="diaryPasswordConfirm"
      type="password"
    />
    <div class="flex justify-center gap-2">
      <button
        @click="createDiary"
        class="w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full"
      >
        Create Diary
      </button>
      <button
        @click="cancelDiaryCreation"
        class="w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full"
      >
        Cancel
      </button>
    </div>
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
  </main>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import createDiaryInDb from "../utils/diary/createDiary";
import TextEntry from "../components/TextEntry.vue";
import Checkbox from "../components/Checkbox.vue";
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const diaryPasswordConfirm = ref("");
const diaryDescription = ref("");
const diaryPassword = ref("");
const errorMessage = ref("");
const diaryName = ref("");
const locked = ref(false);

const router = useRouter();

const updateErrorMessage = (error) => {
  errorMessage.value = error;
  setTimeout(() => {
    errorMessage.value = "";
  }, 3000);
};

const cancelDiaryCreation = () => {
  router.back();
};

const createDiary = async () => {
  if (diaryName.value === "") {
    updateErrorMessage("Diary name cannot be empty");
    return;
  }
  if (locked.value) {
    if (diaryPassword.value === "") {
      updateErrorMessage("Password cannot be empty");
      return;
    }
    if (diaryPassword.value !== diaryPasswordConfirm.value) {
      updateErrorMessage("Passwords do not match");
      return;
    }
  }

  const key = await createDiaryInDb(diaryName.value, diaryDescription.value, diaryPassword.value, locked.value);
  router.push(`/diaries/${key}`);
};

const authListener = onAuthStateChanged(getAuth(), function (user) {
  if (!user) {
    router.back();
  }
});

onBeforeUnmount(() => {
  authListener();
});
</script>
