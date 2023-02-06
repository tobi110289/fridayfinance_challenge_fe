const singleTransactionQueryScheme = gql`
  query ($id: String) {
    getTransactions(id: $id) {
      id
      account {
        name
        bank

      }
      reference
      category {
        id
        name
        color
      }
      date
      amount
      currency
    }
  } 
`
const loadMoreQuery = gql`
  query ($first: Int){
    getTransactions(first: $first) {
    id
    reference
    category {
      name
      color
    }
    date
    amount
    currency
  }
  } 
`
const accountQueryScheme = gql`
  query {
    getAccounts {
        name
        bank
  }
}
`
const filterQuery = gql`
    query ($first: Int, $account: String,$bank: String, $startDate: String, $endDate: String, $reference: String, $category: String , $amount: Float) {
    getTransactions (first: $first, account: $account, bank: $bank, startDate: $startDate, endDate: $endDate, reference: $reference, category: $category, amount: $amount) {
    id
    reference
    category {
      name
      color
    }
    date
    amount
    currency
  }
}
`


export { singleTransactionQueryScheme, loadMoreQuery, accountQueryScheme, filterQuery }