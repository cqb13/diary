<template>
  <label
    class="container relative flex cursor-pointer select-none items-center gap-2"
  >
    <input
      type="checkbox"
      class="hidden"
      :checked="internalChecked"
      @change="updateChecked"
    />
    <div
      :class="[
        'custom-checkbox h-6 w-6 rounded bg-light-background transition-all hover:bg-dark-text',
        internalChecked ? 'bg-primary hover:bg-primary hover:opacity-50' : '',
      ]"
    ></div>
    <span class="label text-xl">{{ label }}</span>
  </label>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const internalChecked = ref(props.modelValue);

const updateChecked = () => {
  internalChecked.value = !internalChecked.value;
  emits("update:modelValue", internalChecked.value);
};
</script>
