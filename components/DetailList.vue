<script setup>
import { formatDateDDMMYY } from "@/helpers/HelperFunctions";
const props = defineProps({
  detailData: {
    type: Object,
    required: true,
  },
});
const { detailData } = toRefs(props);
</script>

<template>
  <div>
    <div>
      <ul class="p-4">
        <li class="font-light text-gray-900 mb-2">
          Account Owner: {{ detailData.account.name }}
        </li>
        <li class="text-sm font-light text-gray-900 mb-2">
          Bank: {{ detailData.account.bank }}
        </li>
        <li class="text-sm font-light text-gray-900 mb-2">
          Reference: {{ detailData.reference }}
        </li>
        <li class="text-sm font-light text-gray-900 mb-2">
          Date: {{ formatDateDDMMYY(detailData.date) }}
        </li>
        <li class="text-sm font-light text-gray-900 mb-2">
          Amount: {{ detailData.amount }}
          {{ detailData.currency }}
        </li>
        <li class="text-xs font-light text-gray-900 mb-2">
          Transaction ID: {{ detailData.id }}
        </li>
      </ul>
    </div>
    <div class="">
      <label class="block w-full text-center">Current category</label>
      <div class="flex justify-center my-3">
        <Category class="" :category="detailData.category" />
      </div>
    </div>
  </div>
</template>
