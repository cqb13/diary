<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="rounded-md bg-dark-background p-5">
      <h3 class="text-lg font-medium text-primary">{{ title }}</h3>
      <p>{{ message }}</p>
      <TextEntry
        v-model="inputValue"
        v-if="inputVisible"
        class="mt-5"
        :type="inputIsPassword ? 'password' : 'text'"
      />
      <div class="mt-4 flex justify-end">
        <button
          class="mr-2 text-primary hover:opacity-50 active:tracking-wider"
          @click="cancel"
        >
          {{ cancelButtonText }}
        </button>
        <button
          class="text-red-500 hover:opacity-50 active:tracking-wider"
          @click="confirm"
          :disabled="inputVisible && inputValue !== expectedValue"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextEntry from "./TextEntry.vue";
import { ref, defineEmits } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  inputVisible: {
    type: Boolean,
    default: false,
  },
  inputIsPassword: {
    type: Boolean,
    default: false,
  },
  expectedValue: {
    type: String,
    default: "",
  },
  cancelButtonText: {
    type: String,
    default: "Cancel",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
});

const inputValue = ref("");

const cancel = () => {
  emit("cancel");
  inputValue.value = "";
};

const confirm = () => {
  emit("confirm", inputValue.value);
  inputValue.value = "";
};

const emit = defineEmits(["cancel", "confirm"]);
</script>
