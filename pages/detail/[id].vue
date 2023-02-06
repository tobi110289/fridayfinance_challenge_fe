<script setup>
import { useTransactionStore } from '@/store/TransactionStore';
import { storeToRefs } from 'pinia';
const { detailData } = storeToRefs(useTransactionStore())
</script>

<template>
  <div class="flex flex-col items-center mx-auto bg-white shadow-md h-screen">
    <div class="flex w-10/12 justify-between">
      <h1 class="text-xl font-bold text-gray-900 px-6 py-2">Details</h1>
      <NuxtLink to="../">
        <h1 class="text-xl font-bold text-gray-900 px-6 py-2">⃪ Back</h1>
      </NuxtLink>
    </div>
    <div>
      <p>{{ detailData[0].id }}</p>
    </div>
    <p>transaction details..</p>
  </div>
</template>