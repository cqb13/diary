<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="internalValue"
    :class="[customClass, 'rounded-lg border-none bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary']"
    @input="handleInput"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "text"
  },
  placeholder: String,
  value: String,
  customClass: {
    type: String,
    default: ""
  },
});

const internalValue = ref(props.value);

const emits = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  internalValue.value = event.target.value;
  emits('update:modelValue', internalValue.value);
};
</script>
