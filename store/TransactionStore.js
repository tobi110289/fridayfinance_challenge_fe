import {
  loadMoreQuery,
  accountQueryScheme,
  filterQuery,
  singleTransactionQueryScheme,
  categoriesSchema,
  changeCategoryMutation,
  createCategoryMutation,
} from "@/graphql/queries";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactionData: [],
    detailData: {},
    accountData: [],
    filterArguments: {},
    categories: [],
  }),
  actions: {
    async getDetailData(id) {
      try {
        const { data } = await useAsyncQuery(singleTransactionQueryScheme, {
          id,
        });
        this.detailData = data._rawValue.getTransactions;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const { data } = await useAsyncQuery(categoriesSchema);
        this.categories = data._rawValue.getCategories;
      } catch (error) {
        console.log(error);
      }
    },
    async changeTransactionCategory(id, category_id) {
      try {
        const { data } = await useAsyncQuery(changeCategoryMutation, {
          data: {
            id,
            category_id,
          },
        });
        console.log("detail1", this.detailData);
        this.detailData = {
          ...this.detailData,
          category: data._rawValue.updateTransactionCategory.category,
        };
        console.log(this.detailData, "detail2");
      } catch (error) {
        console.log(error);
      }
    },
    async createCategory(name, color) {
      try {
        const { data } = await useAsyncQuery(createCategoryMutation, {
          data: {
            name,
            color: color.slice(1),
          },
        });
        await this.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
