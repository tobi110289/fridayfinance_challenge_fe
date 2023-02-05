const initialQuery = gql`
  query {
    getTransactions(first: 20) {
      id
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
const loadMoreQuery = gql`
  query ($first: Int){
    getTransactions(first: $first) {
    id
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
const accountQueryScheme = gql`
  query {
    getAccounts {
        name
        bank
  }
}
`
const filteredByBank = gql`
    query ($first: Int, $bank: String) {
    getTransactions (first: $first, bank: $bank) {
    id
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
const filteredByAccount = gql`
    query ($first: Int, $account: String) {
    getTransactions (first: $first, account: $account) {
    id
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

export { initialQuery, loadMoreQuery, accountQueryScheme, filteredByBank, filteredByAccount}