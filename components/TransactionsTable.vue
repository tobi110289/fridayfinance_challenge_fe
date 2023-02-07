<script setup>
import { formatDateDDMMYY } from "@/helpers/HelperFunctions";
import { useTransactionStore } from "@/store/TransactionStore";
import Category from "@/components/Category.vue";

const { transactionData, loadMore } = inject("transactionData");
const store = useTransactionStore();

const sortOrder = ref("asc");
const sortByDate = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};
const sortedTransactions = computed(() => {
  const formatToTimestamp = (date) => new Date(date).getTime();
  const transactions = transactionData.value;
  sortOrder.value === "asc"
    ? transactions.sort(
        (a, b) => formatToTimestamp(a.date) - formatToTimestamp(b.date)
      )
    : transactions.sort(
        (a, b) => formatToTimestamp(b.date) - formatToTimestamp(a.date)
      );
  return transactions;
});

const goToDetail = async (id) => {
  await store.getDetailData(id);
  await navigateTo({ path: `/detail/${id}` });
};
</script>

<template>
  <div class="flex-grow overflow-auto w-10/12">
    <table class="overflow-y-scroll relative w-full">
      <thead class="bg-gray-50 top-0 sticky">
        <tr>
          <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Reference
          </th>
          <th
            class="sticky text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Category
          </th>
          <th
            class="sticky text-sm font-medium text-gray-900 px-6 py-4 text-left"
            @click="sortByDate"
          >
            <template v-if="sortOrder === 'asc'"> Date ↓ </template>
            <template v-else-if="sortOrder === 'desc'"> Date ↑ </template>
          </th>
          <th
            class="sticky text-sm font-medium text-gray-900 px-6 py-4 text-right"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          v-for="transaction in sortedTransactions"
          :key="transaction.id"
          @click="goToDetail(transaction.id)"
        >
          <td
            :style="{ color: transaction.reference ? '#111827' : '#a0aec0' }"
            class="text-sm font-light px-6 py-4"
          >
            {{
              transaction.reference
                ? transaction.reference
                : "No reference provided"
            }}
          </td>
          <td class="">
            <Category :category="transaction.category" />
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4">
            {{ formatDateDDMMYY(transaction.date) }}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 text-right">
            {{ transaction.amount }} {{ transaction.currency }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center">
    <button
      class="text-xl text-gray-900 font-light px-6 py-4"
      @click="loadMore"
    >
      ⊕
    </button>
  </div>
</template>
