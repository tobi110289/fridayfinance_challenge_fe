<script setup>
import Transactions from "@/pages/Transactions.vue"
import { loadMoreQuery, accountQueryScheme, filterQuery } from "@/graphql/queries"
const transactionData = ref([])
const accountData = ref([])
const filterArguments = ref({})

const handleSearch = (searchValue) => {
  console.log(`search value: ${searchValue}`);
  // Handle the API request here using the searchValue.
}
const filteredQuery = (selectedAccount, selectedBank, startDate, endDate) => {
  const args = { first: transactionData.value.length ? transactionData.value.length : 20, account: selectedAccount, bank: selectedBank, startDate, endDate }
  transactionQuery(filterQuery, args)
  filterArguments.value = args;
}
const loadMore = () => {
  transactionQuery(filterQuery, { ...filterArguments.value, first: transactionData.value.length + 20 })
}

const transactionQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  transactionData.value = data._rawValue.getTransactions
}
const accountQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  accountData.value = data._rawValue.getAccounts
}


transactionQuery(loadMoreQuery, { first: 20 })
accountQuery(accountQueryScheme, {})


provide('transactionData', { transactionData, loadMore })
provide('searchbar', { handleSearch, accountData, filteredQuery })
</script>

<template>
  <Transactions />
</template>
