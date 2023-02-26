<script setup lang="ts">
interface Props {
  label: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'hello',
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};

const btnClasses = computed(() => {
  if (props.color === 'secondary') {
    return 'border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white';
  }

  return 'bg-blue-500 hover:bg-blue-700 text-white';
});
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      'border transition-colors py-3 font-medium rounded-md',
      btnClasses,
    ]"
  >
    {{ label }}
  </button>
</template>
