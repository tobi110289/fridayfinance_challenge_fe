<script setup>
import Transactions from "@/pages/Transactions.vue"
import { initialQuery, loadMoreQuery, accountQueryScheme, filteredByBank, filteredByAccount } from "@/graphql/queries"
const transactionData = ref([])
const bankData = ref([])
const accountData = ref([])

const handleSearch = (searchValue) => {
  console.log(`search value: ${searchValue}`);
  // Handle the API request here using the searchValue.
}
const filterByBank = (filterValue) => {
  console.log(`filter value: ${filterValue}`);
  transactionQuery(filteredByBank, { first: 20, bank: filterValue })
}
const filterByAccount = (filterValue) => {
  console.log(`filter value: ${filterValue}`);
  transactionQuery(filteredByAccount, { first: 20, account: filterValue })
}

const loadMore = () => {
  console.log('load more', transactionData.value.length);
  transactionQuery(loadMoreQuery, { first: transactionData.value.length + 20 })
}

const transactionQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  transactionData.value = data._rawValue.getTransactions
  console.log(data._rawValue.getTransactions)
}
const accountQuery = async (query, arg) => {
  const { data } = await useAsyncQuery(query, arg)
  bankData.value = data._rawValue.getAccounts
  console.log('account', bankData.value)
}

transactionQuery(loadMoreQuery, { first: 20 })
accountQuery(accountQueryScheme, {})


provide('transactionData', { transactionData, loadMore })
provide('searchbar', { handleSearch, bankData, filterByBank, accountData, filterByAccount })
</script>

<template>
  <Transactions />
</template>
