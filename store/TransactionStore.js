import { loadMoreQuery, accountQueryScheme, filterQuery, singleTransactionQueryScheme } from "@/graphql/queries"
import { defineStore } from 'pinia'


export const useTransactionStore = defineStore('transactions', {
    state: () => ({
        transactionData: [],
        detailData: {},
        accountData: [],
        filterArguments: {}
    }),
    actions: {
        async getDetailData(id) {
            try {
                const { data } = await useAsyncQuery(singleTransactionQueryScheme, { id })
                this.detailData = data._rawValue.getTransactions
            } catch (error) {
                console.log(error)
            }
        }
    }
})


