import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useItem = defineStore('item', {
    state: () => ({
      itemData: ref([]),
      item: ref({}),
      loading: ref(false),
    }),

    getters: {
        getItemData() {
            return this.itemData;
        },
        getItem() {
            return this.item;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getItemList(searchItem, limit, offset) {
        try {
          if (searchItem) {
            let responseData = await httpClient.get(`/api/v2/item/${searchItem}`)
            this.itemData = [responseData.data];
          } else {
            let responseData = await httpClient.get(`/api/v2/item?limit=${limit}&offset=${offset})`)
            this.itemData = responseData.data.results;
          }
        } catch (error) {
          console.log(error)
          return error
        }
      },

      async getSingleItem(searchItem) {
        try {
          let responseData = await httpClient.get(`/api/v2/item/${searchItem}`)
          this.item = responseData.data;
        } catch (error) {
          console.log(error)
          return error
        }
      },

      resetItem() {
        this.item = {};
      }
    },
  })