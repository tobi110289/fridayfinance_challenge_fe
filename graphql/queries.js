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
const filterQuery = gql`
    query ($first: Int, $account: String,$bank: String, $startDate: String, $endDate: String) {
    getTransactions (first: $first, account: $account, bank: $bank, startDate: $startDate, endDate: $endDate) {
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


export { initialQuery, loadMoreQuery, accountQueryScheme, filterQuery }