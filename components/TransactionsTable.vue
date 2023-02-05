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
const { data } = await useAsyncQuery(query)
if (data) console.log('yoyoo', data)
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
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.amount }} {{ transaction.currency }}</td>
                </tr>
            </tbody>
        </table>
</template>