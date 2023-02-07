<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
const { category } = toRefs(props);

</script>
<template>
  <div>
    <span
      class="text-sm text-gray-900 font-normal rounded-md p-3"
      :style="{
        backgroundColor: category?.color ? '#' + category.color : '#ebebeb',
      }"
    >
      {{ category?.name }}
    </span>
  </div>
</template>
