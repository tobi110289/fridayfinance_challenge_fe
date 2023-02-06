<script setup >
const searchTerm = ref('')
const { handleSearch, accountData, filteredQuery } = inject('searchbar')
const uniqueBanks = ref([])
const selectedBank = ref('')
const uniqueAccounts = ref([])
const selectedAccount = ref('')
const selectedStartMonth = ref('2017-01')
const selectedEndMonth = ref('')

watch(accountData, (accounts) => {
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
    <div class="flex gap-4 px-6 w-10/12">
        <div class="mb-3 flex-auto">
            <label for="search"
                class="form-label inline-block text-xs text-gray-700 font-light py-1 text-left">Search</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-400 font-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  id="search" v-model="searchTerm" type="text" @keyup.enter="handleSearchEvent"
                placeholder="Search by bank, account, reference, category, date, amount, currency..." />
        </div>
        <div lass="mb-3 w-1/8 flex-col">
            <label for="bank"
                class="form-label inline-block text-xs text-gray-700 font-light py-1 text-left">Bank</label>
            <select
                class="bg-gray-50 border border-gray-300 text-gray-400 font-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="bank" v-model="selectedBank" @change="handleBankFilter">
                <option value="" selected>No filter applied</option>
                <option v-for="bank in uniqueBanks" :key="bank" :value="bank">{{ bank }}
                </option>
            </select>
        </div>
        <div lass="mb-3 w-1/8 flex-col">
            <label for="account"
                class="form-label inline-block text-xs text-gray-700 font-light py-1 text-left">Account</label>
            <select
                class="bg-gray-50 border border-gray-300 text-gray-400 font-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="account" v-model="selectedAccount" @change="handleAccountFilter">
                <option value="" selected>No filter applied</option>
                <option v-for="account in uniqueAccounts" :key="account" :value="account">{{ account }}
                </option>
            </select>
        </div>
        <div lass="mb-3 w-1/8 flex-col">
            <label for="start"
                class="form-label inline-block text-xs text-gray-700 font-light py-1 text-left">Starting
                month</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-400 font-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="month" id="start" name="starting-month" :value="selectedStartMonth"
                @change="handleStartDateChange" placeholder="yyyy-mm" min="1980-01" max="2050-12">
        </div>
        <div lass="mb-3 w-1/8 flex-col">
            <label for="end" class="form-label inline-block text-xs text-gray-700 font-light py-1 text-left">Ending
                month</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-400 font-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="month" id="end" name="ending-month" :value="selectedEndMonth" @change="handleEndDateChange"
                placeholder="yyyy-mm" min="1980-01" max="2050-12">
        </div>
    </div>
</template>