<template>
  <h1 class="mb-5 text-center font-serif text-5xl text-primary">Diaries</h1>
  <main class="flex flex-wrap justify-center gap-5">
    <diaryBlock
      v-for="(diary, index) in diaries"
      :key="index"
      :diaryKey="diary.key"
      :title="diary.name"
      :description="diary.description"
      :locked="diary.locked"
      :password="diary.password"
      :unlock="showUnlockModal"
    ></diaryBlock>
    <button
      @click="router.push('/diaries/new')"
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
  </main>
  <Modal
    :show="showConfirmationModal"
    title="Unlock Diary"
    message="Enter the password for this diary:"
    :inputVisible="true"
    :inputIsPassword="true"
    :expectedValue="password"
    @cancel="hideConfirmationModal"
    @confirm="unlock"
  />
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DiaryBlock from "../components/DiaryBlock.vue";
import getDiaries from "../utils/diary/getDiaries";
import Modal from "../components/Modal.vue";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import { ref } from "vue";

const diaries = ref([]);
const showConfirmationModal = ref(false);
const diaryKey = ref("");
const password = ref("");

const router = useRouter();
const authListener = onAuthStateChanged(getAuth(), function (user) {
  if (!user) {
    router.back();
  }

  newStuff(user);
});

const newStuff = async (user) => {
  const retrievedDiaries = await getDiaries(user);
  diaries.value = retrievedDiaries;
};

const unlock = () => {
  router.push(`/diaries/${diaryKey.value}0u`);
};

const showUnlockModal = (futureDiaryKey, diaryPassword) => {
  showConfirmationModal.value = true;
  diaryKey.value = futureDiaryKey;
  password.value = diaryPassword;
};

const hideConfirmationModal = () => {
  showConfirmationModal.value = false;
};

onBeforeUnmount(() => {
  authListener();
});
</script>
