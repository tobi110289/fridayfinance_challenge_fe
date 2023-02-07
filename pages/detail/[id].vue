<script setup>
import { useTransactionStore } from "@/store/TransactionStore";
import { storeToRefs } from "pinia";
import { formatDateDDMMYY } from "@/helpers/HelperFunctions";
import Category from "@/components/Category.vue";
const store = useTransactionStore();
const { detailData, categories } = storeToRefs(store);
const newCategoryName = ref("");
const newCategoryColor = ref("#f4f4a2");
</script>

<template>
  <!--HEADER COMP-->
  <div class="flex flex-col items-center mx-auto">
    <div class="flex w-10/12 justify-between">
      <h1 class="text-xl font-bold text-gray-900 px-6 py-2">Details</h1>
      <NuxtLink to="../">
        <h1 class="text-xl font-bold text-gray-900 px-6 py-2">⃪ Back</h1>
      </NuxtLink>
    </div>
  </div>

  <!--DETAILS COMP-->
  <div v-if="detailData">
    <div class="mt-10">
      <div class="flex justify-evenly">
        <!-- Transaction Info List -->
        <div class="w-1/3 shadow-md">
          <div>
            <ul class="p-4">
              <li class="text-sm font-light text-gray-900 mb-2">
                Transaction ID: {{ detailData[0].id }}
              </li>
              <li class="text-sm font-light text-gray-900 mb-2">
                Account Owner: {{ detailData[0].account.name }}
              </li>
              <li class="text-sm font-light text-gray-900 mb-2">
                Reference: {{ detailData[0].reference }}
              </li>
              <li class="text-sm font-light text-gray-900 mb-2">
                Date: {{ formatDateDDMMYY(detailData[0].date) }}
              </li>
              <li class="text-sm font-light text-gray-900 mb-2">
                Bank: {{ detailData[0].account.bank }}
              </li>
              <li class="text-sm font-light text-gray-900 mb-2">
                Amount: {{ detailData[0].amount }} {{ detailData[0].currency }}
              </li>
            </ul>
          </div>
          <div class="">
            <label class="block w-full text-center">Current category</label>
            <div class="flex justify-center my-3">
              <Category class="" :category="detailData[0].category" />
            </div>
          </div>
          <!-- New Category Form -->
          <form class="w-full flex flex-col items-center mt-10 border shadow-md p-5">
            <label for="new-category" class="">Create new category</label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg my-2 focus:ring-blue-500 focus:border-blue-500 block w-10/12 mx-auto p-2.5"
              id="new-category"
              v-model="newCategoryName"
              placeholder="New category name"
            />
            <input class="mt-2 mb-4" type="color" v-model="newCategoryColor" />
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-1/4"
              @click.prevent="
                store.createCategory(newCategoryName, newCategoryColor)
              "
            >
              Create
            </button>
          </form>
        </div>

        <!-- List of Categories -->
        <div class="w-1/3 flex flex-wrap gap-3 justify-center">
          <div
            class="my-3 hover:scale-110"
            v-for="category in categories"
            :key="category.id"
            @click="
              () =>
                store.changeTransactionCategory(detailData[0].id, category.id)
            "
          >
            <Category :category="category" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
