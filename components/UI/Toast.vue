<script setup lang="ts">
const { $bus } = useNuxtApp();

const show = ref(false);
const message = ref('');
const type = ref('');

$bus.$on('toast', (data: any) => {
  show.value = true;
  message.value = data.message;
  type.value = data.type;

  setTimeout(() => (show.value = false), 3000);
});

const closeToast = () => {
  show.value = false;
};
</script>

<template>
  <div
    v-if="show"
    id="toast-success"
    :class="[
      'fixed right-6 top-6 mb-4 flex w-full max-w-xs items-center rounded-lg p-4 text-gray-500',
      type === 'success' ? 'bg-green-100' : '',
      type === 'warning' ? 'bg-yellow-100' : '',
      type === 'error' ? 'bg-red-100' : '',
    ]"
    role="alert"
  >
    <div
      :class="[
        'inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
        type === 'success' ? 'bg-green-500 text-white' : '',
        type === 'warning' ? 'bg-yellow-500 text-white' : '',
        type === 'error' ? 'bg-red-500 text-white' : '',
      ]"
    >
      <Icon :name="type === 'success' ? 'ph:check' : 'ph:x'" />
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{{ message }}</div>
    <button
      type="button"
      class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
      data-dismiss-target="#toast-success"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        @click="closeToast"
        aria-hidden="true"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>
