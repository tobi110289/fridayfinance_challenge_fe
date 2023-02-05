<script setup>
const { transactionData, loadMore } = inject("transactionData")
const sortOrder = ref('asc');
const sortedTransactions = computed(() => {
    const transactions = transactionData.value;
    sortOrder.value === 'asc'
        ? transactions.sort((a, b) => +a.date - +b.date)
        : transactions.sort((a, b) => +b.date - +a.date);
    return transactions;
});

const sortByDate = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}

const formatDate = (date) => {
    return new Date(parseInt(date)).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}
</script>

<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Category</th>
                <th @click="sortByDate">
                    <template v-if="sortOrder === 'asc'">
                        Date ↓
                    </template>
                    <template v-else-if="sortOrder === 'desc'">
                        Date ↑
                    </template>
                </th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in sortedTransactions" :key="transaction.id">
                <td>{{ transaction.reference ? transaction.reference : "No reference provided" }}</td>
                <td>{{ transaction.category?.name }}</td>
                <td>{{ formatDate(transaction.date) }}</td>
                <td> {{ transaction.amount }} {{ transaction.currency }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="loadMore">⊕</button>
</template>
