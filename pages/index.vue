<script setup>
import Transactions from "@/pages/Transactions.vue"
import { loadMoreQuery, accountQueryScheme, filterQuery, singleTransactionQueryScheme } from "@/graphql/queries"
const transactionData = ref([])
const accountData = ref([])
const filterArguments = ref({})

const handleSearch = async (searchValue) => {
  let searchResults = []
  const categorySearch = await useAsyncQuery(filterQuery, { ...filterArguments.value, category: searchValue })
  searchResults = [...categorySearch.data._rawValue.getTransactions]
  const referenceSearch = await useAsyncQuery(filterQuery, { ...filterArguments.value, reference: searchValue })
  searchResults = [...searchResults, ...referenceSearch.data._rawValue.getTransactions]
  const amountSearch = await useAsyncQuery(filterQuery, { ...filterArguments.value, amount: +searchValue })
  searchResults = [...searchResults, ...amountSearch.data._rawValue.getTransactions]
  transactionData.value = searchResults
}
const filteredQuery = (selectedAccount, selectedBank, startDate, endDate, reference, category) => {
  const args = { first: transactionData.value.length ? transactionData.value.length : 20, account: selectedAccount, bank: selectedBank, startDate, endDate, reference, category, category }
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
