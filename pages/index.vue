<script setup>
import Transactions from "@/pages/Transactions.vue"
import { loadMoreQuery, accountQueryScheme, filterQuery } from "@/graphql/queries"
const transactionData = ref([])
const bankData = ref([])

const handleSearch = (searchValue) => {
  console.log(`search value: ${searchValue}`);
  // Handle the API request here using the searchValue.
}
const filteredQuery = (selectedAccount, selectedBank, startDate, endDate) => {
  transactionQuery(filterQuery, { first: 20, account: selectedAccount, bank: selectedBank, startDate, endDate})
}
const loadMore = () => {
  transactionQuery(loadMoreQuery, { first: transactionData.value.length + 20 })
}

const transactionQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  transactionData.value = data._rawValue.getTransactions
}
const accountQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  bankData.value = data._rawValue.getAccounts
}


transactionQuery(loadMoreQuery, { first: 20 })
accountQuery(accountQueryScheme, {})


provide('transactionData', { transactionData, loadMore })
provide('searchbar', { handleSearch, bankData, filteredQuery })
</script>

<template>
  <Transactions />
</template>
