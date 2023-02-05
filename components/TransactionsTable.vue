<script lang="ts" setup>
const query = gql`
  query {
    getTransactions(first: 20) {
    reference
    category {
      name
    }
    date
    amount
    currency
  }
  } 
`
const formatDate = (date: string) => {
    return new Date(parseInt(date)).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}
const { data }: any = await useAsyncQuery(query)
console.log(data)
</script>

<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>Reference</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in data.getTransactions" :key="transaction.reference">
                <td>{{ transaction.reference }}</td>
                <td>{{ transaction.category.name }}</td>
                <td>{{ formatDate(transaction.date) }}</td>
                <td> {{ transaction.amount }} {{ transaction.currency }}</td>
            </tr>
        </tbody>
    </table>
</template>
