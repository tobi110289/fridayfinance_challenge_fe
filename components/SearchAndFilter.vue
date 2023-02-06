<script setup >

const searchTerm = ref('')
const { handleSearch, bankData, filteredQuery } = inject('searchbar')
const uniqueBanks = ref([])
const selectedBank = ref('')
const uniqueAccounts = ref([])
const selectedAccount = ref('')
const startingMonth = ref('yyyy-mm')
const endingMonth = ref('')

watch(bankData, (accounts) => {
    uniqueBanks.value = Array.from(new Set(accounts.map(account => account.bank)))
    uniqueAccounts.value = Array.from(new Set(accounts.map(account => account.name)))
})


const handleSearchEvent = () => {
    handleSearch(searchTerm.value)
    searchTerm.value = ''
}
const handleBankFilter = (e) => {
    selectedBank.value = e.target.value
    filteredQuery(selectedAccount.value, e.target.value)
}
const handleAccountFilter = (e) => {
    selectedAccount.value = e.target.value
    filteredQuery(e.target.value, selectedBank.value)
}

</script>
<template>
    <div>
        <label for="search">Search</label>
        <input id="search" v-model="searchTerm" type="text" @keyup.enter="handleSearchEvent"
            placeholder="Search by bank, account, reference, category, date, amount, currency..." />
        <label for="bank">Bank</label>
        <select id="bank" v-model="selectedBank" @change="handleBankFilter">
            <option value="" disabled selected hidden>No filter applied</option>
            <option v-for="bank in uniqueBanks" :key="bank" :value="bank">{{ bank }}
            </option>
        </select>
        <label for="account">Account</label>
        <select id="account" v-model="selectedAccount" @change="handleAccountFilter">
            <option value="" disabled selected hidden>No filter applied</option>
            <option v-for="account in uniqueAccounts" :key="account" :value="account">{{ account }}
            </option>
        </select>
        <label for="start">Starting month:</label>
        <input type="month" id="start" name="starting-month" :value="startingMonth" placeholder="yyyy-mm" min="1980-01"
            max="2050-12">
        <label for="start">Ending month:</label>
        <input type="month" id="end" name="ending-month" :value="endingMonth" placeholder="yyyy-mm" min="1980-01"
            max="2050-12">
    </div>
</template>