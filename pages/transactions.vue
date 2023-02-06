<script setup>
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import TransactionsTable from '@/components/TransactionsTable.vue';
</script>

<template>
  <div class="flex flex-col items-center mx-auto bg-white shadow-md h-screen">
    <div class="flex items-start w-10/12">
      <h1 class="text-xl font-bold text-gray-900 px-6 py-2 text-left">Transactions</h1>
    </div>
    <SearchAndFilter />
    <TransactionsTable />
  </div>
</template>