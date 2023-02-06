<script setup >
const searchTerm = ref('')
const { handleSearch, bankData, filteredQuery } = inject('searchbar')
const uniqueBanks = ref([])
const selectedBank = ref('')
const uniqueAccounts = ref([])
const selectedAccount = ref('')
const selectedStartMonth = ref('2017-01')
const selectedEndMonth = ref('')

watch(bankData, (accounts) => {
    uniqueBanks.value = Array.from(new Set(accounts.map(account => account.bank)))
    uniqueAccounts.value = Array.from(new Set(accounts.map(account => account.name)))
})
const initEndMonth = () => {
    selectedEndMonth.value = new Date().toISOString().slice(0, 7);
}
initEndMonth()

const handleSearchEvent = () => {
    handleSearch(searchTerm.value)
    searchTerm.value = ''
}
const handleBankFilter = (e) => {
    selectedBank.value = e.target.value
    filteredQuery(selectedAccount.value, e.target.value, formatToISO(selectedStartMonth.value), formatToISO(selectedEndMonth.value))
}
const handleAccountFilter = (e) => {
    selectedAccount.value = e.target.value
    filteredQuery(e.target.value, selectedBank.value, formatToISO(selectedStartMonth.value), formatToISO(selectedEndMonth.value))
}
const formatToISO = (date) => {
    return (new Date(date)).toISOString()
}
const handleStartDateChange = (e) => {
    selectedStartMonth.value = e.target.value
    filteredQuery(selectedAccount.value, selectedBank.value, formatToISO(e.target.value), formatToISO(selectedEndMonth.value))
}
const handleEndDateChange = (e) => {
    selectedEndMonth.value = e.target.value
    filteredQuery(selectedAccount.value, selectedBank.value, formatToISO(selectedStartMonth.value), formatToISO(e.target.value))
}


</script>
<template>
    <div>
        <label for="search">Search</label>
        <input id="search" v-model="searchTerm" type="text" @keyup.enter="handleSearchEvent"
            placeholder="Search by bank, account, reference, category, date, amount, currency..." />
        <label for="bank">Bank</label>
        <select id="bank" v-model="selectedBank" @change="handleBankFilter">
            <option value="" selected>No filter applied</option>
            <option v-for="bank in uniqueBanks" :key="bank" :value="bank">{{ bank }}
            </option>
        </select>
        <label for="account">Account</label>
        <select id="account" v-model="selectedAccount" @change="handleAccountFilter">
            <option value="" selected>No filter applied</option>
            <option v-for="account in uniqueAccounts" :key="account" :value="account">{{ account }}
            </option>
        </select>
        <label for="start">Starting month:</label>
        <input type="month" id="start" name="starting-month" :value="selectedStartMonth" @change="handleStartDateChange"
            placeholder="yyyy-mm" min="1980-01" max="2050-12">
        <label for="start">Ending month:</label>
        <input type="month" id="end" name="ending-month" :value="selectedEndMonth" @change="handleEndDateChange"
            placeholder="yyyy-mm" min="1980-01" max="2050-12">
    </div>
</template>